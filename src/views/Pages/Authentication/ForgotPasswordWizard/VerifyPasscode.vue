<template>
  <v-layout column wrap class="pos-relative">
	<v-flex xs12 center-align>
	  <v-layout wrap>
		<v-flex xs12 class="text-xs-center">
		  <img src="/static/Shield.svg" alt="" height="145px">
		  <div class="headline">Enter 8-digit Code</div>
		  <p class="centered headline-caption-text mt-3 px-4">
		  	We've sent a 8-digit code to your email address. <br>Input code below.
		  </p>
		</v-flex>
	  </v-layout>
	  <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="verifypasscode">
		<v-container grid-list-xl fluid>
			<v-layout wrap pa-4>
					
				<v-flex xs12 px-1 py-0 class="text-xs-center">
				  <masked-input mask="1111-1111" placeholder="0000-0000"
					@input="code = arguments[1]"
					class="code-mask-box text-xs-center"
					:error-messages="fieldErrors('code')"
					@blur="$v.code.$touch()"/>
				</v-flex>



				<v-flex xs12 px-3 mt-3>
					<v-layout row wrap text-xs-center>
						<!-- Login form submit -->
						<v-flex xs12 class="no-mrpd" v-if="!codeValid">
			            	<p style="color: red;">
			            		Invalid code please try again!
			            	</p>
						</v-flex>
						<v-flex xs12 class="no-mrpd">
							<v-btn
							color="act"
							type="submit"
							:loading="loader"
							:disabled="($v.$invalid || loader)"
							block
							flat class="black white--text  mt-4"
							:class="$v.$invalid ? '' : 'white--text'">Reset Password</v-btn>
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
  import { required } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'
  import MaskedInput from 'vue-masked-input'

  export default {
	mixins: [validationMixin],
	
	components: {
	  MaskedInput
	},

	validations: {
	  code: { required }
	},

	validationMessages: {
	  	code: {
			required: 'Please enter code',
			code: 'Email must be valid'
	  	}
	},

	props: {
		email: {
            type: String,
        },
	},
	
	data () {
	  return {
		errors: null,
		code: null,
		loader: false,
		codeValid: true,
	  }
	},


	created () {
	},

	methods: {
	  submit () {
		this.loader = true



		// setTimeout(() => {
		//   this.loader = false
		//   this.$emit('next', { code: this.code })
		// }, 2000)

		this.$store.dispatch('auth/verifyPasscode_a',{
			email: this.email,
			reset_code: this.code,
		})
		.then((rspns)=>{			
    		this.loader = false
			this.codeValid = rspns.data.valid; 	

			if(this.codeValid)
			this.$emit('next', { code: this.code })
		})
		.catch((e)=>{
		  	this.loader = false;
		  	this.errorSending = true;
			console.log('Error: ' + e);
		});



	  },
	  resetForm () {
		// this.form = Object.assign({}, defaultForm)
		// this.$refs.sendpasscode.reset()
		// this.$v.$reset()
	  }
	}
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
