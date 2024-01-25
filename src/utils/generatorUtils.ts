import { GeneratorOptions } from '@prisma/generator-helper';

export function extractClientPath(options: GeneratorOptions) {
  return (
    options.otherGenerators.find(
      (g) => g?.provider?.value === 'prisma-client-js',
    )?.output?.value || undefined
  );
}
