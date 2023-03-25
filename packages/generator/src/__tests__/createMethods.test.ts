import { test, expect } from 'vitest';
import { createMethods } from '../helpers/createMethods';
import { getSampleDMMF } from './testUtils';

test('createMethods', async () => {
  const sampleDMMF = await getSampleDMMF();
  expect(await createMethods(sampleDMMF.datamodel)).toMatchSnapshot();
});
