import * as dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vitest/config';

dotenv.config({ path: './.env.local'});

export default defineConfig({
  test: {
    alias: {
      '@src': path.resolve(__dirname, './src/*'),
      '@core': path.resolve(__dirname, './src/core'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@tests': path.resolve(__dirname, './src/tests')
    },
    globals: true,
    coverage: {
      provider: 'istanbul',
      statements: 20,
      reporter: [ 'text', 'lcov' ],
      exclude: [ 'src/**/*.{health,config,module}.ts', 'tests/**', 'src/shared' ],
    },
  },
});