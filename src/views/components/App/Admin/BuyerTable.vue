<template>
<span>
	<v-layout row wrap>
	  <v-spacer></v-spacer>
	  <div>
		<v-btn @click="openDialog()" class="font-weight-light" dark color="grey darken-4"><i class="fas fa-user-plus white--text"></i>&nbsp Add Buyer </v-btn>
	  </div>
	</v-layout>
	<v-card>
	  <v-toolbar dark color="grey darken-4">
		<h1 class="font-weight-light title">Buyer</h1>
		<v-spacer></v-spacer>
		<v-btn icon @click="Refresh()">
		  <v-icon>refresh</v-icon>
		</v-btn>
	  </v-toolbar>
	  <!-- component  -->
	  <div class="mt-4">
		<v-flex xs3 offset-xs9 mr-2 ml3>
		  <v-text-field label="Search" v-model="search" placeholder="Search" prepend-inner-icon="search" solo clearable>
		  </v-text-field>
		</v-flex>
		<v-divider></v-divider>
		<v-data-table :headers="headers" :items="dataItems" :loading="loading" :search="search">
		  <template slot="items" slot-scope="props">
			<tr class="th-heading">
			  <td class="text-xs-left">
				<v-checkbox v-model="props.item.select" :inq-id="props.item.id" primary hide-details></v-checkbox>
			  </td>
			  <td class="text-xs-left font-weight-medium">
				<v-avatar size="40px">
				  <img v-if="props.item.avatar" :src="props.item.avatar" alt="Avatar">
				  <v-icon v-else color="grey darken-4" dark>account_circle</v-icon>
				</v-avatar>
			  </td>
			  <td class="text-xs-left font-weight-medium">{{ props.item.first_name }}</td>
			  <td class="text-xs-left font-weight-medium">{{ props.item.last_name }}</td>
			  <td class="text-xs-left">{{ props.item.email }}</td>
			  <td class="text-xs-left">{{ props.item.job_title }}</td>
			  <td class="text-xs-left">
				{{ props.item.date_created }}
			  </td>
			  <td class="text-xs-left">
				<v-layout row wrap style="min-width: 120px;">
					<v-btn small 
					title="edit"
					style="min-width: 35px;"
					@click="editBuyer(props.item.id)" 
					class="red darken-1 font-weight-light">
					  <i class="fas fa-edit white--text"></i>
					</v-btn>

					<v-btn small 
					v-if="props.item.subscription_data"
					title="Approve Bank Transfer"
					style="min-width: 35px;"
					@click="approveBuyerBankTransfer(props.item)" 
					class="blue darken-1 font-weight-light">
						<i class="fas fa-check-circle white--text mr-1"></i>
						<i class="fas fa-money-check white--text"></i>
					</v-btn>
				</v-layout>

			  </td>
			</tr>
		  </template>
		  <v-alert slot="no-results" :value="true" color="error" icon="warning">
			Your search for "{{ search }}" found no results.
		  </v-alert>
		</v-data-table>
	  </div>
	  <!-- component  -->
	</v-card>
	<!-- buyer dialog -->
	<buyer-dialog :buyerData="buyerData" :buyer_id.sync="buyer_id" :dialog.sync="dialog" :is_new.sync="is_new"> </buyer-dialog>
	<!-- buyer dialog -->


	<bank-transfer-confirmation
	:dialog.sync="showBTC"
	:buyer="btc_buyer"	
	@banktransferConfirmation-success=""
	@banktransferConfirmation-failed="">
	</bank-transfer-confirmation>




</span>
</template>
<script>
import adminBuyerBus from "@/bus/admin-buyer"
// import helpers from "@/mixins/helpers"
import BuyerDialog from '@/views/Components/app/Admin/BuyerDialog'

import BankTransferConfirmation from '@/views/Components/app/Admin/BankTransferConfirmation'


import config from "@/config/main"
import VueTimers from 'vue-timers/mixin'
export default {
	// disable polling
	// timers: [{
	//   name: 'BuyerTableTimer',
	//   time: config.polling.inquiryTable.time,
	//   repeat: true,
	//   autostart: true,
	//   callback: function() {
	//     this.fillTable(false);
	//   },
	// }],
	components: {
		BuyerDialog,
		BankTransferConfirmation,
	},

	mixins: [
		// helpers,
		VueTimers,
	],

	data() { return {
			search: '',
			dialog: false,
			loading: false,
			headers: [ 
				{
					text: 'Select', align: 'left', sortable: false, value: 'id'
				},
				{
					text: 'Avatar', align: 'left', sortable: false, value: 'avatar'
				},
				{
					text: 'Firstname', align: 'left', sortable: true, value: 'first_name'
				},
				{
					text: 'Lastname', align: 'left', sortable: true, value: 'last_name'
				},
				{
					text: 'Email', align: 'left', sortable: true, value: 'email'
				},
				{
					text: 'Job Title', align: 'left', sortable: true, value: 'job_title'
				},
				{
					text: 'Date Created', align: 'left', sortable: true, value: 'created_at'
				},
				{
					text: 'Action', align: 'center', sortable: false, width: '150'
				},
			],
			dataItems: [],
			buyerData: null,
			is_new: false,
			buyer_id: null,


			showBTC: false,
			btc_buyer: {
				subscription_data:{},
			},

	}},

	created() {
		this.fillTable();
		adminBuyerBus.$on('buyer-form-submitted', ()=> {
			this.fillTable();
		});
	},

	methods: {
		fillTable(withloading=true) {
			if(withloading) {
				this.loading=false;
			}
			this.dataItems=[];
			this.$store.dispatch('admnByr/getAllBuyer_a') 
			.then((response)=> {

				// console.log('response BuyerTable', response);

				for (var i=response.length - 1; i >=0; i--) {
					var item= {};
					item.id=response[i].id;
					item.avatar=response[i].avatar;
					item.first_name=response[i].first_name;
					item.last_name=response[i].last_name;
					item.email=response[i].email;
					item.job_title=response[i].job_title;
					// item.subscription_id=response[i].subscription_id;
					item.subscription_data=response[i].subscription_data;
					item.date_created=response[i].created_at;
					this.dataItems.push(item);
				}
				if(withloading) {
					this.loading=false;
				}
				// console.log('response this.dataItems', this.dataItems);
			}) 
			.catch((e)=> {
				console.log('Error: ' + e);
				this.loading=false;
			}) 
			.finally(()=> {
				this.loading=false;
			});
		},
		editBuyer(buyer_id) {
			let data= {
				"id": buyer_id
			}
			this.$store.dispatch('admnByr/getBuyer_a', {
				data: data
			})
			.then((response)=> {
				this.buyerData=response;
				this.dialog=true;
				this.buyer_id=buyer_id;
			})
			.catch((e)=> {
				this.loading=false;
			})
			.finally(()=> {
				this.loading=false;
			})
		},
		Refresh() {
			this.fillTable();
		},
		openDialog() {
			this.dialog=true;
			this.is_new=true;
		},

		approveBuyerBankTransfer(item) {
			this.btc_buyer = item;			
			this.showBTC = true;
		},
	},
}

</script>
