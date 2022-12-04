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
    'vue/no-template-shadow': 0
  }
}
