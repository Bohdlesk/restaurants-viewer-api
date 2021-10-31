module.exports = {
  extends: ['prettier'],
  plugins: ['prettier'],
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  rules: {
    camelcase: [
      'off',
      {
        properties: 'always',
        ignoreDestructuring: true,
        ignoreGlobals: false,
      },
    ],
    'import/no-unresolved': 'off',
    'global-require': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['**/test.js'],
      env: {
        mocha: true,
      },
      plugins: [],
      rules: {
        'global-require': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  parser: 'babel-eslint',
};
