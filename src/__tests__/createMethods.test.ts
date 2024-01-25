import { test, expect } from 'vitest';
import { createMethods } from '../helpers/createMethods';
import { getSampleDMMF } from './testUtils';

test('createMethods with extraImport', async () => {
  const sampleDMMF = await getSampleDMMF();
  const extraImport = "import {myCustomFunction} from '../utils/fakeImports'";
  expect(
    await createMethods(sampleDMMF.datamodel, extraImport, undefined),
  ).toMatchSnapshot();
});

test('createMethods with extraExport', async () => {
  const sampleDMMF = await getSampleDMMF();
  const extraExport = "export * from '../utils/fakeImports'";
  expect(
    await createMethods(sampleDMMF.datamodel, undefined, extraExport),
  ).toMatchSnapshot();
});

test('createMethods with extraImport and extraExport', async () => {
  const sampleDMMF = await getSampleDMMF();
  const extraImport = "import {myCustomFunction} from '../utils/fakeImports'";
  const extraExport = "export * from '../utils/fakeImports'";
  expect(
    await createMethods(sampleDMMF.datamodel, extraImport, extraExport),
  ).toMatchSnapshot();
});

test('createMethods without extraImport', async () => {
  const sampleDMMF = await getSampleDMMF();
  expect(
    await createMethods(sampleDMMF.datamodel, undefined),
  ).toMatchSnapshot();
});

test('createMethods with `null` as `emptyValueAs`', async () => {
  const sampleDMMF = await getSampleDMMF();
  expect(
    await createMethods(sampleDMMF.datamodel, undefined, undefined, 'null'),
  ).toMatchSnapshot();
});

test('createMethods with default clientImportPath', async () => {
  const sampleDMMF = await getSampleDMMF();
  expect(
    await createMethods(
      sampleDMMF.datamodel,
      undefined,
      undefined,
      'null',
      undefined,
    ),
  ).toMatchSnapshot();
});

test('createMethods with custom clientImportPath', async () => {
  const sampleDMMF = await getSampleDMMF();
  expect(
    await createMethods(
      sampleDMMF.datamodel,
      undefined,
      undefined,
      'null',
      './src/generated/client',
    ),
  ).toMatchSnapshot();
});
