<template>
	<div class="">
		<v-layout row justify-center>

		<v-dialog
		max-width="1100"
		:value="dialog" 
		@input="closeDialog()" >

			<v-card >
				<v-toolbar dark color="dark">
					<v-toolbar-title>
						Referral URL
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeDialog()">
						<v-icon>close</v-icon>
					</v-btn>		            
				</v-toolbar>
				
				<v-container fluid>
					<v-layout row wrap>
						<!-- <v-flex xs12>
							<v-layout row wrap>
								<h2>Referral URL</h2>
								<v-spacer></v-spacer>
								<v-btn icon @click="closeDialog()">
									<v-icon>close</v-icon>
								</v-btn>
							</v-layout>
						</v-flex> -->

						<v-flex v-if="linkCopied" 
						xs12 mt-2 style="text-align: center;" >
							<h3>Referral URL Copied!</h3>
						</v-flex>

						<v-flex xs12 mt-1 mb-2>
							<v-text-field 
							id="referralUrl"
							readonly
							:value="main_url+'/ieo?code='+authUser.referral_code+'#section-bal-token'"
							:append-outer-icon="'fas fa-copy'"
							@click:append-outer="copyLink"></v-text-field>
						</v-flex>


						<v-flex xs12>
							<h3 class="mb-2">Use the link above to refer other people and get rewarded</h3>
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
		  </v-dialog>

		</v-layout>


	<referral-link-claim-dialog :dialog.sync="openReferralClaimDialog"></referral-link-claim-dialog>

	</div>
</template>

<script>
import ReferralLinkClaimDialog from "@/views/Components/App/Buyer/ReferralLinkClaimDialog";
import config from '@/config/index';
import { forEach } from 'lodash'

import hlpr from '@/mixins/helpers'

export default {

	mixins: [hlpr],

	components:{
		ReferralLinkClaimDialog,
	},

	props: {
		dialog: {
			type: Boolean,
			default: false,            
		},
	},

	data () { return {
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
	}},

	created() {
		this.setReferralTransactions();
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

	watch:{
		dialog: {
			handler(nVal,oVal){
				if(nVal){
					this.setReferralTransactions();
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

		/deep/ table.v-table tbody td,
		/deep/ table.v-table thead th.sortable {
			padding-left: 15px;
			padding-right: 15px;	
		}

	}


</style>