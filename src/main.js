// Polyfills for IE Support
import 'babel-polyfill'
import 'event-source-polyfill'

import Vue from 'vue'

import router from './router'
import Vuetify from 'vuetify'

import { store } from './store'
import Components from '@/views/Components/Stock/index' // Rolling useful components (PUG)
import Widgets from '@/views/Components/Widgets/index'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'font-awesome/css/font-awesome.min.css'
import './stylus/main.styl'

import colors from 'vuetify/es5/util/colors'

import { createI18n } from './i18n/index'
import Vuebar from 'vuebars'
import Trend from 'vuetrend'
import {truncate} from 'lodash'




import App from './App'


import VueScrollTo from 'vue-scrollto'



// Vue socket.io
///////////////////////////////

// on https://alligator.io/vuejs/vue-socketio/ it says this but has error so we added -client
// import socketio from 'socket.io'; 
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
const SocketInstance = io('http://192.168.1.202:4113');
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketInstance,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
    },    
}));
///////////////////////////////
// Vue socket.io


Vue.config.productionTip = false
Vue.config.debug = true
Vue.config.devtools = true
Vue.config.performance = process.env.NODE_ENV === 'development'



const VueScrollToOptn = {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
};

Vue.use(VueScrollTo,VueScrollToOptn)


Vue.use(Vuebar)
Vue.use(Trend)

Vue.use(Vuetify, {
    // theme: {
    //     primary: store.state.swatch.colorScheme.primary,
    //     secondary: colors.pink.base,
    //     accent: colors.deepPurple.accent2,
    //     error: colors.red.accent4,
    //     info: colors.blue.lighten1,
    //     success: colors.green.accent4,
    //     warning: colors.amber.darken2
    // },


    theme: {
        primary:    "#000",
        secondary:  "#fff",
        accent:     "#000",
        error:      colors.red.accent4,
        info:       colors.blue.lighten1,
        success:    colors.green.accent4,
        warning:    colors.amber.darken2
    },



    options: {
        themeVariations: ['primary', 'secondary']
    }
})

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

Object.keys(Widgets).forEach(key => {
  Vue.component(key, Widgets[key])
})

const emitter = new Vue()
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function () {
      return emitter
    }
  }
})

Vue.filter('twoDigits', (value) => {
  if (value.toString().length <= 1) {
    return '0' + value.toString()
  }
  return value.toString()
})
Vue.filter('capitalize', function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})
Vue.filter('lowercase', function (str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
})
Vue.filter('firstChar', function (str) {
  return str.charAt(0).toUpperCase()
})
Vue.filter('first2Char', function (str) {
  return str.substring(0, 2).toUpperCase()
})
Vue.filter('hljshtml', function (value) {
  return value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
})

Vue.filter('truncate', function (value, args) {
  return truncate(value, args)
})

const i18n = createI18n()



// Custom by tawing
////////////////////////////////////////////////////
import OwlCarousel from 'v-owl-carousel'
Vue.component('carousel', OwlCarousel)





// authentication
import middleware from '@/router/middleware'
router.beforeEach(middleware)

////////////////////////////////////////////////////
// Custom by tawing
 













































/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})


