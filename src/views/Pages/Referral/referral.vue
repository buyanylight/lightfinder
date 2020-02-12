<template>
<v-img :src="backgroundImg2" class="page-vimg" >
<!-- <v-img class="page-vimg" > -->

	<v-container  justify-center align-center fill-height pa-0>
	  <v-layout row wrap justify-center align-center style="width: 100%;">
		<v-flex xs12 pa-2>
			<v-card class="border-radius6 box-white-500-glow elevation-10">


				<v-card-title primary-title 
				class="pt-2 pb-2"
				style="background-color: #000;">
					<h3 style="color:#fff;">{{ ucwords(authUser.firstname) }} {{ ucwords(authUser.lastname) }}'s Referrals</h3>
					<v-btn icon :to="{ name: 'ReferralLogout'}"
					style="color:#fff;">
						<v-icon>fas fa-sign-out-alt</v-icon>
					</v-btn>

					<v-spacer></v-spacer>
					<v-btn icon @click="setReferralTransactions()"
					style="color:#fff;">
						<v-icon>fas fa-redo-alt</v-icon>
					</v-btn>						
				</v-card-title>

				<v-card-text class="fit-height">

					<v-layout row wrap justify-space-between>

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



						<v-flex md5>
							<!-- <h3 class="mb-2">Use the Referral URL to refer other people and get rewarded</h3> -->
							<h3 class="mb-2">Rewards:</h3>
							<ul>								
								<li>10% for up to 5000 BAL Tokens purchased</li>
								<li>7.5% for up to 10000 BAL Tokens purchased</li>
								<li>5% for anything above 10000 BAL Tokens purchased</li>
							</ul>
						</v-flex>




						<v-flex v-if="!isInMobile()"
						xs12 mt-4 pb-3 
						style="text-align: center;">
							<v-data-table 
							:headers="refTrans.headers" 
							:items="refTrans.data" 
							:loading="tableLoading"
							hide-actions 
							class="elevation-0 refTranxs ">

								<template v-slot:items="sp">
									<tr> 
										<td>{{ sp.item.ref_id }}</td>
										<td>{{ ucwords(sp.item.name) }}</td>
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
						
						
						<!-- if in mobile -->
						<v-flex xs12 mt-5 v-else>
							
							<!-- <v-progress-linear v-if="tableLoading" :indeterminate="true"></v-progress-linear> -->
							<v-progress-linear v-if="tableLoading" :indeterminate="true" style="top: -15px;"></v-progress-linear>

							<v-data-iterator
							:items="refTrans.data" 							
							content-tag="v-layout" 
							row wrap
							class="refTranxs-mobile">
								<template v-slot:item="props">
									<v-flex xs12 sm6 md4 lg3 mb-4 style="border: 1px solid #e2e2e2;">
										<v-card>
											<v-card-title>
												<h4>{{ ucwords(props.item.name) }} : {{ props.item.ref_id }}</h4></v-card-title>
											<v-divider></v-divider>
											<v-list dense>
												<!-- <v-list-tile >
													<v-list-tile-content class="row-title">ID:</v-list-tile-content>
													<v-list-tile-content class="row-content align-end">
														{{ props.item.ref_id }}
													</v-list-tile-content>
												</v-list-tile> -->

												<v-list-tile>
													<v-list-tile-content class="row-title">Total BAL Purchased:</v-list-tile-content>
													<v-list-tile-content class="row-content align-end">
														{{ numberWithCommas(props.item.bal_amt) }} BAL
													</v-list-tile-content>
												</v-list-tile>
												
												<v-list-tile>
													<v-list-tile-content class="row-title">Expected Commission:</v-list-tile-content>
													<v-list-tile-content class="row-content align-end">
														{{ numberWithCommas(props.item.commission) }}
													</v-list-tile-content>
												</v-list-tile>
												
												<v-list-tile>
													<v-list-tile-content class="row-title">Expected:</v-list-tile-content>
													<v-list-tile-content class="row-content align-end">
														<span v-html="props.item.conversion"></span>
													</v-list-tile-content>
												</v-list-tile>
												
												<v-list-tile>
													<v-list-tile-content class="row-title">Verified:</v-list-tile-content>
													<v-list-tile-content class="row-content align-end">
														{{ props.item.is_verified }}
													</v-list-tile-content>
												</v-list-tile>
												
												<v-list-tile>
													<v-list-tile-content class="align-end">
														<v-btn small :disabled="props.item.is_verified!='Yes'"
														style="font-size: 13px;"
														color="success" @click="openReferralClaimDialog=true">
															Claim
														</v-btn>														
													</v-list-tile-content>
												</v-list-tile>
											</v-list>
										</v-card>
									</v-flex>								
								</template>

								<template v-slot:no-data>
									<h3 class="pa-4" style="text-align: center;">No transactions..</h3>
								</template>



							</v-data-iterator>							

						</v-flex>


					</v-layout>

				</v-card-text>

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
		backgroundImg2: '/static/background/partners-bg.png',

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
							conversion: '<strong>BTC:</strong> <span>'+item.BTC+'</span><br>'+'<strong>ETH:</strong> <span>'+item.ETH+'</span>',
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

.page-vimg {
	background-color: #5555a4;
}

.refTranxs-mobile {

	// .v-list--dense .v-list__tile {
	// 	height: 30px;
	// }

	.align-end {
		align-items: flex-end;
	}

	.row-title,
	.row-content {
		// height: 15px;
	}

	.row-content {
		// font-weight: bold;
	}

	.row-title {
		font-size: 10px;
	}
}


.fit-height {
    max-height: 80vh;
    overflow-y: auto;
    min-height: auto;
    height: auto;
}

</style>