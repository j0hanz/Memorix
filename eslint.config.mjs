import js from '@eslint/js';
import globals from 'globals';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      eslintConfigPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: '.',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      react,
    },
    settings: {
      react: {
        version: '19',
        fragment: 'Fragment',
      },
      linkComponents: [{ name: 'Link', linkAttribute: 'to' }],
    },
    rules: {
      // React JSX Runtime config
      ...react.configs['jsx-runtime'].rules,
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // TypeScript specific rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          minimumDescriptionLength: 5,
        },
      ],
      // React specific rules
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': [
        'error',
        {
          enforceDynamicLinks: 'always',
          warnOnSpreadAttributes: true,
        },
      ],
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/require-render-return': 'error',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never', propElementValues: 'always' },
      ],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-pascal-case': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function', 'function-declaration'],
          unnamedComponents: 'arrow-function',
        },
      ],
      // React Refresh plugin
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // React Compiler plugin
      'react-compiler/react-compiler': 'error',
    },
  },
);
