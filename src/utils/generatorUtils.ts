import { GeneratorOptions } from '@prisma/generator-helper';

export function extractClientPath(options: GeneratorOptions) {
  const clientPath = options.otherGenerators.find(
    (g) => g?.provider?.value === 'prisma-client-js',
  )?.output?.value;

  /**
   * not sure what changed, but this value was undefined before
   * and now it's set to the full path of the client (including
   * the user folder etc). If we detect that, we just return
   * the @prisma/client string
   */
  if (clientPath?.includes('node_modules/@prisma/client')) {
    return '@prisma/client';
  }

  return clientPath || undefined;
}
