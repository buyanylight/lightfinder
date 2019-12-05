<template>
  <v-layout column wrap class="pos-relative">
    <v-flex xs12 center-align>
      <v-layout wrap>
        <v-flex xs12 class="text-xs-center">
          <img src="/static/open-lock.svg" alt="" height="145px">
          <div class="headline">Set New Password</div>
        </v-flex>
      </v-layout>
      <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="sendpasscode">
        <v-container grid-list-xl fluid>
          <v-layout wrap pa-4>
            <v-flex xs12 pa-0>

              	<v-text-field
                class="box-input"
                placeholder="New Password"
                type="password"
                v-model="passwords.newPassword"
                @blur="$v.passwords.newPassword.$touch()"
                :error-messages="fieldErrors('passwords.newPassword')"
                required></v-text-field>


              	<v-text-field
                class="box-input"
                placeholder="Confirm New Password"
                type="password"
                v-model="passwords.newPasswordConfirm"
                @blur="$v.passwords.newPasswordConfirm.$touch()"                
                :error-messages="fieldErrors('passwords.newPasswordConfirm')"
                required></v-text-field>


            </v-flex>

            <v-flex xs12 px-2>
              <v-layout row wrap text-xs-center>
                <!-- Login form submit -->
                <v-flex xs12 class="no-mrpd" v-if="errorText">
	            	<p style="color: red;">
	            		Something went wrong please try again!
	            	</p>
                </v-flex>
                <v-flex xs12 class="no-mrpd">
                  <v-btn
                    color="act"
                    type="submit"
                    :loading="loader"
                    :disabled="$v.$invalid"
                    block
                    flat class="black white--text mt-4"
                    :class="$v.$invalid ? '' : 'white--text'"
                  >Set New Password</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import validationLangMixin from '@/mixins/validationLangMixin'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
// import Password from '@/views/Components/PasswordStrength.vue'

export default {

	components: {
	    // Password
	},
	mixins: [
		validationLangMixin
	],

	props: [
		'email',
		'code',
	],


	validations: {
		passwords: {			
		    newPassword: {
		        required,
				minLen: minLength(6),
		    },
		    newPasswordConfirm: {
		        sameAs: sameAs(function() {
		            return this.passwords.newPassword;
		        }),
		    },
		}
	},

	validationMessages: {
		passwords:{
		    newPassword: {
		        required: 'Password required.',
		        minLen: "Minimum of 6 characters.",
		    },
		    newPasswordConfirm: {
		        sameAs: 'Password confirmation invalid.',
			},
	    }
	},

	created () {

	},

	data () {
	    return {
	        errors: null, 
	        passwords:{
		        newPassword: '', 
		        newPasswordConfirm: '', 
	        },
	        loader: false,
	        errorText: false,
	    }
	},

	methods: {
	    
	    submit () {
	        this.loader=true;


	        // setTimeout(()=> {
	        //     this.loader=false; 
	        //     this.$emit('next', { next: true, });
	        // }, 2000);

			this.$store.dispatch('auth/resetPassword_a',{
				email: this.email,
				reset_code: this.code,			    
			    password: this.passwords.newPassword,
			    confirm_password: this.passwords.newPasswordConfirm,
			})
			.then((rspns)=>{			
	    		this.loader = false			
    		  	this.errorText = false;
	            this.$emit('next', { next: true, });
			})
			.catch((e)=>{
			  	this.loader = false;
			  	this.errorText = true;
				console.log('Error: ' + e);
			});


{

}

	    },

	    resetForm () {
	        // this.form = Object.assign({}, defaultForm)
	        // this.$refs.sendpasscode.reset()
	        // this.$v.$reset()
	    }
	},

	watch: {

	},

}
</script>

<style scoped lang="scss">
.theme--light.v-btn.v-btn--disabled {
	color: rgba(255, 255, 255, 0.31) !important;
}

.theme--light.v-btn.v-btn--disabled /deep/ .v-btn__loading {
    color: rgba(255, 255, 255, 1) !important;
}
</style>
