<template>
<div>
		
	<!-- <v-alert 
	class="mx-3"
	color="black" 
	icon="fas fa-clipboard-list"
	:value="true">
	</v-alert> -->
	<v-layout 
	style=""
	row justify-space-between align-center mx-3 my-0 px-4 py-2>
		
		<v-flex pr-4 v-if="pckg.package_type=='free' && pckg.bankTransferStatus!='confirming' ">
			<v-layout row wrap justify-center align-center>		  
				<h3 style="width: 200px;text-align: left;" 
				class="mr-3">PACKAGE: {{ typeOfPackage }}</h3>

				<v-btn @click="openDialog=true" color="green darken-2" class="white--text">
					UPDGRADE NOW!
				</v-btn>
			</v-layout>
		</v-flex>

		<v-flex pr-4 v-else-if="pckg.bankTransferStatus=='confirming'">
			<v-layout row wrap justify-start align-center style="width:300px;">
				<h3 style="text-align: left;" 
				class="mr-3">PACKAGE: {{ typeOfPackage }}</h3>
				<h3 style="font-size: 15px; font-weight: normal; text-align: left;">(BAL is confirming bank transfer)</h3>
			</v-layout>
		</v-flex>

		<v-flex pr-4 v-else>
			<v-layout row wrap justify-center align-center>		  
				<h3 style="width: 250px;text-align: left;" 
				class="mr-3">PACKAGE: {{ typeOfPackage }}</h3>
			</v-layout>
		</v-flex>

		<v-flex py-1 pl-5>
			<h3 class="mr-3">
				<template v-if="pckg.max_inquiry - totalInqs > 1 || pckg.max_inquiry - totalInqs == 0">
					<v-icon class="mr-2">fas fa-clipboard-list</v-icon>
					Inquiries: {{ pckg.max_inquiry - totalInqs }} remaining out of {{ pckg.max_inquiry }}
				</template>
				<template v-else-if="pckg.max_inquiry - totalInqs == 1">
					<v-icon class="mr-2">fas fa-clipboard-list</v-icon>
					<!-- Only 1 Inquiry remaining. -->
					Inquiries: {{ pckg.max_inquiry - totalInqs }} remaining out of {{ pckg.max_inquiry }}
				</template>
				<template v-else>
					<v-icon class="mr-2">fas fa-clipboard-list</v-icon>
					<!-- Only 1 Inquiry remaining. -->
					Inquiries: {{ pckg.max_inquiry - totalInqs }} remaining out of {{ pckg.max_inquiry }}
				</template>
			</h3>			
		</v-flex>

		<v-flex>
			<v-btn> You have {{ baltkn }} BAL Tokens</v-btn>

			<v-btn color="primary">
				<a href="https://buyanylight.com/ieo#section-bal-token" style="color: white;" target="_blank">Buy BAL Tokens</a>
			</v-btn>

			<v-btn color="primary" @click="openReferralDialog=true">Referral Link</v-btn>
		</v-flex>
	</v-layout>

	<upgrade-account-dialog :openDialog.sync="openDialog"></upgrade-account-dialog>

	<referral-link-dialog :dialog.sync="openReferralDialog"></referral-link-dialog>
		
</div>
</template>

<script>

import UpgradeAccountDialog from "@/views/Components/App/Buyer/UpgradeAccountDialog";
import ReferralLinkDialog from "@/views/Components/App/Buyer/ReferralLinkDialog";
import inqMixin from "@/mixins/inquiry";
import inqEvntBs from "@/bus/inquiry"

export default {
mixins:[
	inqMixin,
],

components:{
	UpgradeAccountDialog,
	ReferralLinkDialog,
},


props:[	
],

data(){return{
	openDialog:false,
	
	openReferralDialog:false,
	
	
	'totalInqs': 0,
	'max_inquiry': 0,
	'paid': 0,
	'package_type': 'free',

	pckg: {},

	baltkn: 0

}},

created(){
	this.setMaxAndTotalInqs();	
	this.getBalTkns();	

	inqEvntBs.onFormSubmitted(()=>{
		this.setMaxAndTotalInqs();
	});
},


methods:{


	getBalTkns(){
		this.gettokens().then((rspns)=>{
			console.log(rspns);
			this.baltkn = rspns;
		})
	},

	setMaxAndTotalInqs(){
		this.getMaxInqs().then((rspns)=>{

			this.pckg = rspns;

			// this.max_inquiry = rspns.max_inquiry;
			// this.package_type = rspns.package_type;			
			this.getTotalInqs().then((rspns)=>{
				this.totalInqs = rspns;
			});
		});
	},

	setTotalInqs(){

	},
},

computed:{

	typeOfPackage(){
		var retVal = "FREE TRIAL";

		if(this.pckg.package_type=='monthly.mini')
		retVal = 'MINI / Monthly';
		else if(this.pckg.package_type=='yearly.mini')
		retVal = 'MINI / Yearly';

		else if(this.pckg.package_type=='monthly.standard')
		retVal = 'STANDARD / Monthly';
		else if(this.pckg.package_type=='yearly.standard')
		retVal = 'STANDARD / Yearly';

		else if(this.pckg.package_type=='monthly.premium')
		retVal = 'PREMIUM / Monthly';
		else if(this.pckg.package_type=='yearly.premium')
		retVal = 'PREMIUM / Yearly';

		return retVal;
	},


},

}
</script>

<style scoped lang="scss">
	
</style>