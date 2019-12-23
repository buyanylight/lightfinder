<template>
	<div class="">
		<v-layout row justify-center>

		<v-dialog
		width="600"
		:value="dialog" 
		@input="closeDialog()" >

			<v-card >
				<!-- <v-toolbar dark color="dark">
					<v-toolbar-title>
						BAL Tokens
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon @click="closeDialog()">
						<v-icon>close</v-icon>
					</v-btn>		            
				</v-toolbar> -->
				
				<v-container fluid>
					<v-layout row wrap>
						<v-btn icon @click="closeDialog()" 
						style="position: absolute; right: 0; top: 0;">
							<v-icon>close</v-icon>
						</v-btn>						
						<v-flex xs12>
							<v-layout row wrap mb-4>
								<h2>BAL Tokens</h2>
							</v-layout>
						</v-flex>


						<v-flex xs12 style="text-align: center;">

							<v-data-table 
							:headers="tableData.headers" 
							:items="tableData.items" 
							:loading="tableLoading"
							hide-actions 
							class="elevation-0 tables">

								<template v-slot:items="sp">
									<tr> 
										<td>{{ sp.item.user_reference_id }}</td>
										<td>{{ numberWithCommas(sp.item.bal_amt) }} BAL</td>
										<td>{{ numberWithCommas(sp.item.amount) }}</td>
										<td>{{ sp.item.is_verified }}</td>
									</tr>
								</template>

							    <template v-slot:no-data>
							    	<h3 class="pa-4" style="text-align: center;">No transactions..</h3>
							    </template>

							</v-data-table>							

							<h3 class="mt-5 pr-3" style="text-align: right;">
								<span style="font-weight: normal;">Total BAL Tokens:</span> {{ numberWithCommas(totalBalAmt) }} BAL
							</h3>


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
import hlpr from '@/mixins/helpers'

export default {

	components:{

	},

	mixins:[
		hlpr,
	],

	props: {
		dialog: {
			type: Boolean,
			default: false,            
		},
	},

	data () { return {
		linkCopied: false,

		tableLoading: false,
		tableData: {
			headers: [
				{
					text: 'ID',
					value: 'ref_id',
				},
				{
					text: 'BAL Tokens',
					value: 'bal_amt',
				},
				{
					text: 'Amount Paid',
					value: 'amount',
				},
				{
					text: 'Verified',
					value: 'is_verified',
				},
			],
			items: [],
		},

		totalBalAmt: 0,
	}},

	created() {

	},

	methods: {
		closeDialog(){
			this.$emit('update:dialog', false);
		},



		getBALTokens(){
			this.tableLoading = true
			this.$store.dispatch(this.getStore()+'/getBalTokens_a')
			.then((rspns)=>{
				console.log(rspns);
				rspns.forEach((itm,indx)=>{
					this.totalBalAmt+=parseFloat(itm.bal_amt);
				});
				this.tableData.items =  rspns;
				this.tableLoading = false;
			}).catch((e)=>{
				console.log(e);
				this.tableLoading = false;
			});
			
			// setTimeout(()=>{
			// 	this.openBALTokensDialog=true;
			// 	this.tableLoading = false;
			// },1500);
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
					this.totalBalAmt = 0;
					this.getBALTokens();
				}
			},
		},
	},
}

</script>

<style scoped lang="scss">

	.tables {
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