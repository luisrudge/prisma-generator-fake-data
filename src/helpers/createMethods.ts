import { logger } from '@prisma/sdk';
import { DMMF } from '@prisma/generator-helper';
import { formatFile } from '../utils/formatFile';

function getFieldDefinition(field: DMMF.Field, enums: DMMF.DatamodelEnum[]) {
  if (field.kind === 'enum') {
    const enumName = field.type;
    const enumValues = enums.find((it) => it.name === enumName)?.values || [];
    if (enumValues.length === 0) {
      logger.warn(
        `Enum ${enumName} has no enum values. Field ${field.name} won't be generated.`,
      );
    } else {
      const enumValuesAsString = enumValues
        .map((v) => `'${v.name}'`)
        .join(', ');
      return `${field.name}: faker.helpers.arrayElement([${enumValuesAsString}])`;
    }
  }
  if (field.type === 'String') {
    if (field.isList) {
      return `${field.name}: faker.lorem.words(5).split(' ')`;
    }
    if (field.name === 'email') {
      return `${field.name}: faker.internet.email()`;
    }
    if (field.name === 'name') {
      return `${field.name}: faker.name.fullName()`;
    }
    if (field.name === 'firstName') {
      return `${field.name}: faker.name.firstName()`;
    }
    if (field.name === 'lastName') {
      return `${field.name}: faker.name.lastName()`;
    }
    return `${field.name}: faker.lorem.words(5)`;
  }
  if (field.type === 'Int' || field.type === 'BigInt') {
    if (field.isList) {
      return `${field.name}: [faker.datatype.number(),faker.datatype.number(),faker.datatype.number(),faker.datatype.number(),faker.datatype.number()]`;
    }
    return `${field.name}: faker.datatype.number()`;
  }
  if (field.type === 'Float') {
    if (field.isList) {
      return `${field.name}: [faker.datatype.float(),faker.datatype.float(),faker.datatype.float(),faker.datatype.float(),faker.datatype.float()]`;
    }
    return `${field.name}: faker.datatype.float()`;
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
      return `${field.name}: [faker.datatype.datetime(),faker.datatype.datetime(),faker.datatype.datetime(),faker.datatype.datetime(),faker.datatype.datetime()]`;
    }
    return `${field.name}: faker.datatype.datetime()`;
  }
  if (field.type === 'Json') {
    return `${field.name}: faker.datatype.json()`;
  }
  logger.warn(
    `Type ${field.type}${field.isList ? '[]' : ''} (${
      field.kind
    }) is not supported. Field ${field.name} won't be generated.`,
  );
  return null;
}

export async function createMethods({ enums, models }: DMMF.Datamodel) {
  const functions: string[] = [];

  models.forEach((m) => {
    const validFields = m.fields
      .filter((field) => !field.isId)
      .filter((field) => field.kind === 'scalar' || field.kind === 'enum')
      .filter((field) => {
        return !m.fields.find((it) => {
          return it.relationFromFields?.includes(field.name);
        });
      })
      .filter((field) => !field.hasDefaultValue)
      .map((f) => getFieldDefinition(f, enums))
      .filter(Boolean);

    functions.push(
      `export function fake${m.name}(overrides?: Partial<Prisma.${
        m.name
      }UncheckedCreateInput>) {
        return {
          ${validFields.join(',\n')}${validFields.length > 0 ? ',' : ''}
          ...overrides,
        }
      }`,
    );
  });
  return await formatFile(`
  import type { Prisma } from '@prisma/client';
  import { faker } from '@faker-js/faker';
  
  ${functions.join('\n')}`);
}
