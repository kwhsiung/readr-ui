module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['@vue/prettier', 'plugin:vue/recommended', 'prettier/vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always'
        }
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
