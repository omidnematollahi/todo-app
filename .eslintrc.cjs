const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce(
  (acc, rule) => {
    acc[`jsx-a11y/${rule}`] = 'off';
    return acc;
  },
  {},
);
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh'],
  extends: [
    'plugin:eslint-plugin-import/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    'eslint-config-airbnb',
    'prettier',
  ],
  env: {
    browser: true,
    es2020: true,
  },
  rules: {
    ...a11yOff,
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'no-useless-concat': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'react/function-component-definition': 'off',
    'import/no-cycle': 'off',
    'import/export': 0,
    'import/order': [
      'error',
      {
        pathGroups: [
          { pattern: 'react', group: 'builtin' },
          { pattern: 'vite', group: 'builtin' },
          { pattern: '~api/**', group: 'internal' },
          { pattern: '~store/**', group: 'internal' },
          { pattern: '~lib/**', group: 'internal' },
          { pattern: '~features/**', group: 'internal' },
          { pattern: '~components/**', group: 'internal' },
          { pattern: '~assets/**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              '~api/*/*/**',
              '~assets/*/**',
              '~features/*/**',
              '~components/*/**',
              '~lib/*/**',
              '~store/**',
            ],
            message:
              'Direct access to the internal parts of the module is prohibited',
          },
          {
            group: [
              '../**/api',
              '../**/assets',
              '../**/features',
              '../**/components',
              '../**/lib',
              '../**/store',
            ],
            message: 'Prefer absolute imports instead of relatives',
          },
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['./vite.config.ts'] },
    ],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['./src/**/*.ts', './src/**/*.tsx'],
      extends: [
        'plugin:eslint-plugin-import/typescript',
        'eslint-config-airbnb-typescript',
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json'],
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'object-curly-newline': 'off',
        '@typescript-eslint/indent': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              '**/msw/**',
              '**/react-query/utils.tsx',
              '**/react-router/utils.ts',
            ],
          },
        ],
      },
    },
    {
      files: ['**/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/no-debugging-utils': 'warn',
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
