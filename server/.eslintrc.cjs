module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: '.eslintrc.cjs',
  rules: {},
};
