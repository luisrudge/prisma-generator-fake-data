import { logger } from '@prisma/internals';
import { DMMF } from '@prisma/generator-helper';
import { faker } from '@faker-js/faker';

const MAX_INT = 2147483647;

function getFieldDefinition(
  models: DMMF.Datamodel['models'],
  model: DMMF.Datamodel['models'][number],
  field: DMMF.Datamodel['models'][number]['fields'][number],
  enums: DMMF.Datamodel['enums'],
  emptyValueAs: string,
) {
  const docLines = field.documentation?.split('\n') || [];
  const fakeLine = docLines.find((line) => line.startsWith('FAKE:'));
  const fakeValue = fakeLine?.replace('FAKE:', '');

  if (fakeLine && !fakeValue) {
    logger.warn(
      `${model.name}.${field.name} appears to have a '///FAKE:' comment but is missing a method or JSON after it.`,
    );
  }

  if (fakeValue) {
    return `${field.name}: ${fakeValue}`;
  }

  if (field.isId) {
    return `${field.name}: ${
      field.type === 'String'
        ? 'faker.string.uuid()'
        : `faker.number.int({ max: ${MAX_INT} })`
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
      } else {
        const defaults = (field.default as DMMF.FieldDefaultScalar[])
          ?.map((d) => `${enumName}.${d}`)
          .join(', ');
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

    if (['Int', 'Float', 'Boolean'].includes(field.type)) {
      return `${field.name}: ${field.default}`;
    }
    if (['Decimal'].includes(field.type)) {
      return `${field.name}: new Decimal(${field.default})`;
    }
    if (['BigInt'].includes(field.type)) {
      return `${field.name}: BigInt(${field.default})`;
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
      field.type === 'String' ? 'faker.string.uuid()' : 'faker.number.int()'
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
  if (field.type === 'Int') {
    if (field.isList) {
      return `${field.name}: [faker.number.int({ max: ${MAX_INT} }),faker.number.int({ max: ${MAX_INT} }),faker.number.int({ max: ${MAX_INT} }),faker.number.int({ max: ${MAX_INT} }),faker.number.int({ max: ${MAX_INT} })]`;
    }
    if (field.name === 'age') {
      return `${field.name}: faker.number.int({min: 0, max: 99})`;
    }
    return `${field.name}: faker.number.int()`;
  }
  if (field.type === 'BigInt') {
    if (field.isList) {
      return `${field.name}: [BigInt(faker.number.int()),BigInt(faker.number.int()),BigInt(faker.number.int()),BigInt(faker.number.int()),BigInt(faker.number.int())]`;
    }
    return `${field.name}: BigInt(faker.number.int())`;
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
      return `${field.name}: [new Decimal(faker.number.float()),new Decimal(faker.number.float()),new Decimal(faker.number.float()),new Decimal(faker.number.float()),new Decimal(faker.number.float())]`;
    }
    return `${field.name}: new Decimal(faker.number.float())`;
  }
  if (field.type === 'DateTime') {
    if (field.isList) {
      return `${field.name}: [faker.date.anytime(),faker.date.anytime(),faker.date.anytime(),faker.date.anytime(),faker.date.anytime()]`;
    }
    return `${field.name}: faker.date.anytime()`;
  }
  if (field.type === 'Json') {
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
import Decimal from 'decimal.js';
${extraImport || ''}
${extraExport || ''}

${functions.join('\n')}
`;
}
function createFakeFunctionsWithoutFKs(
  models: DMMF.Datamodel['models'],
  model: DMMF.Datamodel['models'][number],
  enums: DMMF.Datamodel['enums'],
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
  models: DMMF.Datamodel['models'],
  model: DMMF.Datamodel['models'][number],
  enums: DMMF.Datamodel['enums'],
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
