import { GeneratorOptions } from '@prisma/generator-helper';
import { relative, dirname } from 'path';

export function extractClientPath(options: GeneratorOptions) {
  const targetPath = options.generator.output?.value!;
  const clientPath = options.otherGenerators.find((g) =>
    g?.provider?.value?.includes('prisma-client'),
  )?.output?.value;

  if (
    clientPath?.includes('node_modules/@prisma/client') || //unix path
    clientPath?.includes('node_modules\\@prisma\\client') //windows path
  ) {
    return '@prisma/client';
  }

  if (!clientPath) {
    return undefined;
  }

  const targetDir = dirname(targetPath);
  return relative(targetDir, `${clientPath}/client`);
}
