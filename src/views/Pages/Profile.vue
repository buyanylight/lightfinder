<template>
	<div>
		  
		<v-container my-4>

			<v-layout row wrap>
				
				<v-flex xs5>
					<v-layout row wrap>

						<v-flex xs12 mb-4>
							<v-layout column align-center justify-center>
								<v-avatar
								size="356"
								color="grey lighten-4">
									<img :src="avatarImg" alt="avatar">
								</v-avatar>
							</v-layout>
						</v-flex>

						

					</v-layout>
				</v-flex>

				<v-flex xs7>
					<v-form @submit.prevent="$v.form.$invalid ? null : submitForm()" ref="form">
					<v-layout row wrap>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.first_name" 
							:error-messages="fieldErrors('form.first_name')" 
							@blur="$v.form.first_name.$touch()" 
							label="First Name" 
							required></v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.last_name" 
							:error-messages="fieldErrors('form.last_name')" 
							@blur="$v.form.last_name.$touch()" 
							label="Last Name" 
							required></v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.job_title" 
							:error-messages="fieldErrors('form.job_title')" 
							@blur="$v.form.job_title.$touch()" 
							label="Job Title" 
							required>
							</v-text-field>
						</v-flex>						
						<v-flex xs10 offset-xs1>
							<!-- readonly disabled -->
							<v-text-field 
							color="black" 
							v-model="form.email" 
							:error-messages="fieldErrors('form.email')" 
							@blur="$v.form.email.$touch()" 
							label="Email Address" 
							required></v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.phone" 
							:error-messages="fieldErrors('form.phone')" 
							@blur="$v.form.phone.$touch()" 
							label="Phone" 
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.fax" 
							label="Fax"
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.address" 
							:error-messages="fieldErrors('form.address')" 
							@blur="$v.form.address.$touch()" 
							label="Address" 
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.postal" 
							:error-messages="fieldErrors('form.postal')" 
							@blur="$v.form.postal.$touch()" 
							label="Postal" 
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<!-- v-model="testSelect" -->
							<v-select 
							v-model="form.country_id"
							:items="countries"
							item-text="name" 
							item-value="id" 
							:search-input.sync="search" 
							:error-messages="fieldErrors('form.country_id')" 
							@blur="$v.form.country_id.$touch()" 
							color="black" 
							label="Country" 
							data-vv-name="Country" required>
							</v-select>
						</v-flex>


						<v-flex xs10 offset-xs1 mt-2>
							<v-layout justify-space-between align-center> 
								<h3 style="text-decoration: underline;">Update Profile Picture</h3>
								<v-btn 
								style=""
								color="grey darken-4" 
								fab dark
								@click="showUploadProfileImage = !showUploadProfileImage" 
								alt="Update Profile Picture"
								:loading="formloading">
									<v-icon>fas fa-edit</v-icon>
								</v-btn>
							</v-layout>
						</v-flex>

						<v-flex xs10 offset-xs1 mb-4 mt-3>
							<template v-if="showUploadProfileImage">
							<!-- <v-layout row wrap class="mb-4">
							</v-layout> -->
								<!-- OEM DROPZONE  -->
								<vue-dropzone 
								id="dropzone_profileimage" 
								ref="dropzone_profileimage" 
								:options="dropzoneOptions" 
								:useCustomSlot="useCustomSlot"
								:awss3="getAWSS3('add-inquiry-oems')"
								@vdropzone-removed-file="vdz_removedFile"
								@vdropzone-success="vdz_success($event,'add-inquiry-oems')">
									<div class="dropzone-custom-content">
										<h3 class="dropzone-custom-title">Drag and drop to change your profile image</h3>
										<div class="subtitle">..or click to select a file from your computer</div>
									</div>
								</vue-dropzone>
								<!-- OEM DROPZONE  -->							

							<!-- v-if="showSaveProfileImage" -->
							<!-- <v-btn 
							class="mt-2 ml-0"
							color="success"
							dark  
							title="Save Image!"
							@click="saveProfileImage()"
							:loading="formloading">
								<v-icon class="mr-3">far fa-save</v-icon> Save New Profile Image
							</v-btn> -->

							</template>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-layout align-center justify-end>
								<v-btn 
								color="grey darken-4" 
								dark 
								@click="$v.form.$invalid ? $v.form.$touch() : submitForm()" 
								:loading="formloading">
									Submit
								</v-btn>
							</v-layout>
						</v-flex>				
					</v-layout>
					</v-form>


					<!-- <v-form v-model="form.valid" @submit.prevent="" lazy-validation> -->
					<v-form @submit.prevent="$v.passwords.$invalid ? null : submitChangePassword()" ref="form">
					<v-layout row wrap style="margin-top:50px;">
						<v-flex xs10 offset-xs1>
							<v-text-field 
							v-model="passwords.oldPassword"
							:append-icon="showPassword.oldPassword ? 'visibility' : 'visibility_off'"
							:type="showPassword.oldPassword ? 'text' : 'password'"
							:error-messages="fieldErrors('passwords.oldPassword')" 							
							@click:append="showPassword.oldPassword = !showPassword.oldPassword"							
							color="black"
							label="Old Password">
							</v-text-field>									
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							v-model="passwords.newPassword"
							:append-icon="showPassword.newPassword ? 'visibility' : 'visibility_off'"
							:type="showPassword.newPassword ? 'text' : 'password'"
							:error-messages="fieldErrors('passwords.newPassword')" 							
							@click:append="showPassword.newPassword = !showPassword.newPassword"
							color="black"
							label="New Password">
							</v-text-field>									
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							v-model="passwords.newPasswordConfirm"
							:append-icon="showPassword.newPasswordConfirm ? 'visibility' : 'visibility_off'"
							:type="showPassword.newPasswordConfirm ? 'text' : 'password'"
							:error-messages="fieldErrors('passwords.newPasswordConfirm')" 							
							@click:append="showPassword.newPasswordConfirm = !showPassword.newPasswordConfirm"
							color="black"
							label="Confirm New Password">
							</v-text-field>									
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-layout align-center justify-end>
								<v-btn 
								color="grey darken-4" 
								dark 
								@click="$v.passwords.$invalid ? $v.passwords.$touch() : submitChangePassword()"
								:loading="formloading">
									Change Password
								</v-btn>
							</v-layout>
						</v-flex>
						<v-flex xs6>
							<!-- <v-btn v-text="clear" @click="(clear(), $validator.reset())" type="reset" /> -->
						</v-flex>
					</v-layout>
					</v-form>


				</v-flex>


			</v-layout>
		</v-container>

		<profile-update-dialog :openDialog.sync="openDialog" :message="message"></profile-update-dialog>


	</div>
</template>
<script>
import AdminBuyerBus from "@/bus/admin-buyer";
// import helpers from "@/mixins/helpers";
import { required, email, minValue, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

import config from '@/config/index'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'


import ProfileUpdateDialog from '@/views/Components/App/ProfileUpdateDialog'


const dform = {

	email: '',
	first_name: '',
	last_name: '',
	job_title: '',
	phone: '',
	fax: '',
	address: '',
	postal: '',
	country_id: '',

}

export default {

	mixins: [
		validationMixin,
		// helpers,
	],

	
	components: {
		vueDropzone: vue2Dropzone,		
		ProfileUpdateDialog,
	},


	validations: {

		form: {
			email:       { 
				required, 
				email,
				isUnique(value,components){
					// standalone validator ideally should not assume a field is required
					if (value === '') 
					return true;

					console.log(value+' ?= '+this.authUser.email);				

					if(this.authUser.email==value)
					return true;
					else
					// no then and catch because validator need the Promise instance
					return this.$store.dispatch('auth/isEmailExist_a',{email:value});
				},
			},
			first_name:  { required },
			last_name:   { required },
			job_title:   { required },
			phone:       { required },
			// fax:         { required },
			address:     { required },
			postal:      { required },
			country_id:  { required },
		}, 

		passwords: {
			oldPassword: {
				required,
				minLen: minLength(6),
			},
			newPassword: {
				required,
				minLen: minLength(6),
			},
			newPasswordConfirm: {
				required,
				sameAs: sameAs(function(){					
					return this.passwords.newPassword;
				}),
			},
		},

	},


	validationMessages: {

		form: {
			email:      { required: 'Email is Required. ', email: 'Email is Invalid.', isUnique: 'Email already exist..' },
			first_name: { required: 'First Name is Required.' },
			last_name:  { required: 'Last Name is Required.' },
			job_title:  { required: 'Job Title is Required.' },
			phone:      { required: 'Phone is Required.' },
			// fax:        { required: 'fax is Required.' },
			address:    { required: 'Address is Required.' },
			postal:    { required: 'Postal is Required.' },
			country:    { required: 'Country is Required.' },
		},

		passwords: {
			oldPassword: {
				required: 'Old Password is required.',
				minLen: 'Minimum of 6 characters.',
			},
			newPassword: {
				required: 'New Password is required.',
				minLen: 'Minimum of 6 characters.',
			},
			newPasswordConfirm: {
				required: 'Confirm Password is required.',
				sameAs: 'Passwords are not the same.',
			},
		},

	},

	data: () => ({

		form: {

			email:       '',
			avatar:       '',
			first_name:  '',
			last_name:   '',
			job_title:   '',
			phone:       '',
			fax:         '',
			address:     '',
			postal:     '',
			country_id:  '',

		},

		passwords: {
			oldPassword: 		  null,
			newPassword: 		  null,
			newPasswordConfirm:   null,
		},

		showPassword:{
			oldPassword: false,
			newPassword: false,
			newPasswordConfirm: false,
		},

		countries: [],
		search: '',
		formloading: false,

		avatarImg:"",

		openDialog: false,
		message: null,

		testCountry: 225,

		// Dropzone
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd
		attachment: null,
		showUploadProfileImage: false,
		showSaveProfileImage: false,
		useCustomSlot: true,
		dropzoneOptions: {
			url: config.main.awss3.urls.inquiry,
			thumbnailWidth: 250,
			maxFilesize: 50,
			maxFiles: 1,
			autoProcessQueue: true,
			maxfilesexceeded: function(file) {
				this.removeAllFiles();
				this.addFile(file);
			},
			headers: {},
			addRemoveLinks: true,            
			dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
		},
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd
		// Dropzone

	}),


	watch: {

	},


	props: ['dialog', 'buyerData', 'is_new', 'buyer_id'],

	computed: {

		authUser () {        
			return this.$store.state.auth.auth_user;
		},

		// avatarImg: {
		//   	get(){
		// 	  	if(!this.form.avatar)
		// 	  	// default image to be download later - https://image.flaticon.com/icons/svg/149/149071.svg
		// 	  	return 'https://image.flaticon.com/icons/svg/149/149071.svg'
		// 	  	else
		// 		return this.form.avatar;
		//   	},
		//   	set(nVal){
		//   		this.form.avatar = nVal;
		//   	},
		// },

		

	},

	created: function() {

		/*
			get countries
		*/



		this.getCountries()
		.then((response) => {
			this.countries = response;
			this.$nextTick(()=>{
				this.fillForm();
			});
		})
		.catch((e) => {
			console.log(e);
		});

		// setTimeout(()=>{
		// 	this.fillForm();			
		// 	this.form.sel_country_id = {id:this.authUser.country_id};
		// },2000);

	},



	methods: {



		fillForm() {
			this.form.email =       	(this.authUser.email=='null')?'':this.authUser.email;
			this.form.first_name =  	(this.authUser.firstname=='null')?'':this.authUser.firstname;
			this.form.last_name =   	(this.authUser.lastname=='null')?'':this.authUser.lastname;
			this.form.job_title =   	(this.authUser.job_title=='null')?'':this.authUser.job_title;
			this.form.phone =       	(this.authUser.phone=='null')?'':this.authUser.phone;
			this.form.fax =         	(this.authUser.fax=='null')?'':this.authUser.fax;
			this.form.address =     	(this.authUser.address=='null')?'':this.authUser.address;
			this.form.postal =     		(this.authUser.postal=='null')?'':this.authUser.postal;
			this.form.country_id =  	parseInt(this.authUser.country_id);
			// this.form.sel_country_id =  {id:this.authUser.country_id};
			console.log("fillForm",this.form);
			// console.log("this.countries",this.countries);

			// reset profile upload_group
			this.showUploadProfileImage = false;
			this.showSaveProfileImage = false;
			this.attachment = null;

			var avatarPlaceholder = config.main.websiteURL+'/static/gender-neutral.png';

			this.avatarImg = (this.authUser.avatar)?this.authUser.avatar:avatarPlaceholder;
		},

		resetForm() {
			this.form = Object.assign({}, dform)
			this.$refs.form.reset()
			this.$v.$reset()
		},

		submitForm() {

			this.formloading = true;

			let data = {
				"avatar": this.avatarImg,
				"email": this.form.email,
				"first_name": this.form.first_name,
				"last_name": this.form.last_name,
				"job_title": this.form.job_title,
				"phone": this.form.phone,
				"fax": this.form.fax,
				"address": this.form.address,
				"postal": this.form.postal,
				"country_id": this.form.country_id,
			};

			this.authUser.avatar = 		this.avatarImg;
			this.authUser.email = 		this.form.email;
			this.authUser.firstname = 	this.form.first_name;
			this.authUser.lastname = 	this.form.last_name;
			this.authUser.job_title = 	this.form.job_title;
			this.authUser.phone = 		this.form.phone;
			this.authUser.fax = 		this.form.fax;
			this.authUser.address = 	this.form.address;
			this.authUser.postal = 		this.form.postal;
			this.authUser.country_id = 	this.form.country_id;

			console.log('data',data);
			this.formloading = false

			this.$store.dispatch(this.getStore()+'/updateProfile_a', {
				data: data,
			})
			.then((response) => {
				this.formloading = false
				// create a event bus 
				this.$emit('update:dialog', false);
				AdminBuyerBus.emitFormSubmitted()
				// this.fillForm();
				this.openDialog = true;

			})
			.catch((e) => {
				console.log(e);
				this.formloading = false
			})
			.finally(() => {
				this.formloading = false
			})

		},


		closeDialog() {
			this.$emit('update:dialog', false);
			this.$emit('update:is_new', false);
			this.$emit('update:buyer_id', null);
			this.resetForm();
		},


		submitChangePassword(){
			// alert("Submit Change Passsword!!");

			this.formloading = true;

			let data = {
				"old_password": this.passwords.oldPassword,
				"new_password": this.passwords.newPassword,
			};

			this.formloading = false

			this.$store.dispatch(this.getStore()+'/updatePassword_a', {
				data: data,
			})
			.then((response) => {
				console.log(response);
				if(!response.updated)
				this.message = "Password Incorrect! Please try again..";
				else
				this.message = null;
				
				this.openDialog = true;
				this.formloading = false;
			})
			.catch((e) => {
				console.log(e);
				this.formloading = false
			})
			.finally(() => {
				this.formloading = false
			})

		},



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

		vdz_removedFile: function(file, error, xhr){
			console.log("file",file);

			// clear attachment
			this.showSaveProfileImage = false;
			this.attachment=null;
		},

		vdz_s3UploadSuccess: function(s3ObjectLocation){
			// console.log("vdz_s3UploadSuccess",s3ObjectLocation);
		},

		vdz_success(file, upload_group){
			// console.log("vdz_success file = ",file);
			// console.log("vdz_success upload_group = ",upload_group);

			if(file.status=='success') {

				this.attachment = {
					location: file.s3ObjectLocation,
					filename: file.name,
					filetype: file.type,
					filegroup: upload_group,
					filesize: _.round((file.size/1000), 2),
				};

				this.showSaveProfileImage = true;

				console.log('UPLOADED!');
				console.log('this.attachment',this.attachment);

				this.avatarImg = file.s3ObjectLocation;
			}

			// if(upload_group=='attachments')    
			// action = "add-inquiry-attachments";
			// else if(upload_group=='images')
			// action = "add-inquiry-images";
			// else
			// action = "add-inquiry-attachments";



			// this.formData.attachments.push({

			// });

		},

		saveProfileImage(){
			this.$refs.dropzone_profileimage.processQueue();
			
			// console.log('saveProfileImage()');
			// console.log('getQueuedFiles',this.$refs.dropzone_profileimage.getQueuedFiles());

		},
		// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd
		// Dropzone

	},
}

</script>



<style scoped lang="scss">

.v-avatar {
	overflow: hidden;
	background-color: #fff !important;
	img  {

	    height: auto;
	    width: 100%;
	    border-radius: 0;
	}
}
	
</style>
