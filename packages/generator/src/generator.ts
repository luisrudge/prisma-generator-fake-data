import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import path from 'path';
import { GENERATOR_NAME } from './constants';
import { createMethods } from './helpers/createMethods';
import { writeFileSafely } from './utils/writeFileSafely';

const { version } = require('../package.json');
generatorHandler({
  onManifest() {
    console.log(GENERATOR_NAME);
    logger.info(`${GENERATOR_NAME}:Registered`);
    return {
      version,
      defaultOutput: './fake-data.ts',
      prettyName: GENERATOR_NAME,
    };
  },
  async onGenerate(options: GeneratorOptions) {
    const fakeMethods = await createMethods(options.dmmf.datamodel);

    await writeFileSafely(options.generator.output?.value!, fakeMethods);
  },
});
