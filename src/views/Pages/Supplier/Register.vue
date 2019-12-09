<template>
<span>
	<!-- <div style="width: 100vw; height: 100vh"></div> -->
	
	<v-container 
	fluid full-height align-center justify-center 
	id="register-container" 
	style="overflow-y: auto; display: flex;">
	<v-layout 
	row wrap full-height align-center justify-center
	style="">
	  

			<v-stepper v-model="e1" non-linear class="register-stepper">
				<v-stepper-header>
					<v-stepper-step step="1"></v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="2"></v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="3"></v-stepper-step>
				</v-stepper-header>


				<v-stepper-items>
					
					<v-stepper-content step="1">
						<!-- content -->
						<!-- ///////////////////////////////////// -->
						<v-layout row wrap justify-center >

							<v-flex md4 xs12 class="page-wrap2">
								<v-layout row wrap justify-center>

								<!-- FOR 1ST STEP -->
								  <v-card class="pa-5">
									<v-layout row wrap align-center justify-center>
										<v-icon class="mr-3 black--text">fas fa-user-plus</v-icon>
										<div class="headline font-weight-medium text-xs-center">SIGN UP</div>
									</v-layout>
									<!-- <h4 color="grey--text" class="mt-2 text-xsc font-weight-light">Sign-up to find the lights that you are looking for.</h4> -->
									<v-layout row wrap mt-3>

										  	<v-flex xs12 pa-0>


											<v-text-field 
											outline
											color="black" 
											label="First Name" 
											v-model="form.firstname" 
											placeholder=" "
											prepend-inner-icon="fas fa-user"
											autocomplete="off" 
											:error-messages="fieldErrors('form.firstname')">
											</v-text-field>

											<v-text-field 
											outline
											color="black" 
											label="Last Name" 
											v-model="form.lastname"
											placeholder=" "
											prepend-inner-icon="fas fa-user"
											autocomplete="off" 
											:error-messages="fieldErrors('form.lastname')">
											</v-text-field>

											<v-text-field 
											outline
											color="black"  
											label="Email Address" 
											v-model="form.email" 
											placeholder=" "
											prepend-inner-icon="fas fa-at"
											autocomplete="disabled" 
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
											:error-messages="fieldErrors('form.confirmpassword')" >
											</v-text-field>

										  	</v-flex>

										  <v-flex xs12>
											<v-layout row wrap text-xs-center justify-center align-center>											
											  <!-- Login form submit -->
											  <v-flex xs6 class="white--text no-mrpd">
												<!-- <v-btn round color="black" type="submit" block @click="FirstStep()"> <span class="white--text font-weight-light ls-1" style="">SIGN UP</span></v-btn> -->
												<v-btn 
												style="background-color: #7600ff !important;"
												color="black" 
												block 
												@click="FirstStepDone()"><span class="dark-blue white--text font-weight-light ls-1">SIGN UP</span></v-btn>
											  </v-flex>
											</v-layout>
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

										<h1 class="white--text header-title">How to become a BAL supplier?</h1>
										<p class="white--text mt-4">We are committed to helping you increase your turnover significantly and become as competitive as possible. Sign up now and start receiving inquiries from buyers across the globe.</p>

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
						<!-- ///////////////////////////////////// -->
						<!-- content -->
					</v-stepper-content>





					<v-stepper-content step="2">
						<!-- content -->
						<!-- ///////////////////////////////////// -->
						<v-layout row wrap justify-center >
					  
							<v-flex md8 xs12 class="page-wrap2">
								<v-card>


									<v-card-text id="inquiryCreate_scrollable_cont">

										<v-container>
										  
										
										<v-layout row wrap>

												<v-flex md6 xs12 pa-2>
												  <v-text-field 
												  outline
												  color="black" 
												  label="First Name" 
												  v-model="form.firstname" 
												  :error-messages="fieldErrors('form.firstname')">
												  </v-text-field>
												</v-flex>

												<v-flex md6 xs12 pa-2>
												  <v-text-field 
												  outline
												  color="black" 
												  label="Last Name" 
												  v-model="form.lastname"
												  :error-messages="fieldErrors('form.lastname')">
												  </v-text-field>
												</v-flex>

												<v-flex md6 xs12 pa-2>
												  <v-text-field 
												  outline
												  color="black" 
												  label="Designation" 
												  v-model="form.designation" 
												  :error-messages="fieldErrors('form.designation')">
												  </v-text-field>
												</v-flex>

												<v-flex md6 xs12 pa-2>
												  <v-text-field 
												  outline
												  color="black" 
												  label="Company Name" 
												  v-model="form.companyname" 
												  :error-messages="fieldErrors('form.companyname')">
												  </v-text-field>
												</v-flex>

												<v-flex md6 xs12 pa-2>
												  <v-autocomplete 
												  outline
												  v-model="form.country" 
												  :items="countries" 
												  item-text="name" 
												  item-value="id" 
												  :error-messages="fieldErrors('form.country')" 												   
												  ref="categorySelect" flat hide-no-data hide-details 
												  label="Search Country ..">
												  </v-autocomplete>
												</v-flex>

												<v-flex md4 xs12 pa-2>
												   <v-text-field 
													outline
													color="black" 
													label="Zip Code" 
													v-model="form.zipcode"
													:error-messages="fieldErrors('form.zipcode')">
													</v-text-field>   
												</v-flex>

												<v-flex md6 xs12 pa-2>
												  <v-text-field 
												  outline
												  color="black" 
												  label="City" 
												  v-model="form.city" 
												  :error-messages="fieldErrors('form.city')">
												  </v-text-field>
												</v-flex>

												<v-flex md6 xs12 pa-2>
												  <v-text-field 
												  outline
												  color="black" 
												  label="Street" 
												  v-model="form.street" 
												  :error-messages="fieldErrors('form.street')">
												  </v-text-field>           
												</v-flex>


												<v-flex md4 xs12 pa-2>
													<v-text-field 
													outline
													  color="black" 
													  label="Phone Number" 
													  v-model="form.phonenumber" 
													  :error-messages="fieldErrors('form.phonenumber')">
													</v-text-field>   
												</v-flex>


												<v-flex md4 xs12 pa-2>
													<v-text-field 
													outline
													  color="black" 
													  label="Mobile Number" 
													  v-model="form.mobilenumber" 
													  :error-messages="fieldErrors('form.mobilenumber')">
													</v-text-field>  
												</v-flex>

												<v-flex md4 xs12 pa-2>
													<v-text-field 
													outline
													  color="black" 
													  label="WeChat Id" 
													  v-model="form.wechatid"
													  :error-messages="fieldErrors('form.wechatid')">
													</v-text-field>  
												</v-flex>

												<v-flex md6 xs12 pa-2>
													<v-text-field 
													outline
													  color="black" 
													  label="Company Website" 
													  v-model="form.companywebsite" 
													  :error-messages="fieldErrors('form.companywebsite')">
													</v-text-field>  
												</v-flex>

												<v-flex md6 xs12 pa-2>
													<v-text-field 
													outline
													  color="black" 
													  label="Factory Address" 
													  v-model="form.factoryaddress" 
													  :error-messages="fieldErrors('form.factoryaddress')">
													</v-text-field>  
												</v-flex>

										
										</v-layout>
										
										</v-container>
								   </v-card-text>
								   <v-card-actions>
									<!-- <v-btn color="success">Submit</v-btn> -->
									<v-btn class="dark-blue white--text ml-3 mb-3" @click="SecondStepDone()">
										Continue
									</v-btn>
									<v-spacer></v-spacer>
									<v-btn flat class="ml-3 mb-3" @click="e1=e1-1">
										back
									</v-btn>
								   </v-card-actions>
								</v-card>
							</v-flex>


							<v-flex md4 xs12 class="page-wrap">
								<v-layout column wrap full-height align-start justify-center pa-3>

										<h1 class="white--text header-title">How to become a BAL supplier?</h1>
										<p class="white--text mt-4">We are committed to helping you increase your turnover significantly and become as competitive as possible. Sign up now and start receiving inquiries from buyers across the globe.</p>

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
						<!-- ///////////////////////////////////// -->
						<!-- content -->

					</v-stepper-content>






					<v-stepper-content step="3">
						<!-- content -->
						<!-- ///////////////////////////////////// -->
						<v-layout row wrap justify-center >
					  
							<v-flex md8 xs12 class="page-wrap2">
								<v-card>

									<v-card-text id="inquiryCreate_scrollable_cont">
										<v-container>										
										<v-layout row wrap>



												<v-flex xs12 md4 pa-2>

													 <v-text-field 
														outline
														  color="black" 
														  label="Company established year:" 
														  v-model="form.companyestablishedyear" 
														  required 
														  :error-messages="fieldErrors('form.companyestablishedyear')" 
														  @blur="$v.form.companyestablishedyear.$touch()">
													  </v-text-field>

												</v-flex>

												<v-flex xs12 md4 pa-2>

													  <v-text-field 
														outline
														  color="black" 
														  label="Number of employees in total" 
														  v-model="form.numberofemployees" 
														  required 
														  :error-messages="fieldErrors('form.numberofemployees')" 
														  @blur="$v.form.numberofemployees.$touch()">
													  </v-text-field>

												</v-flex>  

												<v-flex xs12 md4 pa-2>

													  <v-text-field 
														outline
														  color="black" 
														  label="Number of workers in factory" 
														  v-model="form.numberofworkersinfactory" 
														  required 
														  :error-messages="fieldErrors('form.numberofworkersinfactory')" 
														  @blur="$v.form.numberofworkersinfactory.$touch()">
													  </v-text-field>

												</v-flex>


												<v-flex xs12 pa-2 mt-2 mb-4>
													<h2 class="font-weight-medium text--grey">PRODUCT QUESTIONS</h2>
													<h5 class="font-weight-light mb-2">What kind of LED lights do you offer?</h5>
													<v-layout row wrap>
														<v-autocomplete 
														outline
														v-model="categories" 
														:items="categoryItems" 
														item-text="name" 
														item-value="id" 
														ref="categorySelect" 
														cache-items chips multiple hide-no-data clearable hide-details 
														label="List your Products ">
														  <template v-slot:selection="slotData">
															<v-chip :selected="slotData.selected" close class="chip--select-multi" @input="removeFromCategories(slotData.item)">
															  {{ slotData.item.name }}
															</v-chip>
														  </template>
														</v-autocomplete>
													</v-layout>	
												</v-flex>


												<v-flex xs12 pa-2 pt-4>
													<h2 class="font-weight-medium text--grey">Bank Details:</h2>
												</v-flex>

												<v-flex xs12 md4 pa-2>

												  <v-text-field 
														outline
														  color="black" 
														  label="Account Name:" 
														  v-model="form.accountname" 
														  required 
														  :error-messages="fieldErrors('form.accountname')" 
														  @blur="$v.form.accountname.$touch()">
												   </v-text-field>

												</v-flex> 


												<v-flex xs12 md4 pa-2>
													  
													  <v-text-field 
														outline
														  color="black" 
														  label="Account Number:" 
														  v-model="form.accountnumber" 
														  required 
														  :error-messages="fieldErrors('form.accountnumber')" 
														  @blur="$v.form.accountnumber.$touch()">
													   </v-text-field>

												</v-flex>

												<v-flex xs12 md4 pa-2>
												  
												   <v-text-field 
														outline
														color="black" 
														label="IBAN:" 
														v-model="form.iban">
														  <!-- @blur="$v.form.iban.$touch()"> -->
														  <!-- :error-messages="fieldErrors('form.iban')"  -->
												   </v-text-field>

												</v-flex>


												<v-flex xs12 md4 pa-2>
												  
													<v-text-field 
														outline
														  color="black" 
														  label="Bank Name:" 
														  v-model="form.bankname" 
														  required 
														  :error-messages="fieldErrors('form.bankname')" 
														  @blur="$v.form.bankname.$touch()">
												   </v-text-field>

												</v-flex>

												<v-flex xs12 md4 pa-2>

												  <v-text-field 
														outline
														  color="black" 
														  label="Bank Address:" 
														  v-model="form.bankaddress" 
														  required 
														  :error-messages="fieldErrors('form.bankaddress')" 
														  @blur="$v.form.bankaddress.$touch()">
												   </v-text-field>

												</v-flex>

												<v-flex xs12 md4 pa-2>
												  
													<v-text-field 
														outline
														  color="black" 
														  label="Swift Code:" 
														  v-model="form.swiftcode" 
														  required 
														  :error-messages="fieldErrors('form.swiftcode')" 
														  @blur="$v.form.swiftcode.$touch()">
												   </v-text-field>

												</v-flex>


										</v-layout>										
										</v-container>
								   </v-card-text>
								   <v-card-actions>
									<!-- <v-btn color="success">Submit</v-btn> -->
									<v-btn 
									class="dark-blue white--text ml-3 mb-3" 								
									@click="ThirdStepDone()">
										Continue
									</v-btn>
									<v-spacer></v-spacer>
									<v-btn flat class="ml-3 mb-3" @click="e1=e1-1">
										back
									</v-btn>									
								   </v-card-actions>
								</v-card>
							</v-flex>


							<v-flex md4 xs12 class="page-wrap">
								<v-layout column wrap full-height align-start justify-center pa-3>

										<h1 class="white--text header-title">How to become a BAL supplier?</h1>
										<p class="white--text mt-4">We are committed to helping you increase your turnover significantly and become as competitive as possible. Sign up now and start receiving inquiries from buyers across the globe.</p>

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
						<!-- ///////////////////////////////////// -->
						<!-- content -->
					</v-stepper-content>




				</v-stepper-items>
			</v-stepper>

	</v-layout>
	</v-container>


	<v-dialog v-model="dialog" width="500">

		<v-card class="px-4 py-1">

			<v-card-text>
				<div class="agree">
					<h3 class="black--text mb-4"> In order that the form will be transmitted to us, you have to agree to the following terms:</h3>
					<p style="font-size:0.8em; line-height: normal;"> 
						<span class="mb-4"> 1.) We hereby verify that all information and attachments on this form are fully true and correct to the best of my knowledge.</span>
						<span class="mb-4"> 2.) We confirm to provide samples and supply orders from client with no minimum quantity required.</span>
						<span class="mb-4"> 3.) We confirm, that BuyAnyLight Inspector can visit our company/factory to check on all the information given in this form.</span>
						<span class="mb-4"> 4.) We confirm, that any losses/damages caused of false information given in this form, BuyAnyLight has the right to claim for full compensation.</span>
						<span class="mb-4"> 5.) We agree that all submitted information can be used internally by BuyAnyLight for product sourcing inquiries. Those requests will be sent by our system or one of our employees to the contact details provided in this form. Make sure those details are correct in order to not miss our inquiries! You can unsubscribe from our sourcing database anytime by sending an email to: <a href="mailto:info@buyanylight.com">info@buyanylight.com</a></span>
					</p>

					<p class="mb-1" style="font-size:0.8em; line-height: normal;"> 
						*By clicking the submit button you agree the above conditions.
					</p>
					<p class="" style="font-size:0.8em; line-height: normal;">
						*Every lighting manufacturer's registration is subject to approval from BAL
					</p>				
				</div>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>				
				<v-btn flat @click="dialog=false">
					cancel
				</v-btn>
				<v-btn 
				class="dark-blue white--text" 
				flat 
				:loading="formLoading"
				@click="acceptTerms()">I accept</v-btn>
			</v-card-actions>
		</v-card>

	</v-dialog>


	<v-dialog v-model="dialog2" width="500">

		<v-card class="px-4 py-1">

			<v-card-text>
				<div class="agree">
					<h2 class="black--text mb-4">VERIFICATION REQUIRED</h2>
					<p style="font-size:1em;"> 
						<span class="mb-4">Thank you so much for signing up with BuyAnyLight (BAL). You are almost there!</span>
						<span class="mb-4">Our management is evaluating your application. We will get back to you once we have reviewed all the details.</span>
						<span class="mb-4">Meanwhile, please verify your email ID by clicking on the link that was send to your registered e-mail ID.</span>
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


</span>
</template>

<script>
// import helpers from "@/mixins/helpers";
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'

import { load } from 'recaptcha-v3'

const dform = {
  // // 1st step 	
  // email: 'maderfahkaer@gmail.com',
  // password: '123456',
  // confirmpassword: '123456',
  // username: 'kabayan06',
  // // 2nd step
  // // can add multiple contacts if he/she wanted
  // firstname: 'Mader',
  // lastname: 'Fahkaer',
  // designation: 'lighther Designer Manager',
  // companyname: 'MF Lighting LCC',
  // country: 'United Arab Emirates',
  // city: 'Dubai',
  // street: '171 Tower 69',
  // zipcode: '6969',
  // phonenumber: '+12312',
  // mobilenumber: '123817',
  // designation: '589647869',
  // wechatid: '69696969',
  // companywebsite: 'almani.ae',
  // factoryaddress: '171 Tower 69',
  // // optional
  // managername: 'Zain Abdin',
  // manageremail: 'zain@almani.ae',
  // managerphone: '696969',
  // // 3rd
  // companyestablishedyear: '2017',
  // numberofemployees: '20',
  // numberofworkersinfactory: '100',
  // factoryphotoinside: [],
  // factoryphotooutside: [],

  // // category list : what kind of led lights do you offer ?
  // // 4RTH
  // accountname: 'accountname',
  // accountnumber: 'accountnumber',
  // iban: 'iban',
  // bankname: 'bankname',
  // bankaddress: 'bankaddress',
  // swiftcode: 'swiftcode',

///////////////////////////////////////////////////////////////////////////////////////////////////////

	// 1st step 	
	email: '',
	password: '',
	confirmpassword: '',
	username: '',
	// 2nd step
	// can add multiple contacts if he/she wanted
	firstname: '',
	lastname: '',
	designation: '',
	companyname: '',
	country: '',
	city: '',
	street: '',
	zipcode: '',
	phonenumber: '',
	mobilenumber: '',
	designation: '',
	wechatid: '',
	companywebsite: '',
	factoryaddress: '',
	// optional
	managername: '',
	manageremail: '',
	managerphone: '',
	// 3rd
	companyestablishedyear: '',
	numberofemployees: '',
	numberofworkersinfactory: '',
	factoryphotoinside: [],
	factoryphotooutside: [],
	// category list : what kind of led lights do you offer ?
	// 4RTH
	accountname: '',
	accountnumber: '',
	iban: '',
	bankname: '',
	bankaddress: '',
	swiftcode: '',



}

export default {

  mixins: [validationMixin],

  components: {

	vueDropzone: vue2Dropzone,

  },


  validations: {

	form: {

	  email: { 
		required, 
		email, 
		isUnique(value){
			// standalone validator ideally should not assume a field is required
			if (value === '') 
			return true;

			// no then and catch because validator need the Promise instance
			return this.$store.dispatch('auth/isEmailExist_a',{email:value});
		}, 
	  },
	  username: { required },
	  password: { required, minLength: minLength(6) },
	  confirmpassword: {

		required,
		sameAsPassword: sameAs('password')
	  },

	  firstname: { required },
	  lastname: { required },
	  designation: { required },
	  companyname: { required },
	  country: { required },
	  street: { required },
	  city: { required },
	  zipcode: { required },
	  phonenumber: { required },
	  mobilenumber: { required },
	  wechatid: { required },
	  companywebsite: { required },
	  factoryaddress: { required },

	  companyestablishedyear: { required },
	  numberofemployees: { required },
	  numberofworkersinfactory: { required },

	  accountname: { required },
	  accountnumber: { required },
	  // iban: { required },
	  bankname: { required },
	  bankaddress: { required },
	  swiftcode: { required },

	},

  },

  validationMessages: {

	form: {

	  username: { required: 'Please enter an Username ' },
	  email: { required: 'Please enter email', email: 'Email must be valid', isUnique: 'Email is already registered.'  },
	  password: { required: 'Please enter password', minLength: 'Password must be of 6 characters' },
	  confirmpassword: { required: 'Please confirm your Password.', sameAsPassword: 'Password does not match' },
	  firstname: { required: 'Please enter your firstname.' },
	  lastname: { required: 'Please enter your lastname.' },
	  designation: { required: 'Please enter your designation. ' },
	  companyname: { required: 'Please enter your Company name.' },
	  country: { required: 'Please enter your Country.' },
	  city: { required: 'Please enter your city.' },
	  street: { required: 'Please enter your Street.'},
	  zipcode: { required: 'Please enter your zipcode.' },
	  phonenumber: { required: 'Please enter your Phone Number.' },
	  mobilenumber: { required: 'Please enter your Moble Number.' },
	  wechatid: { required: 'Please enter your WeChat ID' },
	  companyestablishedyear: { required: 'Please enter Company Established year.'},
	  numberofemployees: { required: 'Please enter the number of employees.'},
	  numberofworkersinfactory: { required: 'Please enter the number of workers in factory.'},
	  companywebsite: { required: 'Please enter your Company Website.' },
	  factoryaddress: { required: 'Please enter your Factory Address.' },
	 
	  accountname: { required: 'Please enter your Account Name'},
	  accountnumber: { required: 'Please enter your Account Number'},
	  // iban: { required: 'Please enter your IBAN'},
	  bankname: { required: 'Please enter your Bank Name'},
	  bankaddress: { required: 'Please enter your Bank Address'},
	  swiftcode: { required: 'Please enter your Swift Code' },

	}

  },



	data() { return {

		type: 'supplier',
		// backgroundImg: '/static/background/supplier-dashboard.jpg',
		backgroundImg: '/static/background/bg1-blur-compressed.jpg',
		form: Object.assign({}, dform),
		e1: 1,

		// hide hide show show
		isStepOne : true,
		isSteptwo : false,
		isComplete: false,

		formLoading: false, 

		// Dropzone
		// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd

		useCustomSlot: true,
		dropzoneOptions: {
			url: config.main.awss3.urls.inquiry,
			thumbnailWidth: 200,
			maxFilesize: 50,
			headers: {},
			addRemoveLinks: true,            
			dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
		},

		//  checkboxes
		isAgreeAllAboveInformation:false,

		// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd
		// Dropzone

		categories: [],
		categoryItems: [],

		dialog: false,
		dialog2: false,

	}},



  methods: {

	// Validate FORMS

	FirstStepDone() {

		console.log('firststep()');

		this.$v.form.firstname.$touch();
		this.$v.form.lastname.$touch();  	
		this.$v.form.email.$touch();
		this.$v.form.password.$touch();
		this.$v.form.confirmpassword.$touch();

		if (
			!this.$v.form.firstname.$invalid && 
			!this.$v.form.lastname.$invalid && 
			!this.$v.form.email.$invalid && 
			!this.$v.form.password.$invalid && 
			!this.$v.form.confirmpassword.$invalid) {


			// hide the step one 
			this.e1 = 2;
		}

	},


	SecondStepDone() {

		// var fields[] = 

		this.$v.form.firstname.$touch();
		this.$v.form.lastname.$touch();
		this.$v.form.designation.$touch();
		this.$v.form.companywebsite.$touch();
		this.$v.form.country.$touch();
		this.$v.form.city.$touch();
		this.$v.form.street.$touch();
		this.$v.form.zipcode.$touch();
		this.$v.form.phonenumber.$touch();
		this.$v.form.mobilenumber.$touch();
		this.$v.form.wechatid.$touch();
		this.$v.form.companywebsite.$touch();
		this.$v.form.factoryaddress.$touch();

		if(!this.$v.form.firstname.$invalid 
			&& !this.$v.form.lastname.$invalid 
			&& !this.$v.form.designation.$invalid 
			&& !this.$v.form.companywebsite.$invalid 
			&& !this.$v.form.country.$invalid 
			&& !this.$v.form.city.$invalid
			&& !this.$v.form.street.$invalid 
			&& !this.$v.form.zipcode.$invalid 
			&& !this.$v.form.phonenumber.$invalid 
			&& !this.$v.form.mobilenumber.$invalid 
			&& !this.$v.form.wechatid.$invalid
			&& !this.$v.form.companywebsite.$invalid
			&& !this.$v.form.factoryaddress.$invalid) {

			//  swithching
			this.e1 = 3

		}


	},

	ThirdStepDone() {

		this.$v.form.companyestablishedyear.$touch();
		this.$v.form.numberofemployees.$touch();
		this.$v.form.numberofworkersinfactory.$touch();
		this.$v.form.accountname.$touch();
		this.$v.form.accountnumber.$touch();
		// this.$v.form.iban.$touch();
		this.$v.form.bankname.$touch();
		this.$v.form.bankaddress.$touch();
		this.$v.form.swiftcode.$touch();

		if(!this.$v.form.companyestablishedyear.$invalid 
			&& !this.$v.form.numberofemployees.$invalid 
			&& !this.$v.form.numberofworkersinfactory.$invalid
			&& !this.$v.form.accountname.$invalid 
			&& !this.$v.form.accountnumber.$invalid 
			&& !this.$v.form.bankname.$invalid 
			&& !this.$v.form.bankaddress.$invalid 
			&& !this.$v.form.swiftcode.$invalid) {

			this.dialog = true;
		} 



	},

	acceptTerms() {


		load(config.main.google_recaptcha_key)
		.then((recaptcha) => {

			recaptcha.execute('registration').then((token) => {
			console.log(token) // Will print the token
			// this.googleToken = token;

				let data = {
					'first_name': this.form.firstname,
					'last_name': this.form.lastname,
					'email': this.form.email,
					'password': this.form.password,
					'confirm_password': this.form.confirmpassword,
					'website': this.form.companywebsite,
					'street': this.form.street,
					'city': this.form.city,
					'country_id': this.form.country,

					'phone': this.form.phonenumber,
					'mobile': this.form.mobilenumber,
					'wechatid': this.form.wechatid,

					'company_name': this.form.companyname,
					'job_title': this.form.designation,

					'factory_address': this.form.factoryaddress,
					'company_established_year': this.form.companyestablishedyear,
					'no_of_employees_factory': this.form.numberofworkersinfactory,
					'no_of_employees_total': this.form.numberofemployees,

					'bank_account_name': this.form.accountname,
					'bank_account_no': this.form.accountnumber,
					'bank_iban': this.form.iban,
					'bank_name': this.form.bankname,
					'bank_address': this.form.bankaddress,
					'bank_swift': this.form.swiftcode,
					'categories': this.categories,
					
					main_interest: (this.main_interest)?this.main_interest:'',
					google_token: token,
				};

				// console.log(data);

				this.formLoading = true;

				this.$store.dispatch("auth/supplierRegistration_a", {
				  data: data
				})
				.then(response => {
				  	this.dialog = false;
				  	this.dialog2 = true;
				})
				.catch(e => {
				  	console.log(e);
				  	this.formLoading = false;
				})
				.finally(() => {
				  	this.formLoading = false;
				});


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




	},

	gotoHomePage(){
		window.location.href = 'https://buyanylight.com'
	},

	// Validate FORMS


		// Dropzone
	// dddddddddddddddddddddddddddddddddddddddddddddddddddd
	// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
	getAWSS3(upload_group){

		var awss3 =  {
			signingURL: config.main.awss3.signingURL,
			headers: {
				token:localStorage.access_token,
			},
			params : {
				action: upload_group,
			},
			sendFileToServer : true,
			withCredentials: false
		};

		return awss3;
	},

	vdz_success(file, upload_group){

		console.log("vdz_success file = ",file);
		console.log("vdz_success upload_group = ",upload_group);

		if(file.status=='success') {

			var attachment = {
				location: file.s3ObjectLocation,
				filename: file.name,
				filetype: file.type,
				filegroup: upload_group,
				filesize: _.round((file.size/1000), 2),
			};

			// console.log('attachment',attachment);
			this.formData.attachments.push(attachment);
			// for the preview when uploaded
			this.inquiry_images.push(attachment);

		}

	},
	// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
	// dddddddddddddddddddddddddddddddddddddddddddddddddddd
	// Dropzone


  },

  computed: {

	countries() {
	  return config.countries;
	},
	main_interest(){
		return this.$route.params.main_interest;
	},
  }, 

  created: function() {


 // get categories for category select box
	this.$store.dispatch('cat/getCategories_a')
	  .then((data) => {
		this.categoryItems = data;
	  })
	  .catch((e) => {
		console.log(e);
	  });

  },



}

</script>
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



/deep/ .theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
	background-color: #fff !important;
	color: #000;
	font-weight: bold;
}

/deep/ .register-stepper.v-stepper  {

	background-color: transparent;
	box-shadow: none;
	box-shadow: none;

	.v-stepper__header {
		height: 50px;
		// background-color: #fff;
		background-color: transparent;
		box-shadow: none;
		width: 300px;
		margin: auto;		
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


	.register-stepper.v-stepper /deep/  {
		.v-stepper__content {
			padding-left: 5px;
			padding-right: 0px;			
		}
	}
}


</style>
