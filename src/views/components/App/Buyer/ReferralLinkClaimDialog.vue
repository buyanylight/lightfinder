<template>
	<div class="">
		<v-layout row justify-center>

		<v-dialog
		max-width="600"
		:value="dialog" 
		@input="closeDialog()">

			<v-card >
				<!-- <v-toolbar dark color="dark">
					<v-toolbar-title>
						Referral URL
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeDialog()">
						<v-icon>close</v-icon>
					</v-btn>		            
				</v-toolbar> -->
				
				<v-container fluid pt-5>
					<v-layout row wrap>
						<v-flex xs12>
							<v-btn style="position: absolute; right: 0; top: 0;"
							icon @click="closeDialog()">
								<v-icon>close</v-icon>
							</v-btn>
						</v-flex>

						<v-flex xs12>
							<h4 class="mb-4">Please choose the currency you would like to claim in:</h4>
						</v-flex>
						<v-flex xs12>
							<v-layout row wrap justify-space-around>							  
								<v-btn color="primary" @click="showText('btc')" :outline="btcText" :flat="btcText">BTC</v-btn>
								<v-btn color="primary" @click="showText('eth')" :outline="ethText" :flat="ethText">ETH</v-btn>
								<v-btn color="primary" @click="showText('bal')" :outline="balText" :flat="balText">BAL</v-btn>
							</v-layout>
						</v-flex>
						<v-flex xs12>
							<h4 class="mt-4 mb-4" style="font-weight: normal;">
								<template v-if="btcText" >									
								Please send an email to
								<a href = "mailto: invest@buyanylight.com"><strong>invest@buyanylight.com</strong></a>
								along with your 
								referrel link and <strong>BTC address</strong> to claim your BAL token commissions.
								</template>

								<template v-else-if="ethText" >
								Please send an email to
								<a href = "mailto: invest@buyanylight.com"><strong>invest@buyanylight.com</strong></a>
								along with your 
								referrel link and <strong>ETH address</strong> to claim your BAL token commissions.
								</template>
	
								<template v-else-if="balText" >
								Please send an email to
								<a href = "mailto: invest@buyanylight.com"><strong>invest@buyanylight.com</strong></a>
								along with your 
								referrel link and <strong>ETH address</strong> to claim your BAL token commissions.
								</template>
							</h4>
						</v-flex>


					</v-layout>
				</v-container>		
			</v-card>
		  </v-dialog>

		</v-layout>

	</div>

</template>

<script>
import config from '@/config/index';
import { forEach } from 'lodash'

export default {

		props: {
			dialog: {
				type: Boolean,
				default: false,            
			},
		},

		data () { return {
			btcText: false,
			ethText: false,
			balText: false,

		}},

		created() {

		},

		methods: {
			closeDialog(){
				this.$emit('update:dialog', false);
			},

			showText(text) {
				if(text=='btc') {
					this.btcText = true;
					this.ethText = false;
					this.balText = false;
				}
				else if(text=='eth') {
					this.btcText = false;
					this.ethText = true;
					this.balText = false;
				}
				else if(text=='bal') {
					this.btcText = false;
					this.ethText = false;
					this.balText = true;
				}
			},
		},

		computed:{
			authUser () {        
				return this.$store.state.auth.auth_user;
			},
		},

		watch:{
			dialog: {
				handler(nVal,oVal){
					if(nVal){
						this.btcText = false;
						this.ethText = false;
						this.balText = false;
					}
				},
			},
		},
	}

</script>

<style scoped lang="scss">
	.refTranxs {
		td {
			text-align: left;
		}
	}
</style>