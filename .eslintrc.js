module.exports = {
  root: true,
  env: {
    node: true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-useless-escape': 0,
    'vue/no-v-html': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        'max': 3
      },
      multiline: {
        max: 1
      }
    }],
    quotes: ['error', 'single'],
    'no-multi-spaces': ['error'],
    'dot-notation': 0,
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxEOF': 0
    }],
    // 'object-curly-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never']
  }
}
