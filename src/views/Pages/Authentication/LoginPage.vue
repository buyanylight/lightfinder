<template>
<v-img :src="backgroundImg" class="page-vimg">

	<v-container  justify-center align-center fill-height pa-0>
	  <v-layout row wrap justify-center align-center style="width: 100%;">
		<v-flex xs12>
			<v-card class="text-xs-center margin-auto border-radius6 box-white-500-glow elevation-10 auth-box">
			<v-layout align-center justify-center row fill-height wrap>
			  <v-flex xs12 class="text-xs-center mt-3">
				
				<!-- <img src="/static/vuse-circle-white.svg" alt="Vuse" class="text-xs-center" height="100"> -->
				<a href="https://buyanylight.com">					
				<img src="/static/logos/logo-black.png" alt="Buy Any Light" class="text-xs-center" id="logo" >
				</a>
				

				<!-- <h4 v-html="test">{{ test }}</h4> -->

				<!-- if not mobile -->
				<!-- //////////////////////////////////////////////////////////// -->
				<template v-if="!isInMobile()">
				<!-- <template v-if="true"> -->
				<!-- <div class="headline">Sign in to your account</div> -->
				<v-form @submit.prevent="" ref="form">
				  <v-layout wrap row pa-4>

					<v-flex xs12 pa-0>
					  <v-text-field
						color="primary"
						label="Email"
						v-model="form.email"
						placeholder=" "
						required
						:error-messages="fieldErrors('form.email')"
						@blur="$v.form.email.$touch()"
					  ></v-text-field>

					  <v-text-field
						color="primary"
						label="Password"
						v-model="form.password"
						placeholder=" "
						type="password"
						required
						:error-messages="fieldErrors('form.password')"
						@blur="$v.form.password.$touch()"
					  ></v-text-field>
					  <!-- <div class="width-150x margin-horiz-center">
						<v-checkbox
						  color="primary"
						  v-model="form.rememberme"
						  required
						>
						  <div slot="label" @click.stop="() => {}">
							Remember me
						  </div>
						</v-checkbox>
					  </div> -->
					</v-flex>

					<v-flex xs12>
					  <v-layout row wrap text-xs-center>
						<!-- Login form submit -->
						<v-flex xs12 class="">
						  <v-btn
							color="md-black-500"
							@click="$v.$invalid ? null : submit()"
							:disabled="$v.$invalid"
							:loading="loading"
							block
							:class="$v.$invalid ? '' : 'white--text'"
						  >Login</v-btn>
						</v-flex>

						<!-- social login -->
						<!-- /////////////////////////////////////////////////// -->
						<v-flex xs12 my-3 class="">
							<!-- :disabled="$v.$invalid && $gAuth.isInit" -->
							<!-- :disabled="!$gAuth.isInit" -->
							<!-- :disabled="!isInit" -->
							<v-btn 
							style="height: 45px;"
							flat
							@click="handleClickSignIn()"
							:loading="socialLoading"
							class="social-buttons px-2 py-2">
								<img class="mr-2" style="width: 30px;" src="/static/google/goggle-logo-transparent.png"> Google Login
								<!-- <v-icon class="mr-2">fab fa-google</v-icon> Google Login -->
							</v-btn>

						</v-flex>

						<v-flex xs12 my-3 class="" v-if="false">
							<v-btn 
							fab flat
							@click="authenticate('google')"
							:loading="socialLoading"
							class="social-buttons px-2 py-1">
								<!-- <img style="" src="/static/google/goggle-logo-transparent.png"> -->
								<v-icon>fab fa-google</v-icon>
							</v-btn>

							<v-btn 
							fab flat
							@click="authenticate('linkedin')"
							:loading="socialLoading"
							class="social-buttons px-2 py-1">
								<!-- <img style="" src="/static/google/goggle-logo-transparent.png"> -->
								<v-icon>fab fa-linkedin</v-icon>
							</v-btn>

							<v-btn 
							fab flat
							@click="authenticate('facebook')"
							:loading="socialLoading"
							class="social-buttons px-2 py-1">
								<!-- <img style="" src="/static/google/goggle-logo-transparent.png"> -->
								<v-icon>fab fa-facebook-square</v-icon>
							</v-btn>
						</v-flex>
						<!-- /////////////////////////////////////////////////// -->
						<!-- social login -->
						
						<!-- Forgot password -->
						<!-- ////////////////////////////////////////////// -->
						<v-flex xs12 mt-3>
							<router-link 
							:to="{ name: 'ForgotPasswordPage' }" 
							tag="div" 
							class="grey--text cursor-pointer">
								<strong>Forgot Password?</strong>
							</router-link>
						</v-flex>
						<!-- ////////////////////////////////////////////// -->
						<!-- Forgot password -->
						
					  </v-layout>
					</v-flex>
				  </v-layout>
				</v-form>
				</template>
				<!-- //////////////////////////////////////////////////////////// -->
				<!-- if not mobile -->


				<v-layout 
				v-else
				wrap row pa-4>
					<v-flex xs12>
						
						<p style="font-size: 1.2em; text-align: center;">
							BuyAnyLight will be available for your mobile device soon. 
						</p>
						<p style="font-size: 1.2em; text-align: center;">
							Please use <strong>a Desktop or a Laptop</strong> browser to access BuyAnyLight.
						</p>
						<p style="font-size: 1.5em; text-align: center;">
							<strong>Thank You!</strong>
						</p>
						
						<p class="mb-0" style="font-size: 1.5em; text-align: center;">
							<strong>
								<!-- <a href="https://buyanylight.com"
								style="
									font-weight: normal;
									font-size: 0.8em;
									text-decoration: none;
									border-bottom: 1px solid #000;
								">back to Home</a> -->

								<v-btn
								href="https://buyanylight.com"
								class="white--text black">
									Back to Home
								</v-btn>
							</strong>
						</p>


					</v-flex>
				</v-layout>






			  </v-flex>

			</v-layout>
			</v-card>          	
		</v-flex>




		<!-- for dev -->
		<!-- /////////////////////////////////////////////// -->
		<v-flex xs12 v-if="false">
		<div style="background-color: #fff;" class="pa-3">
				
			<v-layout row wrap>
				<h5 style="width: 100%;" class="ml-2 mb-2">ADMIN</h5>
				<v-btn small @click="form.email='info@bal.com'">info@bal.com</v-btn>
			</v-layout>
			
			<v-divider class="my-2"></v-divider>
			
			<v-layout row wrap mt-3>
				<h5 style="width: 100%;" class="ml-2 mb-2">BUYER</h5>
				<v-btn small @click="form.email='rayniraymell@gmail.com'">rayniraymell@gmail.com</v-btn>
				<v-btn small @click="form.email='buyer@bal.com'">buyer@bal.com</v-btn>
				<v-btn small @click="form.email='lucychao@gmail.com'">lucychao@gmail.com</v-btn>
			</v-layout>
			
			<v-divider class="my-2"></v-divider>

			<v-layout row wrap mt-3>
				<h5 style="width: 100%;" class="ml-2 mb-2">SUPPLIER</h5>
				<v-btn small @click="form.email='supplier@bal.com'">supplier@bal.com</v-btn>
				<v-btn small @click="form.email='info@almani.ae'">info@almani.ae</v-btn>
			</v-layout>
		</div>
		</v-flex>
		<!-- /////////////////////////////////////////////// -->
		<!-- for dev -->

		<v-flex xs12>
			<div class="doc-links">
				<div class="cont">
					
					<a v-if="isInMobile()" target="_blank" href="https://buyanylight.com/#contact">Help</a>
					<a v-else target="_blank" href="https://buyanylight.com/contact">Help</a>

					<a target="_blank" href="https://buyanylight.com/terms">Terms of Use</a>
					<a target="_blank" href="https://buyanylight.com/privacy">Privacy & Cookies</a>
				</div>
			</div>
		</v-flex>
		
	  </v-layout>
	  <v-layout row wrap>

	  </v-layout>
	</v-container>

	<two-weeks-dialog :dialog.sync="showTwoWeeksDialog">
	</two-weeks-dialog>

	<v-snackbar
	v-model="snackbar"
	absolute
	top
	right
	color="act">
	  <span>Sign in successful!</span>
	  <v-icon dark>check_circle</v-icon>
	</v-snackbar>

	<v-snackbar
	v-model="snackbar_error"
	absolute
	top
	right
	color="red">
	  <span>Sign in unsuccessful!</span>
	  <v-icon dark>error</v-icon>
	</v-snackbar>

	<v-snackbar
	v-model="snackbar_cookie"
	absolute
	top
	right
	color="red">
	  <span>Third-party cookies maybe blocked on you browser, please unblocked them&nbsp;&nbsp;</span>
	  <v-icon dark>error</v-icon>
	</v-snackbar>

</v-img>
</template>




<script src="https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js"></script>


<script>
import { OAuth } from "oauthio-web";
import { required, email, minLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'
import TwoWeeksDialog from '@/views/Components/App/Login/TwoWeeksDialog'
import hlprs from '@/mixins/helpers'
  
import axios from 'axios'


function openWindow (url, title, options = {}) {
	if (typeof url === 'object') {
	options = url
	url = ''
	}

	options = { url, title, width: 600, height: 720, ...options }

	const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
	const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
	const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
	const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height

	options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
	options.top = ((height / 2) - (options.height / 2)) + dualScreenTop

	const optionsStr = Object.keys(options).reduce((acc, key) => {
	acc.push(`${key}=${options[key]}`)
	return acc
	}, []).join(',')

	const newWindow = window.open(url, title, optionsStr)

	if (window.focus) {
	newWindow.focus()
	}

	return newWindow
}

const defaultForm = {
	// email: 'info@bal.com',
	// email: 'buyer@bal.com',
	// email: 'supplier@bal.com',
	// email: 'm.ozil@philips.com',
	// email: 'z.abdin@almani.ae',
	email: '',
	password: '',
	rememberme: false
}

export default {
	mixins: [
		validationMixin,
		hlprs,
	],

	components: {
		TwoWeeksDialog,
	},

	validations: {
		form: {
			email: {
				required, email
			},
			password: {
				required, minLength: minLength(6)
			}
		}
	},
	validationMessages: {
		form: {
			email: {
				required: 'Please enter email',
				email: 'Email must be valid'
			},
			password: {
				required: 'Please enter password',
				minLength: 'Password must be of 6 characters'
			}
		}
	},

	data: () => ({
		form: Object.assign({}, defaultForm),
		snackbar: false,
		snackbar_error: false,
		snackbar_cookie: false,
		// backgroundImg: '/static/doc-images/HexesisMaterial01.png'
		// backgroundImg: '/static/background-img/dubai-waters-blue-1.jpg'
		// backgroundImg: '/static/boats/boats-uploaded/boat4.jpg',
		backgroundImg: '/static/background/buyer-background.jpg',
		loading: false,

		showTwoWeeksDialog: false,
		
		// google login
		/////////////////////////////////////////////////////
		isInit: false, 
		isSignIn: false,
		googleLoading: false,
		googleUser: null,
		/////////////////////////////////////////////////////
		// google login

		test:"",
		socialLoading: false,


	}),

	created() {

		// if(this.isMobile())
		// alert('IS MOBILE!! < 760');
		// else
		// alert('IS NOT MOBILE!! > 760');

		// if(this.isIE())
		// alert('IS IE!!');
		// else
		// alert('IS NOT IE!!');

	},

	methods: {

		twoWeeksDialog() {
			this.showTwoWeeksDialog = true;
		},

		// Login is disabled until further notice (2 weeks)
		submit() {

			this.loading = true;
			this.$store.dispatch('auth/retrieveToken_a', {
				username: this.form.email,
				password: this.form.password,
			}).then((response) => {
				this.snackbar = true
				this.snackbar_error = false
				this.resetForm()
				this.$v.$reset()

				const vueThis = this;
				setTimeout(function() {
					vueThis.$store.dispatch('auth/loginSuccess_a');
					vueThis.loading = false;
				}, 1500);

			}).catch((e) => {
				this.snackbar = false
				this.snackbar_error = true
				this.loading = false;
				console.log('Error: ' + e);
			}).finally(() => {
				// console.log('finally');
				this.loading = false;
			});

		},


		resetForm() {
			this.form = Object.assign({}, defaultForm)
			this.$refs.form.reset()
		},

		// google login
		////////////////////////////////////////////////////////////////////////
		// handleClickGetAuth() {
		// 	this.$gAuth.getAuthCode()
		// 	.then(authCode => {
		// 		// On success
		// 		return this.$http.post('http://your-backend-server.com/auth/google', {
		// 			code: authCode,
		// 			redirect_uri: 'postmessage'
		// 		})
		// 	})
		// 	.then(response => {
		// 		// And then
		// 	})
		// 	.catch(error => {
		// 		// On fail do something
		// 	})
		// },
		handleClickSignIn() {
			console.log('handleClickSignIn')
			console.log('this.$gAuth',this.$gAuth)
			this.socialLoading = true;


			this.$gAuth.signIn()
			.then(user => {
				console.log('this.$gAuth',this.$gAuth)
				// On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
				// console.log('GoogleUser', GoogleUser)
				this.googleUser = user;
				console.log('google user', user)
				this.isSignIn = this.$gAuth.isAuthorized

				this.loginViaOAuth();

			})
			.catch(e => {
				// On fail do something
				console.log('handleClickSignIn e',e)
				console.log('this.$gAuth',this.$gAuth)

				// alert here that to unblock 3rd party Cookies
				//////////////////////////////////////////////////////////////////////////

				// this.$cookies.set('test','value');
				
				// uncomment this later
				// if(e.error != "popup_closed_by_user" || !this.$gAuth.isAuthorized)
				// this.snackbar_cookie = true;
				//////////////////////////////////////////////////////////////////////////
				// alert here that to unblock 3rd party Cookies

				this.socialLoading = false;
			})
		},
		handleClickSignOut() {
			this.$gAuth.signOut()
			.then(() => {
				// On success do something
				this.isSignIn = this.$gAuth.isAuthorized
			})
			.catch(error => {
				// On fail do something
			})
		},

		loginViaOAuth() {


			var user = {
				first_name: this.googleUser.w3.ofa,
				last_name: this.googleUser.w3.wea,
				email: this.googleUser.w3.U3,
				profile_image: this.googleUser.w3.Paa,
				main_interest: (this.main_interest)?this.main_interest:'',
				id_token: this.googleUser.Zi.Paa,
				google: this.googleUser,
			};

			this.$store.dispatch('auth/retrieveTokenOAuth_a', {
				user: user,
				loginType: 'google',
			}).then((response) => {
				this.snackbar = true
				this.snackbar_error = false
				this.resetForm()
				this.$v.$reset()

				const vueThis = this;
				setTimeout(function() {
					vueThis.socialLoading = false;
					
					if(vueThis.isInMobile())
					vueThis.$router.push({name:'Logout'});                
					else
					vueThis.$store.dispatch('auth/loginSuccess_a');


				}, 1500);

			}).catch((e) => {
				this.snackbar = false
				this.snackbar_error = true
				this.socialLoading = false;
				console.log('Error: ' + e);
			}).finally(() => {
				// console.log('finally');
				this.socialLoading = false;
			});

		},		
		////////////////////////////////////////////////////////////////////////
		// google login




		// Social Login
		////////////////////////////////////////////////////////////////////////
		authenticate (provider) {
			// const newWindow = openWindow('', 'message')
			// axios({
			// 	method: 'post',
			// 	url: 'https://accounts.google.com/o/oauth2/auth',
			// 	headers: {'content-type': 'application/x-www-form-urlencoded'},
			// 	data: {
			// 		code: '',
			// 		client_id: '357366120684-4kni7uj7n2c86osuce6lf8t9t13m6fu8.apps.googleusercontent.com',
			// 		client_secret: 'zntZwZ5gc2pnUhDPK1067y36',
			// 		redirect_uri: 'https://almani.ddns.net:2021/BAL-Landing_Page/public/auth/google/callback',
			// 		grant_type: 'authorization_code'
			// 	}
			// })
			// .then(response => {
			// 	newWindow.location.href = response.data;
			// })
			// .catch(function (error) {
			//   console.error(error);
			// });



			// this.$auth.logout();
			// this.$auth.authenticate(provider)
			// .then(function (rspns) {
			// 	console.log(rspns);
			// })
			// .catch((e)=>{
			// 	console.log('catch e',e);
			// });


			//Let's say the /me endpoint on the provider API returns a JSON object
			//with the field "name" containing the name "John Doe"
			var vueThis = this;

			var user = {
				first_name: '',
				last_name: '',
				email: '',
				profile_image: '',
				main_interest: '',
				id_token: '',
			};			

			OAuth.initialize('bs3hAYi8z_hPxiu2H7VPlQve8aw');
			OAuth.popup(provider)
			.done(function(result) {
				
				console.log('result: ', result);

				result.get()
				.done(function (rspns) {

					console.log('rspns: ', rspns);



					if(provider=='google') {
						vueThis.test = rspns.raw.names[0].displayName+" <br> "+rspns.email;

					} 
					else if(provider=='facebook') {
						vueThis.test = rspns.name+" <br> "+rspns.email;
					}
					
					console.log('vueThis.test: ', vueThis.test);

				})
				.fail(function (err) {
					//handle error with err
					console.log(err);
				});

			})
			.fail(function (err) {
				//handle error with err
			});

		
		},

		// onMessage (msg) {
		// 	if (msg.origin == "https://almani.ddns.net:2021") {
		// 		console.log('email',msg.data.email);
		// 		console.log('fullname',msg.data.fullname);

		// 		this.test = msg.data.email+" <br> "+msg.data.fullname;
		// 	}			
		// },	
		////////////////////////////////////////////////////////////////////////
		// Social Login
	},



	mounted() {


		// google login
		////////////////////////////////////////////////////////////////////////		
		// let that = this;
		// let checkGauthLoad = setInterval(function() {

		// 	that.isInit = (that.$gAuth) ? that.$gAuth.isInit : false;
		// 	that.isSignIn = (that.$gAuth) ? that.$gAuth.isAuthorized : false

		// 	console.log('that.$gAuth', that.$gAuth);
		// 	console.log('that.isInit', that.isInit);
		// 	// console.log('that.$gAuth.GoogleAuth', that.$gAuth.GoogleAuth);

		// 	if (that.isInit)
		// 	clearInterval(checkGauthLoad)

		// }, 3000);


		// setTimeout(()=>{
		// 	if(!this.isInit)
		// 	this.snackbar_cookie = true;
		// },5000);

		////////////////////////////////////////////////////////////////////////		
		// google login

		// console.log('googleUser',this.googleUser);

		// window.addEventListener('message', this.onMessage, false);

		// if(!this.$gAuth.isAuthorized && this.$gAuth.isInit)
		// this.snackbar_cookie = true;


	},
 
	beforeDestroy () {
		// window.removeEventListener('message', this.onMessage)
	},

	beforeCreate(){

	},


	computed: {

	},
}
</script>





<style scoped lang="scss">
#logo {
	width: 200px;
	margin: 15px 0 5px 15px;
}  

.doc-links {
	// position: absolute;
	position: fixed;
	bottom: 0px;
	width: 100%;
	left: 0;
	text-align: center;    
	background-color: rgba(0, 0, 0, 0.45);
	.cont {
		// background-color: rgba(0, 0, 0, 0.7);
		width: 350px;
		margin: auto;
		padding: 5px 0px;
		a {
			margin: 20px 10px 30px;
			color: #fff;
			text-decoration: none;
			font-size: 1em;
		}
	}
}

.google-login {
	height: auto;
	padding: 0;
	box-shadow: none !important;
	background-color: transparent !important; 
	
	border: 1px solid #e0e0e0;
	img {
		margin-right: 10px;
		height: 25px;
		margin: 5px 10px 5px 5px;
	}

	/deep/ .v-btn__loading {
		color: #000;
	}
}


.social-buttons {
	/deep/ .v-btn__loading {
	    color: #000;
	}
}

</style>