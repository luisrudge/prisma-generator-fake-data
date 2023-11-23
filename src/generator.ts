import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { GENERATOR_NAME } from './constants';
import { createMethods } from './helpers/createMethods';
import { extractClientPath } from './utils/generatorUtils';
import { writeFileSafely } from './utils/writeFileSafely';
import invariant from 'tiny-invariant';

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
    invariant(
      typeof options.generator.config.extraExport === 'string' ||
        options.generator.config.extraExport === undefined,
      'extraExport must be a string or empty',
    );
    invariant(
      typeof options.generator.config.extraExport === 'string' ||
        options.generator.config.extraExport === undefined,
      'extraExport must be a string or empty',
    );
    invariant(
      typeof options.generator.config.emptyValueAs === 'string' ||
        options.generator.config.emptyValueAs === undefined,
      'emptyValueAs must be a string or empty',
    );

    const fakeMethods = await createMethods(
      options.dmmf.datamodel,
      options.generator.config.extraImport as string | undefined,
      options.generator.config.extraExport as string | undefined,
      options.generator.config.emptyValueAs as string | undefined,
      extractClientPath(options),
    );

    await writeFileSafely(options.generator.output?.value!, fakeMethods);
  },
});
