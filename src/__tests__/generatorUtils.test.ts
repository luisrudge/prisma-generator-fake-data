import { test, expect, vi } from 'vitest';
import { GeneratorOptions } from '@prisma/generator-helper';
import { extractClientPath } from '../utils/generatorUtils';

test('extractClientPath returns @prisma/client for Unix node_modules path', () => {
  const options = {
    generator: {
      name: 'test-generator',
      provider: { value: 'test-provider' },
      output: { value: '/path/to/output' },
    },
    otherGenerators: [
      {
        provider: { value: 'prisma-client-js' },
        output: { value: '/path/to/node_modules/@prisma/client' },
      },
    ],
  } as unknown as GeneratorOptions;

  expect(extractClientPath(options)).toBe('@prisma/client');
});

test('extractClientPath returns @prisma/client for Windows node_modules path', () => {
  const options = {
    generator: {
      name: 'test-generator',
      provider: { value: 'test-provider' },
      output: { value: 'C:\\path\\to\\output' },
    },
    otherGenerators: [
      {
        provider: { value: 'prisma-client-js' },
        output: { value: 'C:\\path\\to\\node_modules\\@prisma\\client' },
      },
    ],
  } as unknown as GeneratorOptions;

  expect(extractClientPath(options)).toBe('@prisma/client');
});

test('extractClientPath returns undefined when client path is not found', () => {
  const options = {
    generator: {
      name: 'test-generator',
      provider: { value: 'test-provider' },
      output: { value: '/path/to/output' },
    },
    otherGenerators: [],
  } as unknown as GeneratorOptions;

  expect(extractClientPath(options)).toBeUndefined();
});

test.each([
  // same directory
  {
    prismaGenerator: {
      provider: { value: 'prisma-client-js' },
      output: { value: '/path/to/custom-client' },
    },
    expectedPath: './custom-client/client',
  },
  {
    prismaGenerator: {
      provider: { value: 'prisma-client' },
      output: { value: '/path/to/custom-client' },
    },
    expectedPath: './custom-client/client',
  },
  // parent directory
  {
    prismaGenerator: {
      provider: { value: 'prisma-client-js' },
      output: { value: '/path/custom-client' },
    },
    expectedPath: '../custom-client/client',
  },
  {
    prismaGenerator: {
      provider: { value: 'prisma-client' },
      output: { value: '/path/custom-client' },
    },
    expectedPath: '../custom-client/client',
  },
])(
  'extractClientPath returns relative path when client is in a custom location, using $prismaGenerator.provider.value',
  ({ prismaGenerator, expectedPath }) => {
    const options = {
      generator: {
        name: 'test-generator',
        provider: { value: 'test-provider' },
        output: { value: '/path/to/output' },
      },
      otherGenerators: [prismaGenerator],
    } as unknown as GeneratorOptions;

    expect(extractClientPath(options)).toBe(expectedPath);
  },
);

test('extractClientPath normalizes Windows paths to use forward slashes', () => {
  const options = {
    generator: {
      name: 'test-generator',
      provider: { value: 'test-provider' },
      output: { value: 'C:\\project\\output' },
    },
    otherGenerators: [
      {
        provider: { value: 'prisma-client' },
        output: { value: 'C:\\project\\client' },
      },
    ],
  } as unknown as GeneratorOptions;

  const result = extractClientPath(options);

  // The key test: result should not contain backslashes
  expect(result).not.toContain('\\');
  // Should contain forward slashes instead
  expect(result).toContain('/');
  // Should be a properly formatted relative path
  expect(result).toMatch(/^\.\.?\/.*\/client$/);
});
