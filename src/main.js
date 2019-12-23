// Polyfills for IE Support

// import 'es6-promise/auto'
// require('es6-promise').polyfill();



// require('babel-polyfill')
// require('event-source-polyfill')
// require('es6-promise/auto');

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


import Vuelidate from "vuelidate";

import App from './App'

import config from '@/config/main'


import VueScrollTo from 'vue-scrollto'

// Importing the global css file
import "@/assets/global.scss"
// Importing the global js file
import "@/assets/global.js"



// cookies
//////////////////////////////////////////////////////////////////////////
Vue.use(require('vue-cookies'));
//////////////////////////////////////////////////////////////////////////
// cookies


// google sign in
//////////////////////////////////////////////////////////////////////////
import GAuth from 'vue-google-oauth2'

const gauthOption = {
	clientId: '357366120684-4kni7uj7n2c86osuce6lf8t9t13m6fu8.apps.googleusercontent.com',
	scope: 'profile email',
	prompt: 'select_account'
}
Vue.use(GAuth, gauthOption);
//////////////////////////////////////////////////////////////////////////
// google sign in
	



// vue-recaptcha-v3
//////////////////////////////////////////////////////////////////////////
// import { VueReCaptcha } from 'vue-recaptcha-v3'
// Vue.use(VueReCaptcha, { 
// 	siteKey: '6Lc8aL4UAAAAAF_ke1eo_DaLKtrNK3Y1xTC6lQKe',
// 	loaderOptions: {
// 		useRecaptchaNet: true,
// 		autoHideBadge: true,
// 	},	
// })	
//////////////////////////////////////////////////////////////////////////
// vue-recaptcha-v3



// Vue oauth2
//////////////////////////////////////////////////////////////////////////
// import VueAxios from 'vue-axios'
// import axios from 'axios';
// Vue.use(VueAxios, axios)

// const apiDomain = 'http://almani.ddns.net:1984';

// import VueAuthenticate from 'vue-authenticate';
// const providers = {
// 	google: {
//   		clientId: '357366120684-4kni7uj7n2c86osuce6lf8t9t13m6fu8.apps.googleusercontent.com',
//   		clientSecret: 'zntZwZ5gc2pnUhDPK1067y36',
// 		name: 'google',
// 		url: 'https://almani.ddns.net:2021/BAL-Landing_Page/public/auth/sociallogin',
// 		authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
// 		redirectUri: apiDomain,
// 		requiredUrlParams: ['scope'],
// 		optionalUrlParams: ['display'],
// 		scope: ['profile', 'email'],
// 		scopePrefix: 'openid',
// 		scopeDelimiter: ' ',
// 		display: 'popup',
// 		oauthType: '2.0',
// 		popupOptions: { width: 600, height: 650 }
// 	},	

// };

// Vue.use(VueAuthenticate, {
// 	tokenName: 'access_token',
// 	storageType: 'cookieStorage',
// 	baseUrl: apiDomain, // Your API domain
// 	providers: providers,
// })
//////////////////////////////////////////////////////////////////////////
// Vue oauth2




// Vue oauth2
//////////////////////////////////////////////////////////////////////////
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


// const apiDomain = 'http://almani.ddns.net:1984';

// import VueSocialauth from 'vue-social-auth';
import VueAuthenticate from 'vue-authenticate'

Vue.use(VueAuthenticate, {
	// baseUrl: 'http://localhost', // Your API domain
	// baseUrl: 'https://almani.ddns.net:1984/login', // Your API domain
	// baseUrl: 'https://almani.ddns.net:2021/BAL-Landing_Page/public', // Your API domain
	providers: {
		// google: {
		// 	clientId: '357366120684-4kni7uj7n2c86osuce6lf8t9t13m6fu8.apps.googleusercontent.com',
		// 	clientSecret: 'zntZwZ5gc2pnUhDPK1067y36',
		// 	redirectUri: 'https://almani.ddns.net:2021/BAL-Landing_Page/public/auth/google/callback',
		// }
	  
		google: {
			clientId: '357366120684-4kni7uj7n2c86osuce6lf8t9t13m6fu8.apps.googleusercontent.com',
			redirectUri: 'https://almani.ddns.net:2021/BAL-Landing_Page/public/auth/google/callback',
			// name: 'google',
			// clientSecret: 'zntZwZ5gc2pnUhDPK1067y36',
			// url: '/auth/google',
			// authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
			// requiredUrlParams: ['scope'],
			// optionalUrlParams: ['display'],
			// scope: ['profile', 'email'],
			// scopePrefix: 'openid',
			// scopeDelimiter: ' ',
			// display: 'popup',
			// oauthType: '2.0',
			popupOptions: { 
				width: 452, 
				height: 633,
				location: 100, 
			},
		},


	    linkedin: {
		clientId: '81r09zbihvmjcl',
		redirectUri: 'https://almani.ddns.net:2021/BAL-Landing_Page/public/auth/linkedin/callback',
	    	// name: 'linkedin',
	    	// url: '/auth/linkedin',
	    	authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
	    	// requiredUrlParams: ['state'],
	    	scope: ['r_liteprofilexxx'],
	    	// scopeDelimiter: ' ',
	    	// state: 'STATE',
	    	// oauthType: '2.0',
	    	popupOptions: { width: 527, height: 582 }
	    },


	}
})
//////////////////////////////////////////////////////////////////////////
// Vue oauth2




// Vue socket.io
///////////////////////////////

// on https://alligator.io/vuejs/vue-socketio/ it says this but has error so we added -client
// import socketio from 'socket.io'; 
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
// const SocketInstance = io('http://192.168.1.202:4113');
const SocketInstance = io(config.socketURL);

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
Vue.use(Vuelidate);

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

// import UserDetailsDev from "@/views/Components/App/UserDetailsDev";
// Vue.component('user-details-dev', UserDetailsDev)





// authentication
import middleware from '@/router/middleware'
router.beforeEach(middleware)

////////////////////////////////////////////////////
// Custom by tawing
 





import helpers from "@/mixins/helpers"
Vue.mixin(helpers);


































/* eslint-disable no-new */
export default new Vue({ 
	el: '#app',
	router,
	store,
	i18n,
	render: h => h(App)
})


