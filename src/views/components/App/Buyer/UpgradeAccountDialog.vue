<template>
<span>
<!-- <div class="text-xs-center"> -->
	<v-dialog
	@input="closeDialog()" 
	:value="openDialog"
	@keydown.escape="closeDialog()"
	width="90%">

	  <v-card>

		<v-card-title class="black white--text headline pa-3">
			<v-layout row wrap justify-space-between align-center>

				<span class="ml-3">Upgrade Account</span>

				<v-btn dark flat @click="closeDialog()">
					<v-icon>close</v-icon>
				</v-btn>
		</v-layout>
		</v-card-title>

		<v-card-text style="text-align: center;">
			<v-layout row wrap justify-center>
				<v-flex px-5 py-4>
					<div style="text-align: left;">      					
						<h3 class="headline mb-3 font-weight-bold">BAL Package: LightFinder</h3>
						<p style="text-align: justify;">
							Our packages are designed to make life much, much easier for lighting companies, businesses and individuals who source LED lights
							for their personal projects. Simply register online, then choose a package that suits your needs. You can either pay monthly or for a
							discount, you can make a single annual payment.       				
						</p>
					</div>
				</v-flex>
			</v-layout>
			<v-layout row wrap justify-center align-start>

				<!-- mini -->
				<!-- ///////////////////////////////////// -->
				<v-card class="packages">
					<v-card-title 
					class="brown darken-4 white--text title"
					primary-title 
					style="text-align: left;">
						<h3 style="width: 100%">MINI</h3>
						Sourcing Reinvented
					</v-card-title>
					<v-card-text>	      				
						<ul class="mt-3" style="text-align: left;">
							<li><v-icon>fas fa-check</v-icon> Inquire & source 3 items</li>
							<li><v-icon>fas fa-check</v-icon> Minimum order quantity: 20</li>
							<li><v-icon>fas fa-check</v-icon> 100% payment protection</li>
							<li><v-icon>fas fa-check</v-icon> Best price guarantee</li>
							<li><v-icon>fas fa-check</v-icon> Sample request</li>
							<li><v-icon>fas fa-times</v-icon> Label & design support</li>
							<li><v-icon>fas fa-times</v-icon> Designated lighting designer</li>
							<li><v-icon>fas fa-times</v-icon> Markup feature</li>
						</ul>
						<v-layout mt-4 row wrap justify-space-around>

							<v-flex xs6>
								<span class="prices brown--text">${{ plan.yearly.mini }}</span> /Yearly
								<v-btn 								
								@click="payPlan('yearly.mini')"
								:loading="loadingBtn"
								class="mt-2 darken-3"
								color="success">
									Pay Yearly
								</v-btn>
							</v-flex>

							<v-flex xs6>		      				  
								<span class="prices brown--text">${{ plan.monthly.mini }}</span> /Monthly
								<v-btn 			      				
								@click="payPlan('monthly.mini')"
								:loading="loadingBtn"
								class="mt-2 white--text"
								color="black">
									Pay Monthly
								</v-btn>		      					
							</v-flex>


							<!-- yearly monthly -->
							<!-- /////////////////////////////////////////////////////////// -->
							<template v-if="payMini">
							<v-layout row wrap mt-3>

							<v-flex xs12>
								<v-btn block 
								color="darken-2" 
								:color="(payMini=='yearly.mini')?'#007500':'black'"
								class="white--text payBtn"
								@click="paySubBT(payMini)">
									<v-icon class="mr-2" style="">
										fas fa-money-check-alt
									</v-icon>
									<h5 class="font-weight-regular">BANK TRANSFER</h5>
								</v-btn>
							</v-flex>


							<v-flex xs12>
								<v-btn block 
								color="darken-2" 
								:color="(payMini=='yearly.mini')?'#007500':'black'"
								class="white--text payBtn"
								:loading="creditCardLoading"
								@click="paySubCC(payMini)">
									<v-icon class="mr-2" style="font-size: 20px;">
										far fa-credit-card
									</v-icon>
									<h5 class="font-weight-regular">CREDIT CARD</h5>
								</v-btn>
							</v-flex>


							<!-- <v-flex xs12>
								<v-btn block 
								color="darken-2" 
								:color="(payMini=='yearly.mini')?'#007500':'black'"
								class="white--text payBtn"
								:loading="loadingBtn"
								@click="paySubCrypto(payMini)">
									<v-icon class="mr-2" style="font-size: 20px;">
										fab fa-bitcoin
									</v-icon>
									<h5 class="font-weight-regular">CRYPTO CURRENCY</h5>
								</v-btn>
							</v-flex> -->

							</v-layout>
							</template>
							<!-- /////////////////////////////////////////////////////////// -->
							<!-- yearly monthly -->
							


							
							
							<!-- <v-flex xs6>
								<span class="prices brown--text">$5499</span> /Yearly
							</v-flex>

							<v-flex xs6>		      				  
								<span class="prices brown--text">$499</span> /Monthly 					
							</v-flex> 
							
							
							
							<v-flex xs12>
								<v-btn 
								disabled block
								style="font-size: 15px; color: #000 !important;"
								class="mt-2">
									Coming Soon!
								</v-btn>		      					
							</v-flex>-->





						</v-layout>
						<div class="side-note mt-3">
							*20% BAL fee on offer acceptance only
						</div>


					</v-card-text>	
				</v-card>
				<!-- ///////////////////////////////////// -->
				<!-- mini -->

				<!-- STANDARD -->
				<!-- ///////////////////////////////////// -->
				<v-card class="packages">
					<v-card-title 
					class="indigo darken-4 white--text title"
					primary-title 
					style="text-align: left;">
						<h3 style="width: 100%">STANDARD</h3>
						Sourcing Reinvented
					</v-card-title>
					<v-card-text>	      				
						<ul class="mt-3" style="text-align: left;">
							<li><v-icon>fas fa-check</v-icon> Inquire & source 6 items</li>
							<li><v-icon>fas fa-check</v-icon> Minimum order quantity: 10</li>
							<li><v-icon>fas fa-check</v-icon> 100% payment protection</li>
							<li><v-icon>fas fa-check</v-icon> Best price guarantee</li>
							<li><v-icon>fas fa-check</v-icon> Sample request</li>
							<li><v-icon>fas fa-times</v-icon> Label & design support</li>
							<li><v-icon>fas fa-times</v-icon> Designated lighting designer</li>
							<li><v-icon>fas fa-times</v-icon> Markup feature</li>
						</ul>
						<v-layout mt-4 row wrap justify-space-around>

							<!-- <v-flex xs6>
								<span class="prices indigo--text">$7699</span> /Yearly
								<v-btn 
								@click="paySubscription('yearly.standard')"
								:loading="loadingBtn"
								class="mt-2 darken-3"
								color="success">
									Pay Yearly
								</v-btn>
							</v-flex>

							<v-flex xs6>		      				  
								<span class="prices indigo--text">$699</span> /Monthly
								<v-btn 			      				
								@click="paySubscription('monthly.standard')"
								:loading="loadingBtn"
								class="mt-2 white--text"
								color="black">
									Pay Monthly
								</v-btn>		      					
							</v-flex> -->



							<v-flex xs6>
								<span class="prices indigo--text">${{ plan.yearly.standard }}</span> /Yearly
								<v-btn 
								@click="payPlan('yearly.standard')"
								:loading="loadingBtn"
								class="mt-2 darken-3"
								color="success">
									Pay Yearly
								</v-btn>
							</v-flex>

							<v-flex xs6>		      				  
								<span class="prices indigo--text">${{ plan.monthly.standard }}</span> /Monthly
								<v-btn 			      				
								@click="payPlan('monthly.standard')"
								:loading="loadingBtn"
								class="mt-2 white--text"
								color="black">
									Pay Monthly
								</v-btn>		      					
							</v-flex>

							
							<!-- yearly monthly -->
							<!-- /////////////////////////////////////////////////////////// -->
							<template v-if="payStandard">
							<v-layout column mt-3>
							<v-flex xs6>
								<v-btn block 
								color="darken-2" 
								:color="(payStandard=='yearly.standard')?'#007500':'black'"
								class="white--text payBtn"
								@click="paySubBT(payStandard)">
									<v-icon class="mr-2" style="">
										fas fa-money-check-alt
									</v-icon>
									<h5 class="font-weight-regular">BANK TRANSFER</h5>
								</v-btn>
							</v-flex>
							<v-flex xs6>
								<v-btn block 
								color="darken-2" 
								:color="(payStandard=='yearly.standard')?'#007500':'black'"
								class="white--text payBtn"
								:loading="creditCardLoading"
								@click="paySubCC(payStandard)">
									<v-icon class="mr-2" style="font-size: 20px;">
										far fa-credit-card
									</v-icon>
									<h5 class="font-weight-regular">CREDIT CARD</h5>
								</v-btn>							</v-flex>

							<!-- <v-flex xs12>
								<v-btn block 
								color="darken-2" 
								:color="(payStandard=='yearly.standard')?'#007500':'black'"
								class="white--text payBtn"
								:loading="loadingBtn"
								@click="paySubCrypto(payStandard)">
									<v-icon class="mr-2" style="font-size: 20px;">
										fab fa-bitcoin
									</v-icon>
									<h5 class="font-weight-regular">CRYPTO CURRENCY</h5>
								</v-btn>
							</v-flex>	 -->						
							</v-layout>
							</template>
							<!-- /////////////////////////////////////////////////////////// -->
							<!-- yearly monthly -->
							



							<!-- <v-flex xs6>
								<span class="prices indigo--text">$7699</span> /Yearly
							</v-flex>

							<v-flex xs6>		      				  
								<span class="prices indigo--text">$699</span> /Monthly		      					
							</v-flex>

							<v-flex xs12>
								<v-btn 
								disabled block
								style="font-size: 15px; color: #000 !important;"
								class="mt-2">
									Coming Soon!
								</v-btn>		      					
							</v-flex> -->

						</v-layout>
						<div class="side-note mt-3">
							*15% BAL fee on offer acceptance only
						</div>


					</v-card-text>	
				</v-card>
				<!-- ///////////////////////////////////// -->
				<!-- STANDARD -->

				<!-- PREMIUM -->
				<!-- ///////////////////////////////////// -->
				<v-card class="packages">
					<v-card-title 
					class="red darken-4 white--text title"
					primary-title 
					style="text-align: left;">
						<h3 style="width: 100%">PREMIUM</h3>
						Sourcing Reinvented
					</v-card-title>
					<v-card-text>	      				
						<ul class="mt-3" style="text-align: left;">
							<li><v-icon>fas fa-check</v-icon> Inquire & source 10 items</li>
							<li><v-icon>fas fa-check</v-icon> Minimum order quantity: 10</li>
							<li><v-icon>fas fa-check</v-icon> 100% payment protection</li>
							<li><v-icon>fas fa-check</v-icon> Best price guarantee</li>
							<li><v-icon>fas fa-check</v-icon> Sample request</li>
							<li><v-icon>fas fa-check</v-icon> Label & design support</li>
							<li><v-icon>fas fa-check</v-icon> Designated lighting designer</li>
							<li><v-icon>fas fa-check</v-icon> Markup feature</li>
						</ul>
						<v-layout mt-4 row wrap justify-space-around>

							<!-- <v-flex xs6>
								<span class="prices red--text">$5499</span> /Yearly
								<v-btn 
								@click="paySubscription('yearly.9899')"
								:loading="loadingBtn"
								class="mt-2 darken-3"
								color="success">
									Pay Yearly
								</v-btn>
							</v-flex>

							<v-flex xs6>		      				  
								<span class="prices red--text">$899</span> /Monthly
								<v-btn 			      				
								@click="paySubscription('monthly.premium')"
								:loading="loadingBtn"
								class="mt-2 white--text"
								color="black">
									Pay Monthly
								</v-btn>		      					
							</v-flex> -->



							<v-flex xs6>
								<span class="prices red--text">${{ plan.yearly.premium }}</span> /Yearly
								<v-btn 
								@click="payPlan('yearly.premium')"
								:loading="loadingBtn"
								class="mt-2 darken-3"
								color="success">
									Pay Yearly
								</v-btn>
							</v-flex>

							<v-flex xs6>		      				  
								<span class="prices red--text">${{ plan.monthly.premium }}</span> /Monthly
								<v-btn 			      				
								@click="payPlan('monthly.premium')"
								:loading="loadingBtn"
								class="mt-2 white--text"
								color="black">
									Pay Monthly
								</v-btn>
							</v-flex>

							
							<!-- yearly monthly -->
							<!-- /////////////////////////////////////////////////////////// -->
							<template v-if="payPremium">
							<v-layout column mt-3>
							<v-flex xs6>
								<v-btn block 
								color="darken-2" 
								:color="(payPremium=='yearly.premium')?'#007500':'black'"
								class="white--text payBtn"
								@click="paySubBT(payPremium)">
									<v-icon class="mr-2" style="">
										fas fa-money-check-alt
									</v-icon>
									<h5 class="font-weight-regular">BANK TRANSFER</h5>
								</v-btn>
							</v-flex>
							<v-flex xs6>
								<v-btn block 
								color="darken-2" 
								:color="(payPremium=='yearly.premium')?'#007500':'black'"
								class="white--text payBtn"
								:loading="creditCardLoading"
								@click="paySubCC(payPremium)">
									<v-icon class="mr-2" style="font-size: 20px;">
										far fa-credit-card
									</v-icon>
									<h5 class="font-weight-regular">CREDIT CARD</h5>
								</v-btn>
							</v-flex>
							<!-- <v-flex xs12>
								<v-btn block 
								color="darken-2" 
								:color="(payPremium=='yearly.premium')?'#007500':'black'"
								class="white--text payBtn"
								:loading="loadingBtn"
								@click="paySubCrypto(payPremium)">
									<v-icon class="mr-2" style="font-size: 20px;">
										fab fa-bitcoin
									</v-icon>
									<h5 class="font-weight-regular">CRYPTO CURRENCY</h5>
								</v-btn>
							</v-flex> -->							
							</v-layout>
							</template>
							<!-- /////////////////////////////////////////////////////////// -->
							<!-- yearly monthly -->
							
							
							<!-- <v-flex xs6>
								<span class="prices red--text">$9899</span> /Yearly
							</v-flex>

							<v-flex xs6>
								<span class="prices red--text">$899</span> /Monthly				
							</v-flex>

							<v-flex xs12>
								<v-btn 
								disabled block
								style="font-size: 15px; color: #000 !important;"
								class="mt-2">
									Coming Soon!
								</v-btn>		      					
							</v-flex> -->

						</v-layout>
						<div class="side-note mt-3">
							*15% BAL fee on offer acceptance only
						</div>

					</v-card-text>	
				</v-card>
				<!-- ///////////////////////////////////// -->
				<!-- PREMIUM -->

			</v-layout>
		</v-card-text>


		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
			color="primary"
			flat
			@click="closeDialog()">
				close
			</v-btn>
		</v-card-actions>

	  </v-card>


	</v-dialog>



	<bank-transfer-details 
	paymentType="project" 
	:plan="selectedPlan"
	:description="description"
	:amount="overAllTotal" 
	:id="$store.state.auth.auth_user.uuid" 
	:paymentType="'subscribe'" 
	:dialog.sync="showBankTransfer"
	@banktransfer-success="banktransferSuccess($event)"
	@banktransfer-failed="banktransferFailed($event)">
	</bank-transfer-details>


	<crypto-transfer-details 
	paymentType="project" 
	:plan="selectedPlan"
	:amount="overAllTotal" 
	:id="$store.state.auth.auth_user.uuid" 
	:paymentType="'subscribe'" 
	:dialog.sync="showCryptoTransfer"
	@banktransfer-success="cryptotransferSuccess($event)"
	@banktransfer-failed="cryptotransferFailed($event)">
	</crypto-transfer-details>

	<foloosi-payment 
	:reference_token="reference_token" 
	@payment-success="paymentSuccess($event)"
	@payment-failed="paymentFailed($event)">
	</foloosi-payment>

<!-- </div> -->
</span>
</template>

<script>
import cnfg from "@/config/main";
import BankTransferDetails from "@/views/Components/App/Buyer/MyHome/BankTransferDetails";
import CryptoTransferDetails from "@/views/Components/App/Buyer/CryptoTransferDetails";
import FoloosiPayment from "@/views/Components/App/Payment/FoloosiPayment";
export default {
	components: {
		BankTransferDetails,
		CryptoTransferDetails,
		FoloosiPayment,
	},
	
	props:['openDialog'],
	
	data () { return {
		loadingBtn: false,
		creditCardLoading: false,
		
		payMini: null,
		payStandard: null,
		payPremium: null,

		description:'',
		reference_token:'',
		showBankTransfer: false,
		showCryptoTransfer: false,
		overAllTotal:0,
		selectedPlan:null,

		plan: cnfg.plan,

	}},

	methods:{
		closeDialog(){
			this.$emit('update:openDialog',false);
			this.payMini = null;
			this.payStandard = null;
			this.payPremium = null;
		},

		payPlan(plan){
			this.payMini = null;
			this.payStandard = null;
			this.payPremium = null;	

			if(plan=='yearly.mini' || plan=='monthly.mini') {
				this.payMini = plan;			
			}
			else if(plan=='yearly.standard' || plan=='monthly.standard') {
				this.payStandard = plan;
			}
			else if(plan=='yearly.premium' || plan=='monthly.premium') {
				this.payPremium = plan;
			}


		},


		paySubBT(plan){
			if(plan=='yearly.mini') {				
				this.overAllTotal = this.plan.yearly.mini;
				this.description = 'Payment for Mini - Yearly Subscription';
			}
			else if(plan=='monthly.mini') {				
				this.overAllTotal = this.plan.monthly.mini;
				this.description = 'Payment for Mini - Monthly Subscription';
			}
			else if(plan=='yearly.standard') {
				this.overAllTotal = this.plan.yearly.standard;
				this.description = 'Payment for Standard - Yearly Subscription';
			}
			else if(plan=='monthly.standard') {				
				this.overAllTotal = this.plan.monthly.standard;
				this.description = 'Payment for Standard - Monthly Subscription';
			}
			else if(plan=='yearly.premium') {
				this.overAllTotal = this.plan.yearly.premium;
				this.description = 'Payment for Premium - Yearly Subscription';
			}
			else if(plan=='monthly.premium') {				
				this.overAllTotal = this.plan.monthly.premium;
				this.description = 'Payment for Premium - Monthly Subscription';
			}
			else {				
				this.overAllTotal = 0;
				this.description = 'Payment for Subscription';
			}

			this.selectedPlan = null;
			if(this.payMini) {
				this.selectedPlan = this.payMini;
			}
			else if(this.payStandard) {
				this.selectedPlan = this.payStandard;
			}
			else if(this.payPremium) {
				this.selectedPlan = this.payPremium;
			}

			this.showBankTransfer = true;
		},


		paySubCrypto(plan){
			var retVal = 0;
			if(plan=='yearly.mini') {				
				retVal = this.plan.yearly.mini;
			}
			else if(plan=='monthly.mini') {				
				retVal = this.plan.monthly.mini;
			}
			else if(plan=='yearly.standard') {
				retVal = this.plan.yearly.standard;
			}
			else if(plan=='monthly.standard') {				
				retVal = this.plan.monthly.standard;
			}
			else if(plan=='yearly.premium') {
				retVal = this.plan.yearly.premium;
			}
			else if(plan=='monthly.premium') {				
				retVal = this.plan.monthly.premium;
			}
			else {				
				retVal = 0;
			}
			
			this.overAllTotal = retVal;

			this.selectedPlan = null;
			if(this.payMini) {
				this.selectedPlan = this.payMini;
			}
			else if(this.payStandard) {
				this.selectedPlan = this.payStandard;
			}
			else if(this.payPremium) {
				this.selectedPlan = this.payPremium;
			}

			this.showCryptoTransfer = true;
		},

		paySubCC(plan){


			this.creditCardLoading = true;
			this.$store.dispatch(this.getStore('pymnt')+'/getCreditCardResource_a', {
				id: this.$store.state.auth.auth_user.uuid,
				type: "subscribe",
				plan: plan,
			})
			.then((rspns)=>{
				console.log('getCreditCardResource', rspns);
				this.reference_token = rspns.reference_token;
				this.creditCardLoading = false;
			})
			.catch((e)=>{
				console.log(e);
			});

		},

		paymentSuccess(data){

			var plan = "";
			if(this.payMini) {
				plan = this.payMini;
			}
			else if(this.payStandard) {
				plan = this.payStandard;
			}
			else if(this.payPremium) {
				plan = this.payPremium;
			}

			var payload = {
				transaction_id: data.transaction_no,
				id: this.$store.state.auth.auth_user.uuid,
				type: "subscribe",
				plan: plan,
			};


			console.log(payload);


			this.$store.dispatch(this.getStore('pymnt')+'/setPurchaseAsPaid_a',payload)
			.then((rspns)=>{
				console.log('router to BuyerHome');
				// console.log('url', this.$router.resolve('BuyerHome').href);

				var routeName = '';
				if(this.$route.meta.role == 3) {
					routeName = 'BuyerHome';
				}
				else if(this.$route.meta.role == 1) {
					routeName = 'AdminHome';
				}
				console.log('router to '+routeName);

				// this.$router.push({
				// 	name: routeName,
				// });

				
				var routeUrl = window.location.origin + this.$router.resolve({name:routeName}).href;
				window.location.href = routeUrl;





			})
			.catch((e)=>{

			});
		},
		paymentFailed(data){

		},

		banktransferSuccess(data){

			// console.log('url', this.$router.resolve('BuyerHome').href);

			var routeName = '';
			if(this.$route.meta.role == 3) {
				routeName = 'BuyerHome';
			}
			else if(this.$route.meta.role == 1) {
				routeName = 'AdminHome';
			}

			console.log('upgrade account banktransferSuccess '+routeName);

				
			var routeUrl = window.location.origin + this.$router.resolve({name:routeName}).href;
			window.location.href = routeUrl;


		},

		banktransferFailed(data){

		},



		cryptotransferSuccess(data){

			// console.log('url', this.$router.resolve('BuyerHome').href);

			var routeName = '';
			if(this.$route.meta.role == 3) {
				routeName = 'BuyerHome';
			}
			else if(this.$route.meta.role == 1) {
				routeName = 'AdminHome';
			}

			console.log('upgrade account banktransferSuccess '+routeName);

				
			var routeUrl = window.location.origin + this.$router.resolve({name:routeName}).href;
			window.location.href = routeUrl;

		},
		cryptotransferFailed(data){

		},



	},

}
</script>



<style scoped lang="scss">
.packages {
	margin: 20px;
	width: 320px;
	.prices {
		font-weight: bold;
		font-size: 1.3em;			
	}
	.side-note {
		font-size: 0.8em;
	}



	ul {
		li {
			margin-top: 10px;
			font-size: 0.9em;
			margin-left: 0px;
			list-style: none;

			.v-icon {
				margin-right: 10px;
				font-size: 0.9em;
			}
		}
	}
}	
</style>