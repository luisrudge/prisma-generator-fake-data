import { logger } from '@prisma/internals';
import { DMMF } from '@prisma/generator-helper';
import { faker } from '@faker-js/faker';
function getFieldDefinition(
  models: DMMF.Model[],
  model: DMMF.Model,
  field: DMMF.Field,
  enums: DMMF.DatamodelEnum[],
  emptyValueAs: string,
) {
  const docLines = field.documentation?.split('\n') || [];
  const fakeLine = docLines.find((line) => line.startsWith('FAKE:'));
  const fakeValue = fakeLine?.replace('FAKE:', '');

  if (field.isId) {
    return `${field.name}: ${
      field.type === 'String'
        ? 'faker.string.uuid()'
        : 'faker.number.int()'
    }`;
  }
  if (field.hasDefaultValue) {
    if (field.isList && field.kind === 'enum') {
      const enumName = field.type;
      const enumValues = enums.find((it) => it.name === enumName)?.values || [];
      if (enumValues.length === 0) {
        logger.warn(
          `Enum ${enumName} has no enum values. Field ${field.name} won't be generated.`,
        );
      }
      else {
          const defaults = field.default.map((d) => `${enumName}.${d}`).join(', ');
          return `${field.name}: [${defaults}]`;
      }
    }
    if (field.isList) {
      return `${field.name}: ${field.default?.toString() || '[]'}`;
    }
    if (['Json'].includes(field.type)) {
      return `${field.name}: ${fakeValue || field.default?.toString() || '{}'}`;
    }
    if (field.kind === 'enum') {
      return `${field.name}: ${field.type}.${field.default}`;
    }
    
    if (['Int', 'BigInt', 'Float', 'Decimal', 'Boolean'].includes(field.type)) {
      return `${field.name}: ${field.default}`;
    }
    if (['String'].includes(field.type)) {
      return `${field.name}: '${field.default}'`;
    }
    if (field.type === 'DateTime') {
      return `${field.name}: new Date()`;
    }
  }
  if (!field.isRequired) {
    return `${field.name}: ${emptyValueAs}`;
  }
  if (field.kind === 'enum') {
    const enumName = field.type;
    const enumValues = enums.find((it) => it.name === enumName)?.values || [];
    if (enumValues.length === 0) {
      logger.warn(
        `Enum ${enumName} has no enum values. Field ${field.name} won't be generated.`,
      );
    } else {
      const enumValuesAsString = enumValues
        .map((v) => `${enumName}.${v.name}`)
        .join(', ');
      return `${field.name}: faker.helpers.arrayElement([${enumValuesAsString}] as const)`;
    }
  }
  if (model.fields.some((it) => it.relationFromFields?.includes(field.name))) {
    return `${field.name}: ${
      field.type === 'String'
        ? 'faker.string.uuid()'
        : 'faker.number.int()'
    }`;
  }
  if (field.type === 'String') {
    if (field.isList) {
      return `${field.name}: faker.lorem.words(5).split(' ')`;
    }
    if (field.name === 'email') {
      return `${field.name}: faker.internet.email()`;
    }
    if (field.name === 'image' || field.name === 'avatar') {
      return `${field.name}: faker.image.avatar()`;
    }
    if (field.name === 'username') {
      return `${field.name}: faker.internet.userName()`;
    }
    if (field.name === 'name') {
      return `${field.name}: faker.person.fullName()`;
    }
    if (field.name === 'firstName') {
      return `${field.name}: faker.person.firstName()`;
    }
    if (field.name === 'lastName') {
      return `${field.name}: faker.person.lastName()`;
    }
    return `${field.name}: faker.lorem.words(5)`;
  }
  if (field.type === 'Int' || field.type === 'BigInt') {
    if (field.isList) {
      return `${field.name}: [faker.number.int(),faker.number.int(),faker.number.int(),faker.number.int(),faker.number.int()]`;
    }
    if (field.name === 'age') {
      return `${field.name}: faker.number.int({min: 0, max: 99})`;
    }
    return `${field.name}: faker.number.int()`;
  }
  if (field.type === 'Float') {
    if (field.isList) {
      return `${field.name}: [faker.number.float(),faker.number.float(),faker.number.float(),faker.number.float(),faker.number.float()]`;
    }
    return `${field.name}: faker.number.float()`;
  }
  if (field.type === 'Boolean') {
    if (field.isList) {
      return `${field.name}: [faker.datatype.boolean(),faker.datatype.boolean(),faker.datatype.boolean(),faker.datatype.boolean(),faker.datatype.boolean()]`;
    }
    return `${field.name}: faker.datatype.boolean()`;
  }
  if (field.type === 'Decimal') {
    if (field.isList) {
      return `${field.name}: [faker.datatype.hexaDecimal(),faker.datatype.hexaDecimal(),faker.datatype.hexaDecimal(),faker.datatype.hexaDecimal(),faker.datatype.hexaDecimal()]`;
    }
    return `${field.name}: faker.datatype.hexaDecimal()`;
  }
  if (field.type === 'DateTime') {
    if (field.isList) {
      return `${field.name}: [faker.date.anytime(),faker.date.anytime(),faker.date.anytime(),faker.date.anytime(),faker.date.anytime()]`;
    }
    return `${field.name}: faker.date.anytime()`;
  }
  if (field.type === 'Json') {
    const docLines = field.documentation?.split('\n') || [];
    const fake = docLines.find((line) => line.startsWith('FAKE:'));
    if (fake) {
      const fakeValue = fake.replace('FAKE:', '');
      if (!fakeValue) {
        logger.warn(
          `Incorrect format for fake JSON. Field ${field.name} won't be generated. Example: ///[FAKE:{"test": "faker.lorem.word()"}]`,
        );
        return null;
      }
      return `${field.name}: ${fakeValue}`;
    }
    return `${field.name}: JSON.stringify(${generateRandomJson()})`;
  }
  logger.warn(
    `Type ${field.type}${field.isList ? '[]' : ''} (${
      field.kind
    }) is not supported. Field ${field.name} won't be generated.`,
  );
  return null;
}

export async function createMethods(
  { enums, models }: DMMF.Datamodel,
  extraImport?: string,
  extraExport?: string,
  emptyValueAs = 'undefined',
  clientImportPath: string = '@prisma/client',
) {
  const functions: string[] = [];

  models.forEach((m) => {
    createFakeFunctionsWithoutFKs(models, m, enums, functions, emptyValueAs);
    createFakeFunctionsWithFKs(models, m, enums, functions, emptyValueAs);
  });
  const enumNames = enums.map((it) => it.name).join(', ');
  return await `import { ${enumNames} } from '${clientImportPath}';
import { faker } from '@faker-js/faker';
${extraImport || ''}
${extraExport || ''}

${functions.join('\n')}
`;
}
function createFakeFunctionsWithoutFKs(
  models: DMMF.Model[],
  model: DMMF.Model,
  enums: DMMF.DatamodelEnum[],
  functions: string[],
  emptyValueAs: string,
) {
  const validFields = model.fields
    .filter((field) => !field.isId)
    .filter((field) => field.kind === 'scalar' || field.kind === 'enum')
    .filter((field) => {
      return !model.fields.find((it) => {
        return it.relationFromFields?.includes(field.name);
      });
    })
    .filter((field) => !field.hasDefaultValue)
    .map((f) => getFieldDefinition(models, model, f, enums, emptyValueAs))
    .filter(Boolean);
  if (validFields.length > 0) {
    functions.push(
      `export function fake${model.name}() {
  return {
    ${validFields.join(',\n    ')},
  };
}`,
    );
  }
}

function createFakeFunctionsWithFKs(
  models: DMMF.Model[],
  model: DMMF.Model,
  enums: DMMF.DatamodelEnum[],
  functions: string[],
  emptyValueAs: string,
) {
  const validFields = model.fields
    .filter((field) => field.kind === 'scalar' || field.kind === 'enum')
    .map((f) => getFieldDefinition(models, model, f, enums, emptyValueAs))
    .filter(Boolean);
  if (validFields.length > 0) {
    functions.push(
      `export function fake${model.name}Complete() {
  return {
    ${validFields.join(',\n    ')},
  };
}`,
    );
  }
}

function generateRandomJson(): string {
  const obj = {
    foo: faker.string.uuid(),
    bar: faker.number.int(),
    bike: faker.number.hex(),
    a: faker.string.alphanumeric(),
    b: faker.number.float(),
    name: faker.person.firstName(),
    prop: faker.string.binary(),
  };
  return JSON.stringify(obj);
}
