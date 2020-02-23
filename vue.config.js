/**
 * Configuration for Vue CLI
 * @reference https://cli.vuejs.org/config/
 *
 */

module.exports = {
  /**
   * disables lint on save which disrupts workflow.
   * linting reserved for pre-commit git hook.
   */
  lintOnSave: false,
  devServer: {
    /**
   * disables linting overlay which disrupts workflow.
   * linting reserved for pre-commit git hook.
   */
    overlay: {
      error: false,
      warning: false
    }
  },
  css: {
    loaderOptions: {
      sass: {
        /**
         * prependData gives all single file components (SFC) access to variables, mixins, themes.
         * @note it is important to only add abstracts and not include class rule declarations here. For example:
         *
         * GOOD
         * $color-01: #ccc;
         *
         * BAD
         * .foo {background-color:red}
         *
         * This will be a part of the output for every SFC and cause CSS bloat if there are class declarations.
         *
         */
        prependData: `
          @import '@/app/assets/scss/abstracts/_variables.scss';
          @import '@/app/assets/scss/abstracts/_mixins.scss';
          @import '@/app/assets/scss/vendor/_carbon-components-helpers.scss';
          @import '@/app/assets/scss/helpers/_media-queries.scss';       
          `
      }
    }
  },
  /**
   * Progressive Web Application features
   * @reference https://cli.vuejs.org/config/#pwa
   *
   */
  pwa: {
    name: 'American Whitewater',
    themeColor: '#cdd1d4',
    msTileColor: '#FFFFFF',
    assetsVersion: Math.floor(Math.random() * 1000000000),
    appleMobileWebAppCapable: 'yes',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    }
  },
  /**
   * A function that will receive an instance of ChainableConfig powered by webpack-chain.
   * Allows for more fine-grained modification of the internal webpack config.
   * @reference https://cli.vuejs.org/guide/webpack.html#chaining-advanced
   *
   */
  chainWebpack: config => {
    config.module
      .rule('file')
      .test(/\.(png|mp4|jpe?g|gif)$/i)
      .use('file-loader')
      .loader('file-loader')
      .end()
  }
}
