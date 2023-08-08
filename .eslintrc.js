module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'xo',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      extends: ['xo-typescript'],
      files: ['*.ts', '*.tsx'],
    },
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'unused-imports'],
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 0,
    'unused-imports/no-unused-imports': 'error',
    'new-cap': 0,
    '@typescript-eslint/indent': 0,
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': 0,
  },
};
