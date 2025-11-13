// ESLint 9 flat config format
// Upgraded to ESLint 9.39.1 with explicit plugin configuration
// See: https://eslint.org/docs/latest/use/configure/configuration-files

import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';

const config = [
  // Global ignores for ESLint v9
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'node_modules/**',
      'dist/**',
    ],
  },
  // Base ESLint recommended rules
  js.configs.recommended,
  // Main configuration
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // Node globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'writable',
        global: 'readonly',
        Buffer: 'readonly',
        // ES2021 globals
        Promise: 'readonly',
        Symbol: 'readonly',
        WeakMap: 'readonly',
        WeakSet: 'readonly',
        Map: 'readonly',
        Set: 'readonly',
        Proxy: 'readonly',
        Reflect: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react': react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
    },
    rules: {
      // TypeScript ESLint recommended rules
      ...typescriptEslint.configs.recommended.rules,
      // React recommended rules
      ...react.configs.recommended.rules,
      // JSX a11y recommended rules
      ...jsxA11y.configs.recommended.rules,
      // Import plugin rules
      'import/no-unresolved': 'off', // Disabled due to Next.js path alias configuration
      'import/named': 'off', // Disabled to avoid false positives with TypeScript
      'import/default': 'error',
      'import/namespace': 'error',
      // React 17+ JSX Transform - React is no longer required in scope
      'react/react-in-jsx-scope': 'off',
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // TypeScript handles this
      'no-undef': 'off',
      // Relaxed rules to maintain existing code behavior
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'no-empty': 'warn',
      'no-useless-escape': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',
      // Project-specific rules (preserve existing behavior)
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];

export default config;
