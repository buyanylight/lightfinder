<template>
<v-dialog persistent
:value="dialogLocal" 
@input="closeDialog()" 
max-width="600px"
lazy>

    <v-card>
    	<v-card-title class="headline">
            <img 
            style="width: 88px;"
            src="/static/logos/logo-black.png" 
            title="BuyAnyLight.com">
    		<h2 class="ml-4">Bank Transfer Details</h2>

    		<v-btn dark flat icon
    		style="position: absolute; top: 0; right: 0; margin: 10px 10px;"
    		class="black--text"
    		@click="closeDialog()">
				<v-icon>close</v-icon>
			</v-btn>    
    	</v-card-title>
    	
    	<v-card-text>

    		<v-container pa-0>
					<!-- 
					Beneficiary:Standard Electronic Co., Limited
					A/C No.:168-734069-838
					Beneficiary's Bank:HSBC Hong Kong
					Swift: HSBCHKHHHKH
					Bank Address:HSBC Centre, 1 Sham Mong Road, Kowloon, Hong Kong
					-->
    			<v-layout row wrap>						
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Beneficiary</h4>
							<h3>Ms Dotcom Ventures FZE</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Beneficiary's Bank</h4>
							<h3>Emirates NBD</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Swift</h4>
							<h3>EBILAEADJAZ</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Bank Address</h4>
							<h3>Jebal Ali Branch, Dubai, United Arab Emirates</h3>
						</v-flex>

						<v-flex xs12 py-4>
							<v-divider></v-divider>
						</v-flex>

						<v-flex xs12 sm6 pa-2>
							<h2>USD Account</h2>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Account No.</h4>
							<h3>102-551-156-9802</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Amount to Pay</h4>
							<h1>$ {{ currency(amount) }}</h1>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">IBAN</h4>
							<h3>AE340260001025511569802</h3>
						</v-flex>						

						 
						<v-flex xs12 py-4>
							<v-divider></v-divider>
						</v-flex>						
						<v-flex xs12 sm6 pa-2>
							<h2>EUR Account</h2>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Account No.</h4>
							<h3>102-551-156-9803</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Amount to Pay</h4>
							<h1>$ {{ currency(amountEUR_USD) }}</h1>
						</v-flex>						
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">IBAN</h4>
							<h3>AE340260001025511569802</h3>
						</v-flex> 
						



						<v-flex xs12 py-4>
							<v-divider></v-divider>
						</v-flex>


						<v-flex xs12 pa-2 v-if="!confirmed">
							<h4 class="font-weight-thin">Please write this on the description:</h4>
                			<h2>{{ description }}</h2>                			
						</v-flex>
						<v-flex xs12 pa-2 mt-3 v-if="confirmed">
                			<h2 style="text-align: center;">
                				We will check the Bank Transfer in a moment.
                			</h2>
						</v-flex>
    			</v-layout>
						




    		</v-container>
    		
    	</v-card-text>

		


		<v-card-actions>

			<v-layout row wrap align-center justify-center  ma-2 pa-2>

				<v-btn large block
				v-if="!confirmed"
				color="green darken-2" 
				class="white--text payBtn"
				:loading="paymentLoading"
				@click="payByBankTransfer()">
					<v-icon class="mr-2">
				    	fas fa-money-check-alt
				    </v-icon>
					Confirm Bank Transfer was done!
				</v-btn>
				
				<v-btn large block
				v-if="error_banktransfer"
				color="red darken-2" 
				class="white--text payBtn"
				:loading="paymentLoading"
				@click="banktransferFailed()">
					<v-icon class="mr-2">
				    	fas fa-money-check-alt
				    </v-icon>
					Bank Transfer failed!
				</v-btn>


				<v-btn large block
				v-if="confirmed"
				color="blue darken-2" 
				class="white--text payBtn"
				@click="banktransferSuccess()">
					<v-icon class="mr-2">far fa-check-circle</v-icon>
					close
				</v-btn>



			</v-layout>
		</v-card-actions>
    </v-card>

</v-dialog>      	
</template>

<script>
// import helpers from "@/mixins/helpers";
import inqMixin from "@/mixins/inquiry"
import inqEvntBs from "@/bus/inquiry"

import { mapGetters } from 'vuex'

export default {

	mixins: [
		// helpers,
		inqMixin,
	],

	props:{

		'dialog': {
			type: Boolean,
			default: false,
		},
		'description': String,
		'id': String,
		'amount': Number,
		'paymentType': String,
		'plan': String,		
	},

	data(){ return {
		dialogLocal: false,
		confirmed: false,
		error_banktransfer: false,
		paymentLoading: false,
		amountEUR_USD: 0,
	}},


	created(){
		
	},

	methods:{
		payByBankTransfer(){
			var payload = {};

			this.paymentLoading = true;

			if(this.plan) { // for subscription
				payload = {
					id: this.id,
					payment_type: "subscribe",
					plan: this.plan,
				};

			} else {
				payload = {
					id: this.id,
					payment_type: this.paymentType,
				}
			}


			this.$store.dispatch(this.getStore('pymnt')+'/payByBankTransfer_a', payload)
			.then((response) => {
				this.paymentLoading = false;
				console.log('payByBankTransfer', response);
				this.confirmed = true;
			})
			.catch((e) => {
				console.log(e);
				this.paymentLoading = false;
				this.error_banktransfer = true;
			});



			// setTimeout(()=>{
			// 	this.paymentLoading = false;
			// 	this.confirmed = true;
			// },2000);
			
		},

		banktransferSuccess() {
			this.$emit('banktransfer-success');
			this.closeDialog();
		},

		banktransferFailed() {
			this.$emit('banktransfer-failed');
			this.closeDialog();
		},


		openDialog(){
			this.dialogLocal = true;
		},

		closeDialog(){
			this.dialogLocal = false;
			this.$emit('update:dialog', false);
		},

		getEURConversion(){
			this.$store.dispatch(this.getStore('pymnt')+'/getCurrency_a')
			.then((rspns)=>{
				this.amountEUR_USD =  this.amount/rspns.USD;
			});
		},


	},



	computed: {

	},




	watch:{
		dialog:{
			handler(nVal,oVal){
				if(nVal){
					this.getEURConversion();
					this.openDialog();
				} else {
					// this.closeDialog();					
				}
			},
		},
	},

}
</script>

<style scoped lang="scss">
h4, h5, h3 {
	text-align: left;
}
</style>