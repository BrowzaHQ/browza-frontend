// ESLint 9 flat config format
// Migrated from .eslintrc.json to support ESLint 9.39.1
// See: https://eslint.org/docs/latest/use/configure/configuration-files
import nextConfig from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextConfig,
  {
    // Files and directories to ignore during linting
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'node_modules/**',
    ],
  },
];

export default config;
