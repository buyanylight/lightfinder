<template>
<span>

	<v-container 
	fluid full-height align-center justify-center 
	id="register-container" 
	style="overflow-y: auto; display: flex;">
	<v-layout row wrap full-height justify-center style="max-height: 720px; max-width: 1200px;">


			<v-flex md4 xs12 class="page-wrap2">
				<v-layout row wrap full-height justify-center>

				<!-- FOR 1ST STEP -->
				  <v-card class="pa-5">
					<!-- <h4 color="grey--text" class="mt-2 text-xsc font-weight-light">Sign-up to find the lights that you are looking for.</h4> -->
					<v-layout row wrap full-height>

						<v-flex xs12 pa-0 mb-4>
							<v-layout row wrap align-center justify-center>
								<v-icon class="mr-3 black--text">fas fa-user-plus</v-icon>
								<div class="headline font-weight-medium text-xs-center">SIGN UP</div>
							</v-layout>
						</v-flex>

						<v-flex xs12 pa-0>
							<v-text-field 
							outline
							color="black" 
							label="First Name" 
							v-model="form.first_name" 
							placeholder=" "
							prepend-inner-icon="fas fa-user"
							autocomplete="off" 
							@blur="$v.form.first_name.$touch()"
							:error-messages="fieldErrors('form.first_name')">
							</v-text-field>

							<v-text-field 
							outline
							color="black" 
							label="Last Name" 
							v-model="form.last_name"
							placeholder=" "
							prepend-inner-icon="fas fa-user"
							autocomplete="off" 
							@blur="$v.form.last_name.$touch()"
							:error-messages="fieldErrors('form.last_name')">
							<!-- :error-messages="['test']"> -->
							</v-text-field>

							<v-text-field 
							outline
							color="black"  
							label="Email Address" 
							v-model="form.email" 
							placeholder=" "
							prepend-inner-icon="fas fa-at"
							autocomplete="disabled" 
							@blur="$v.form.email.$touch()"
							:error-messages="fieldErrors('form.email')" >
							</v-text-field>

							<v-text-field 
							outline
							color="black" 
							label="Password" 
							v-model="form.password" 
							placeholder=" "
							type="password" 
							prepend-inner-icon="fas fa-key"
							autocomplete="off" 
							@blur="$v.form.password.$touch()"
							:error-messages="fieldErrors('form.password')" >
							</v-text-field>

							<v-text-field 
							outline
							color="black" 
							label="Confirm Password" 
							v-model="form.confirmpassword" 
							type="password" 
							prepend-inner-icon="fas fa-key"
							placeholder=" "
							autocomplete="off" 
							@blur="$v.form.confirmpassword.$touch()"
							:error-messages="fieldErrors('form.confirmpassword')" >
							</v-text-field>
						</v-flex>

						<v-flex xs12>
							<v-layout row wrap text-xs-center justify-center align-center>
								<!-- Login form submit -->
								<v-flex xs6 class="white--text no-mrpd">

									<v-btn 
									style="background-color: #7600ff !important;"
									color="black" 
									block 
									:loading="formLoading"
									@click="save()">
										<span class="dark-blue white--text font-weight-light ls-1">SIGN UP</span>
									</v-btn>
								</v-flex>
							</v-layout>
						</v-flex>


						<v-flex xs12 mt-2>
							<v-layout row wrap text-xs-center justify-center align-center>
								<h3>or</h3>
							</v-layout>
						</v-flex>

						<v-flex xs12>
						<!-- google login -->
						<!-- /////////////////////////////////////////////////// -->
						<v-layout row wrap text-xs-center justify-center align-center>
							<v-btn 
							@click="handleClickSignIn()"
							:loading="googleLoading"
							class="google-login px-2 py-1">
								<!-- <img src="/static/google/buttons/btn_google_signin_light_normal_web.png"> -->
								<img 
								style="" 
								src="/static/google/goggle-logo-transparent.png">
								<span class="text-transform-none">Sign in with Google</span>
							</v-btn>
						</v-layout>
						<!-- /////////////////////////////////////////////////// -->
						<!-- google login -->
						</v-flex>


						<v-flex xs12 mt-3>
							<p class="black--text text-xs-center">
								Already have an account?
								Sign in <strong><router-link :to="{ name: 'Login' }" style="border-bottom: 1px solid #000;">here</router-link></strong>.
							</p>
						</v-flex>

					</v-layout>
				  </v-card>
				<!-- FOR 1ST STEP -->

				</v-layout>
			</v-flex>


			<v-flex md4 xs12 class="page-wrap">
				<v-layout column wrap full-height align-start justify-center pa-3>

						<h1 class="white--text header-title">Ready to get the best price the market can offer?</h1>
						<p class="white--text mt-4">Please take a few moments to register and find out what we can do for your next LED lighting project! Rest assured, we’ll be with you every step of the way.</p>

						<!-- <v-container fluid>
						<v-layout row wra justify-center align-center fill-height>
							<a href="https://buyanylight.com" target="_blank">
								<img class="logo" src="/static/logos/logo-white.png" alt="BuyAnyLight.com">
							</a>
						</v-layout>
						</v-container> -->

				</v-layout>
			</v-flex>



	</v-layout>
	</v-container>


	<v-dialog v-model="dialog" persistent width="500">

		<v-card class="px-4 py-1">

			<v-card-text>
				<div class="agree">
					<h2 class="black--text mb-4">VERIFICATION REQUIRED</h2>
					<p style="font-size:1em;"> 
						<span class="mb-4">Thank you so much for signing up with BuyAnyLight (BAL).</span>
						<span class="mb-4">Please verify your email ID by clicking on the link that was send to your registered e-mail ID.</span>
						<span class="mb-4">If you have not received any e-mail from us, please check your Spam/Junk Email folder.</span>
					</p>
				</div>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn class="dark-blue white--text" flat @click="gotoHomePage()">
					close
				</v-btn>
			</v-card-actions>
		</v-card>

	</v-dialog>



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

</span>
</template>

<script>

// import helpers from "@/mixins/helpers";
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'

// import { VueReCaptcha } from 'vue-recaptcha-v3'

// import Vue from 'vue'

import { load } from 'recaptcha-v3'


export default {

mixins: [validationMixin],

validations: {
	form: {
		email: { 
			required, 
			email, 
			isUnq(value){				
				// standalone validator ideally should not assume a field is required
				if (value === '' || value === null) 
				return true
				else
				return this.$store.dispatch('auth/isEmailExist_a',{email:value});
			}, 
		},
		first_name: { required },
		last_name: { required }, 
		password: { required, minLength: minLength(6) },
		confirmpassword: {
			required,
			sameAsPassword: sameAs('password')
		},
	},
},

validationMessages: {
	form: {

	   first_name: { required: 'Please enter your first name.'},
	   last_name: { required: 'Please enter your last name.' },
	   email: { required: 'Please enter email', email: 'Email must be valid', isUnq: 'Email is already registered.' },
	   password: { required: 'Please enter password', minLength: 'Password must be of 6 characters' },	
	   confirmpassword: { required: 'Please confirm your Password.', sameAsPassword: 'Password does not match' },
	},
},



components: {

},

data () { return {

	type: 'buyer',
	backgroundImg: '/static/background/buyer-background2.jpg',
	logo: '/static/logos/logo-white.png',
	// form: Object.assign({}, dform),
	// form: {
	// 	email: 'james99@gmail.com',
	// 	password: '123456',
	// 	confirmpassword: 'belatting',
	// 	first_name: 'Leon',
	// 	last_name: 'Lapid',
	// },
	form: {
		email: null,
		password: null,
		confirmpassword: null,
		first_name: null,
		last_name: null,
	},
	formLoading: false,
	isComplete: false,

	googleCaptchaToken: null,

	dialog: false,

	snackbar: false,
	snackbar_error: false,

	// google login
	/////////////////////////////////////////////////////
	isInit: false, 
	isSignIn: false,
	googleLoading: false,
	googleUser: null,
	/////////////////////////////////////////////////////
	// google login	
}},


computed:{
	emailPending(){
		return this.$v.form.email.$pending;
	}, 

},

methods: {

	save() {

		
		this.$v.$touch();

		if (!this.$v.$invalid) {

				this.formLoading = true;

				load('6Lc8aL4UAAAAAF_ke1eo_DaLKtrNK3Y1xTC6lQKe')
				.then((recaptcha) => {

					recaptcha.execute('registration').then((token) => {
						console.log(token) // Will print the token
						// this.googleToken = token;

						let data = {
							first_name: this.form.first_name,
							last_name: this.form.last_name,
							email: this.form.email,
							password: this.form.password,
							confirm_password: this.form.confirmpassword,
							main_interest: (this.main_interest)?this.main_interest:'',					
							google_token: token,
						};

						this.$store.dispatch('auth/buyerRegistration_a', {
							data: data,
						})
						.then((response) => {
							console.log('save() response',response);
							if (response.status == 200) {
								this.formLoading = false;
								this.dialog = true;
							} else {
								this.$v.$touch();
							}
						})
						.catch((e) => {
							console.log('error',e);
							this.formLoading = false;
							this.snackbar_error = true;
						})

					})
					.catch((e)=>{
						console.log('Google Captcha Error 1: ',e);
						this.formLoading = false;
						this.snackbar_error = true;
					});

				})
				.catch((e)=>{
					console.log('Google Captcha Error 2: ',e);
					this.formLoading = false;
					this.snackbar_error = true;
				});

		}

	},


	gotoHomePage(){
		window.location.href = 'https://buyanylight.com'
	},



	// google login
	////////////////////////////////////////////////////////////////////////
	handleClickSignIn() {
		this.form.email = null;
		this.form.password = null;
		this.form.confirmpassword = null;
		this.form.first_name = null;
		this.form.last_name = null;
		this.$v.form.$reset();
		console.log('handleClickSignIn')
		this.googleLoading = true;
		this.$gAuth.signIn()
		.then(user => {
			// On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
			// console.log('GoogleUser', GoogleUser)
			this.googleUser = user;
			console.log('google user', user)
			this.isSignIn = this.$gAuth.isAuthorized

			this.loginViaOAuth();

		})
		.catch(error => {
			// On fail do something
			console.log('handleClickSignIn error',error)
			this.googleLoading = false;
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

			const vueThis = this;
			setTimeout(function() {
				vueThis.googleLoading = false;
				// vueThis.$store.dispatch('auth/loginSuccess_a');

					
				if(vueThis.isInMobile())
				vueThis.$router.push({name:'Logout'});
				else
				vueThis.$store.dispatch('auth/loginSuccess_a');


			}, 1500);

		}).catch((e) => {
			this.snackbar = false
			this.snackbar_error = true
			this.googleLoading = false;
			console.log('Error: ' + e);
		}).finally(() => {
			// console.log('finally');
			this.googleLoading = false;
		});

	},		
	////////////////////////////////////////////////////////////////////////
	// google login	
},

computed: {
	main_interest(){
		return this.$route.params.main_interest;
	},
},


mounted(){

	// google login
	////////////////////////////////////////////////////////////////////////		
	let that = this;
	let checkGauthLoad = setInterval(function() {

		that.isInit = (that.$gAuth) ? that.$gAuth.isInit : false;
		that.isSignIn = (that.$gAuth) ? that.$gAuth.isAuthorized : false

		console.log('that.$gAuth', that.$gAuth);
		console.log('that.isInit', that.isInit);

		if (that.isInit)
			clearInterval(checkGauthLoad)

	}, 1000);
	////////////////////////////////////////////////////////////////////////		
	// google login	



	// loadRecaptchaV3('6Lc8aL4UAAAAAF_ke1eo_DaLKtrNK3Y1xTC6lQKe', {
	// 	useRecaptchaNet: true,
	// })
	// .then((recaptcha)=>{
	// 	recaptcha('registration').then((token) => {
	// 		console.log(token) // Will print the token
	// 	})
	// 	.catch((e)=>{
	// 		console.log('Google Captcha');
	// 	});
	// });

	
},




} </script>



<style scoped lang="scss">


.registration_container {
	overflow-y: auto;
	height: 100vh;
}

.registration-first {

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

}


.registration-success {

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  .heading {

	h1 {

		font-size: 6rem;
		font-weight: bolder;
		color: #555857;

	}

  }
  .main-content {

	text-align: center;
	
	i {
			color: #24b663;
			font-size: 10rem;
	}

	p {

		font-weight: 500;
		font-size: 1.2rem;
		color: #555857;
		letter-spacing: 1px;
		text-transform: uppercase;

	}


  }

}


.logo {
  margin: 22px 29px 15px;
  width: 81px;

}


.page-vimg {
  background-image:
	linear-gradient(to right bottom,
	rgba(0, 0, 0, 0.7),
	rgba(0, 0, 0, 0.7));
	// width: 40px;
}

.page-wrap {
	// top: 50%;
	// transform: translate(-50%, -50%);
	// width: 50%;
	// height: 100%;
	// padding: 100px;
	// position: relative;
	// background: rgba(0, 0, 0, 0.6);
	.layout {		
		background: linear-gradient(#7600ff, #aae4ff);
		border-radius: 0px 10px 10px 0px;	
	}
}
.page-wrap2 {
	.v-card {
		border-radius: 10px 0 0 10px !important;		
	}
}

.page-content {
  position: relative;
  // top: 30%;
  padding: 20px;
  // padding: 100px;

}

.header-title {
  font-size: 23px;
}

.sub-header-title {
  font-size: 18px;
  letter-spacing: 0.5px;
  line-height: 31px;
}

.dropzone-custom-content {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}


.agree {
	
	margin-top: 20px;

	p {

		font-weight: 400;
		line-height: 23px;
		min-height: 16px;
		-webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		font-size: 12px;
		color: grey;
	
		span {
				display: block;
		}

	}
}


.videocontent { 

	 width: 100%;
	 height:304px;
	 display: flex;
	 justify-content: center;
	 align-content: center;
	 flex-flow: row column;
	 /*padding: 50px;*/

}

.videocontent iframe {
	border-radius:2%; /*use for circle 50% */
	border:solid 0px #999;
	width: 100%;
	height: 100%;


}

#player {

	width: 100%;
	height: 100%;

}

#player-wrapper {
   
	border-radius:2%;  /* use for circle 50% */
	border:solid 0px #999;
	overflow:hidden;
	position: relative;
	width: 100%;
	/*top:40px;*/
	z-index:10;
   -webkit-box-shadow: 1px 11px 20px 4px rgba(0,0,0,0.28);
   -moz-box-shadow: 1px 11px 20px 4px rgba(0,0,0,0.28);
   box-shadow: 1px 11px 20px 4px rgba(0,0,0,0.28);
   /*float: left;*/
   /*margin: 50px;*/

}

.video-area h6 {

	color: white;
	margin-top: 20px;
	font-weight: lighter;
	font-size: 13px;

}




.v-input--selection-controls.v-input >>> .v-label { 

		font-weight: 400;
	line-height: 23px;
	min-height: 16px;
	-webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
	transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
	font-size: 13px;

}

.v-input--selection-controls {

	margin-top: 0px;
	padding-top: 0px;

}

 a {

	cursor: pointer;
	text-decoration: none;
}




.logo {
  margin: 50px 29px -30px;
  width: 180px;

}


#register-container {
	// background-image: url("static/background/bg1-blur-compressed.jpg");
	background-image: url("/static/background/bg1-blur-compressed.jpg");
	background-size: cover;
	background-position: center;

	// .theme--light.v-stepper {
	// 	background-color: transparent;
	// 	box-shadow: none;
	// 	/deep/ .v-stepper__header {
	// 		background-color: #fff;
	// 	}
	// }
}


.theme--light.v-text-field--outline:not(.v-input--is-focused) /deep/ .v-input__slot:hover,
.theme--light.v-text-field--outline /deep/ .v-input__slot {
	border: 1px solid rgba(0,0,0,0.54);	
}


.v-text-field {
	/deep/ .v-icon {
		font-size: 20px;
	}
}



.register-stepper.v-stepper /deep/  {

	background-color: transparent;
	box-shadow: none;
	box-shadow: none;
	.v-stepper__header {
		height: 50px;
		// background-color: #fff;
		background-color: transparent;
		box-shadow: none;
		.v-stepper__step {
			padding: 5px 24px;
			.v-stepper__step__step {
				background-color: #fff !important;
				color: #000;
				font-weight: bold;
			}
		}
		.v-stepper__step.v-stepper__step--editable:hover {
			background-color: transparent;
		} 

		.v-stepper__step.v-stepper__step--inactive{
			.v-stepper__step__step {
				background-color: #fff !important;
				color: #000;
				font-weight: bold;
			}
		}
		.v-stepper__step.v-stepper__step--active{
			.v-stepper__step__step {
				background-color: #fff !important;
				color: #000;
				font-weight: bold;
				font-size: 1.3em;
				height: 35px;			    
				min-width: 35px;
				width: 35px;
				border: 1px solid #fff !important;
			}
		}

		.v-divider {
			border: 2px solid #fff;
			margin: 0 -40px;
		}
	}

	.v-stepper__content {
		max-width: 1300px;
	
	}	
}


.dark-blue {
	background-color: rgb(118, 0, 255) !important;
}



@media only screen and (max-width: 959px) {


	.registration-first {
		> .container {
			padding: 16px;
			height: 100vh;
			overflow-y: scroll;
		}
		// top: 61%;
	}

	.frmcontainer {
	}

	.page-content {
		position: relative;
		top: 8%;
		padding: 20px;
		margin-bottom: 50px;
		// display: none;
	}

	.registration-success {
		position: relative;
		width: 100%;
		padding: 10px;
	}

	.registration-success .heading h1{
			text-align: center;
			font-size: 2rem;
	}


	.main-wrapper {
		flex-direction: column-reverse;		
	}

	.page-wrap {
		margin-top: 20px;
		margin-bottom: 20px;			
		.layout {		
			border-radius: 10px;	
		}
	}
	.page-wrap2 {
		.v-card {
			border-radius: 10px !important;		
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

</style>
