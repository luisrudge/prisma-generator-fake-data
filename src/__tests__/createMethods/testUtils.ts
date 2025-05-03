import { getDMMF, getSchema } from '@prisma/internals';
import path from 'path';

export async function getSampleDMMF() {
  const schema = await getSchema(path.join(__dirname, './sample.prisma'));
  return getDMMF({
    datamodel: schema,
  });
}
