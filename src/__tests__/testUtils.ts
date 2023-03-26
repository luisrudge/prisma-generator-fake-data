import { getDMMF, getSchemaSync } from '@prisma/sdk';
import path from 'path';

const samplePrismaSchema = getSchemaSync(
  path.join(__dirname, './sample.prisma'),
);

export function getSampleDMMF() {
  return getDMMF({
    datamodel: samplePrismaSchema,
  });
}
