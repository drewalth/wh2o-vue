module.exports = {
  root: true,

  env: {
    node: true,
    jest: true
  },

  rules: {
    'vue/use-v-on-exact': 1,
    'vue/v-on-style': 2,
    'no-console': 2,
    'no-debugger': 2,
    radix: 1,
    'vue/attributes-order': 2,
    'vue/eqeqeq': 2,
    'vue/html-self-closing': 1,
    'vue/match-component-file-name': 1,
    'vue/no-boolean-default': 1,
    'vue/no-restricted-syntax': 2,
    'vue/no-side-effects-in-computed-properties': 1,
    'vue/no-use-v-if-with-v-for': 2,
    'vue/no-v-html': 1,
    'vue/require-direct-export': 2,
    'vue/require-prop-type-constructor': 2,
    'vue/require-prop-types': 2,
    'vue/require-render-return': 2,
    'vue/require-v-for-key': 2,
    'vue/return-in-computed-property': 2,
    'vue/this-in-template': 2,
    'vue/valid-template-root': 2,
    'vue/valid-v-for': 2,
    camelcase: 'off',
    'vue/order-in-components': [
      2,
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          [
            'delimiters',
            'comments'
          ],
          [
            'components',
            'directives',
            'filters'
          ],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          [
            'props',
            'propsData'
          ],
          'fetch',
          'asyncData',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          'head',
          [
            'template',
            'render'
          ],
          'renderError'
        ]
      }
    ],
    'vue/component-tags-order': [2, {
      order: ['template', 'script', 'style']
    }]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard',
    'plugin:vue/essential'
  ]
}
