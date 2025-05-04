import js from '@eslint/js';
import globals from 'globals';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import reactPlugin from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strict,
      ...tseslint.configs.strictTypeChecked,
      prettierConfig,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: '.',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      'simple-import-sort': simpleImportSortPlugin,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Warn if components are not exported properly
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Enforce React compiler rules
      'react-compiler/react-compiler': 'error',
      // Warn for unsorted imports
      'simple-import-sort/imports': 'warn',
      // Warn for unsorted exports
      'simple-import-sort/exports': 'warn',
      // Disable unnecessary condition checks
      '@typescript-eslint/no-unnecessary-condition': 'off',
      // Disable enforcing promise rejection with errors
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      // Enforce explicit boolean props
      'react/jsx-boolean-value': ['warn', 'always'],
      // Avoid unnecessary fragments
      'react/jsx-no-useless-fragment': 'warn',
      // Enforce self-closing tags for components without children
      'react/self-closing-comp': 'warn',
      // Ensure `key` prop is used in lists
      'react/jsx-key': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
);
