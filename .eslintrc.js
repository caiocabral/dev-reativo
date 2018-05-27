module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: ['prettier', 'prettier/standard', 'plugin:vue/recommended'],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': [
      'error',
      'only-multiline',
    ],
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": [],
    }]
  },
};
