<template>
<v-img :src="backgroundImg" class="page-vimg">

	<v-container  justify-center align-center fill-height pa-0>
	  <v-layout row wrap justify-center align-center style="width: 100%;">
		<v-flex xs12>
			<v-card class="border-radius6 box-white-500-glow elevation-10">


				<v-toolbar dark color="dark">
					<v-toolbar-title>
						Your Referrals
					</v-toolbar-title>
					<v-spacer></v-spacer>

					<v-btn icon @click="setReferralTransactions()">
						<v-icon>fas fa-redo-alt</v-icon>
					</v-btn>	
				</v-toolbar>
				
				<v-container fluid>
					<v-layout row wrap>

						<v-flex md6 mt-1 mb-2>
							<h3>Use Referral URL to refer other people and get rewarded.</h3>
							<v-text-field 
							id="referralUrl"
							readonly
							:value="main_url+'/ieo?code='+authUser.referral_code+'#section-bal-token'"
							:append-outer-icon="'fas fa-copy'"
							title="Copy Referral URL"
							@click:append-outer="copyLink"></v-text-field>
						</v-flex>


						<v-flex md6 pl-5>
							<!-- <h3 class="mb-2">Use the Referral URL to refer other people and get rewarded</h3> -->
							<h3 class="mb-2">Rewards:</h3>
							<ul>								
								<li>10% for up to 5000 BAL Tokens purchased</li>
								<li>7.5% for up to 10000 BAL Tokens purchased</li>
								<li>5% for anything above 10000 BAL Tokens purchased</li>
							</ul>
						</v-flex>


						<v-flex xs12 mt-4 pb-3 style="text-align: center;">

							<v-data-table 
							:headers="refTrans.headers" 
							:items="refTrans.data" 
							:loading="tableLoading"
							hide-actions 
							class="elevation-0 refTranxs">

								<template v-slot:items="sp">
									<tr> 
										<td>{{ sp.item.ref_id }}</td>
										<td>{{ sp.item.name }}</td>
										<td>{{ numberWithCommas(sp.item.bal_amt) }} BAL</td>
										<td>{{ numberWithCommas(sp.item.commission) }}</td>
										<td v-html="sp.item.conversion"></td>
										<td>{{ sp.item.is_verified }}</td>
										<td>
											<v-btn small :disabled="sp.item.is_verified!='Yes'"
											style="font-size: 13px;"
											color="success" @click="openReferralClaimDialog=true">
												Claim
											</v-btn>
										</td>
									</tr>
								</template>

							    <template v-slot:no-data>
							    	<h3 class="pa-4" style="text-align: center;">No transactions..</h3>
							    </template>

							</v-data-table>							

						</v-flex>

					</v-layout>
				</v-container>



			</v-card>          	
		</v-flex>



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



	<referral-link-claim-dialog :dialog.sync="openReferralClaimDialog"></referral-link-claim-dialog>

</v-img>
</template>





<script>
import ReferralLinkClaimDialog from "@/views/Components/App/Buyer/ReferralLinkClaimDialog";
import config from '@/config/index';
import { forEach } from 'lodash'

import hlpr from '@/mixins/helpers'

export default {

	// mixins: [hlpr],

	components:{
		ReferralLinkClaimDialog,
	},

	data: () => ({
		backgroundImg: '/static/background/buyer-background.jpg',

		linkCopied: false,
		openReferralClaimDialog: false,
		tableLoading: false,
		main_url: config.main.mainURL,
		refTrans: {
			headers: [
				{
					text: 'ID',
					value: 'ref_id',
				},
				{
					text: 'Name',
					value: 'name',
				},
				{
					text: 'Total BAL Purchased',
					value: 'bal_amt',
				},
				{
					text: 'Expected Commission',
					value: 'commission',
				},
				{
					text: 'Expected BTC or ETH',
					value: 'conversion',
				},
				{
					text: 'Verified',
					value: 'is_verified',
				},
				{
					text: '',
					align: 'center',
					sortable: false,
					value: '',
				},
			],
			data: [],
		},

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


		if(!this.$store.getters['auth/isLoggedIn_g']) {
			this.$router.push({name:'ReferralLogout'});
		}
		else {
			// alert('LOGGED IN!!');
	    	console.log('$route',this.$route.meta);			
			this.setReferralTransactions();
		}

	},

	methods: {
		closeDialog(){
			this.linkCopied = false;
			this.$emit('update:dialog', false);
		},

		copyLink(){
			// alert('Link Copied!');
			let input=document.getElementById("referralUrl");
			input.select();
			document.execCommand("copy");
			this.linkCopied = true;				
		},

		setReferralTransactions(){
			this.tableLoading = true;
			this.$store.dispatch(this.getStore()+'/getReferralTransactions_a',{
				code: this.authUser.referral_code,
			})
			.then((rspns)=>{
				this.refTrans.data = [];
				if(rspns.length) {
					forEach(rspns,(item)=>{
						this.refTrans.data.push({
							ref_id: item.user_reference_id,
							name: item.name,
							bal_amt: item.bal_amt,
							is_verified: item.is_verified,
							conversion: '<strong>BTC:</strong> '+item.BTC+'<br>'+'<strong>ETH:</strong> '+item.ETH,
							commission: item.expected_bal_amt+' BAL ('+item.expected_bal_amt_per+')',
						});
					});
					console.log('refer this.refTrans',this.refTrans);
				}				
			})
			.finally(()=>{
				this.tableLoading = false;
			});
		},
	},

	computed:{
		authUser () {        
			return this.$store.state.auth.auth_user;
		},			
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


.social-buttons {
	/deep/ .v-btn__loading {
	    color: #000;
	}
}

.refTranxs {
	td {
		text-align: left;
	}

	/deep/ table.v-table tbody td,
	/deep/ table.v-table thead th.sortable {
		padding-left: 15px;
		padding-right: 15px;	
	}

}
</style>