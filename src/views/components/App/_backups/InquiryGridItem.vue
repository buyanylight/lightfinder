<template>

		
		<v-flex xs12 >
			
			<v-card 
			class="pa-3 mx-2 my-3 tiItem"             
			:hover="true"  
			@click="viewInquiry(inquiry)">

				<v-layout row wrap>
					
					<slot name="details" :inquiry="inquiry" :statuses="statuses">
						<v-flex xs6 mt-2>
							<h3 class="grey--text lighten-4">Inquiry</h3>
							<h4 class="mt-0 font-weight-medium ">#{{ inquiry.inq_id }}</h4>
						</v-flex>

						<v-flex xs6 mt-2>
							<h3 class="grey--text">Date</h3>
							<h4 class="mt-0 font-weight-medium ">{{  getDateTime('mmm dd, yyyy hh:mm', inquiry.created_at ) }}</h4>
						</v-flex>
					</slot>
				</v-layout>


				<v-layout row wrap>
					<v-flex xs6 mt-2>
						<h3 class="grey--text lighten-4">Quantity</h3>
						<h4 class="mt-0  font-weight-medium ">{{ inquiry.quantity }} pcs</h4>
					</v-flex>
					
					<v-flex xs6 mt-2>
						<h3 class="grey--text lighten-4">Status</h3>

						<slot name="status" :inquiry="inquiry" :statuses="statuses">
							<inquiry-status-buttons 
							:status-id="inquiry.status" 
							:statuses="statuses">
							</inquiry-status-buttons>							
						</slot>

					</v-flex>
				</v-layout>

				<v-layout row wrap>
					<v-flex xs12 mt-2>
						<h3 class="mt-0 font-weight-medium black--text lighten-4">{{ inquiry.categories }}</h3>
					</v-flex>

					<v-flex xs12 mt-1>
						<!-- <h4 class="font-weight-medium black--text lighten-4">Details</h4> -->
						<h5 class="mt-0 black--text font-weight-light tnt-height" :title="inquiry.message">
							{{ inquiry.message.length > 120 ?  inquiry.message.substring(0,120) + '...' : inquiry.message   }}
						</h5>
					</v-flex>
				</v-layout>

				<v-layout row wrap>
					<v-flex xs12  mt-1 class="text-xs-center">
						<v-btn 
						block small 
						@click="viewInquiry(inquiry)" 
						:loading="loading" 
						class=" v-btn--active blue-grey darken-2 font-weight-light text-decoration-none">
							<i class="fas fa-eye white--text"></i>
							<span class="ml-1 white--text font-weight-light ">Manage</span>
						</v-btn>

					</v-flex>
				</v-layout>

			</v-card>

		</v-flex>			
	
</template>

<script>
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";
// import helpers from "@/mixins/helpers";
import inqMixin from "@/mixins/inquiry";

export default {

	mixins: [
		// helpers,
		inqMixin,
	],

	components: {
		InquiryStatusButtons,
	},

	props:[
		'inquiry',
		'statuses',
	],

	data: function(){return{
		loading: false,
	}},


	methods: {

		viewInquiry(inq) {
			this.loading = true;
			this.showInquiry(inq.inq_id)
			.then((data)=>{
				this.loading = false;				
			});

		},		
	},


};

</script>




<style scoped lang="scss">
.tnt-height {
	height: 35px;
	overflow: hidden;
}	
</style>