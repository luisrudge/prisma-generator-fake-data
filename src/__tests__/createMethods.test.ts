import { test, expect } from 'vitest';
import { createMethods } from '../helpers/createMethods';
import { getSampleDMMF } from './testUtils';

test('createMethods with extraImport', async () => {
  const sampleDMMF = await getSampleDMMF();
  const extraImport = "import {myCustomFunction} from '../utils/fakeImports'";
  expect(
    await createMethods(sampleDMMF.datamodel, extraImport),
  ).toMatchSnapshot();
});

test('createMethods without extraImport', async () => {
  const sampleDMMF = await getSampleDMMF();
  expect(
    await createMethods(sampleDMMF.datamodel, undefined),
  ).toMatchSnapshot();
});
