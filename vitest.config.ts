import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    forceRerunTriggers: [
      '**/package.json/**',
      '**/vitest.config.*/**',
      '**/vite.config.*/**',
      'src/__tests__/sample.prisma',
    ],
  },
});
