<template>
	<div class="">
		<v-layout row justify-center>

		<v-dialog
		width="600"
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
							<h3 class="mb-2">Use the link above to refer people and get rewarded</h3>
							<ul>								
								<li>10% for upto 5000 BAL Tokens purchased</li>
								<li>7.5% for upto 10000 BAL Tokens purchased</li>
								<li>5% for anything above 10000 BAL Tokens purchased</li>
							</ul>
						</v-flex>



						<v-flex xs12 mt-4 pb-3 style="text-align: center;">

							<v-data-table 
							:headers="refTrans.headers" 
							:items="refTrans.data" 
							hide-actions 
							class="elevation-0 refTranxs">
								<template v-slot:items="sp">
									<tr> 
										<td>{{ sp.item.name }}</td>
										<td>{{ sp.item.bal_amt }}</td>
										<td>{{ sp.item.is_verified }}</td>
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
			linkCopied: false,
			main_url: config.main.mainURL,
			refTrans: {
				headers: [
					{
						text: 'Name',
						value: 'name',
					},
					{
						text: 'BAL Total',
						value: 'bal_amt',
					},
					{
						text: 'Verified',
						value: 'is_verified',
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
				this.$store.dispatch(this.getStore()+'/getReferralTransactions_a',{
					code: this.authUser.referral_code,
				})
				.then((rspns)=>{
					this.refTrans.data = [];
					if(rspns.length) {
						forEach(rspns,(item)=>{
							this.refTrans.data.push({
								name: item.name,
								bal_amt: item.bal_amt,
								is_verified: item.is_verified,
							});
						});
						console.log('refer this.refTrans',this.refTrans);
					}
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
	}
</style>