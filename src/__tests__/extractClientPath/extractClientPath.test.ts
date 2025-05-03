import { describe, expect, test } from 'vitest';
import { getDMMF, getGenerators } from '@prisma/internals';
import { extractClientPath } from '../../utils/generatorUtils';
import path from 'path';

describe('extractClientPath', () => {
  test('without client path, without fake path', async () => {
    const clientPath = await getClientImportPath('0-0');
    expect(clientPath).equal('@prisma/client');
  });
  test('without client path, with fake path', async () => {
    const clientPath = await getClientImportPath('0-1');
    expect(clientPath).equal('@prisma/client');
  });
  test('with client path, without fake path', async () => {
    const clientPath = await getClientImportPath('1-0');
    expect(clientPath).equal('../.prisma');
  });
  test('with client path, with fake path', async () => {
    const clientPath = await getClientImportPath('1-1');
    expect(clientPath).equal('../.prisma');
  });
});

async function getClientImportPath(fromPostFix: string) {
  const prismaFilePath = path.join(
    __dirname,
    `./samples/clientPath-fakePath-${fromPostFix}.prisma`,
  );
  const [generators, dmmf] = await Promise.all([
    getGenerators({
      skipDownload: true,
      schemaPath: prismaFilePath,
    }),
    getDMMF({
      datamodelPath: prismaFilePath,
    }),
  ]);

  const clientGen = generators.find((g) => g.config.name.includes('client'))!;
  const fakeGen = generators.find((g) => g.config.name.includes('custom'))!;
  return extractClientPath({
    generator: fakeGen.config,
    otherGenerators: [clientGen.config],
    schemaPath: '',
    dmmf: dmmf,
    datasources: [],
    datamodel: '',
    version: '',
  });
}
