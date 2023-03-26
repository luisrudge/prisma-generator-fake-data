import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { GENERATOR_NAME } from './constants';
import { createMethods } from './helpers/createMethods';
import { writeFileSafely } from './utils/writeFileSafely';

const { version } = require('../package.json');
generatorHandler({
  onManifest() {
    return {
      version,
      defaultOutput: './fake-data.ts',
      prettyName: GENERATOR_NAME,
      requiresGenerators: ['prisma-client-js'],
    };
  },
  async onGenerate(options: GeneratorOptions) {
    const fakeMethods = await createMethods(options.dmmf.datamodel);

    await writeFileSafely(options.generator.output?.value!, fakeMethods);
  },
});
