import { getDMMF, getSchemaWithPath } from '@prisma/internals';
import path from 'path';

export async function getSampleDMMF() {
  const { schemas } = await getSchemaWithPath({
    schemaPath: {
      cliProvidedPath: path.join(__dirname, './sample.prisma'),
    },
  });
  return getDMMF({
    datamodel: schemas,
  });
}
