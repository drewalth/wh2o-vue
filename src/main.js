import Vue from 'vue'
import VueMeta from 'vue-meta'
import CarbonComponents from '@carbon/vue'

import './app/assets/scss/app.scss'
import './app/plugins'
import './app/filters'
import './registerServiceWorker'

import apolloProvider from './app/plugins/apollo-client'

import App from './app/app.vue'
import router from './app/app-routes'
import store from './app/app-state'
import { laravelDeploy } from './app/environment'

import VueApollo from 'vue-apollo'

Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.config.productionTip = false

Vue.use(CarbonComponents)
Vue.use(VueMeta)
Vue.use(VueApollo)

let mountPoint

/**
 * determines where to mount the vue app.
 *
 * If we're mounting inside the production laravel app
 * use the shadow DOM, if not, the normal #app
 *
 */
if (laravelDeploy) {
  if (process.env.NODE_ENV === 'production') {
    mountPoint = document.querySelector('#wh2o-vue-host').shadowRoot.querySelector('#wh2o-vue')
  } else {
    mountPoint = '#wh2o-vue'
  }
} else {
  mountPoint = '#app'
}

export const wh2o = new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount(mountPoint)
