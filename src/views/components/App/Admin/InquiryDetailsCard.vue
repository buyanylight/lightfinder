<template>
  <div>
    <v-toolbar color="grey darken-4" class="white--text" height="60px">
      <v-toolbar-title class="font-weight-thin body-2">Inquiry Details</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-thin body-2"> Posted on: {{ getDateTime('mmm dd, yyyy hh:mm',inquiry.created_at) }}</v-toolbar-title>
    </v-toolbar>
    <v-card>


      <v-container>
     <!--    <v-layout row wrap pa-0 v-if="inquiry.stage_id == onVerification">
       <v-flex xs6>
         <v-btn @click="approvedInquiry(inquiry.id)" block class="green darken-1 font-weight-light ">
           <i class="fas fa-thumbs-up white--text"></i>
           <span class="ml-1 white--text font-weight-light ">Approved</span>
         </v-btn>
       </v-flex>
       <v-flex xs6>
         rejectInquiry(inquiry.id)
         <v-btn @click="rejectInquiry(inquiry.id)" block class="red darken-2 font-weight-light ">
           <i class="fas fa-thumbs-down white--text"></i>
           <span class="ml-1 white--text font-weight-light ">Reject</span>
         </v-btn>
       </v-flex>
     </v-layout> -->

	
        <v-layout row wrap>
          <v-flex xs12>

                        <v-layout row wrap>




	  							<v-flex xs12 v-if="inquiry.status">
									<inquiry-status-buttons 
									:status-id="inquiry.status" 
									:statuses="statuses">
									</inquiry-status-buttons>
									{{ inquiry.status }}
	  							</v-flex>

	  							<v-flex xs12>
								    <small class="blue-grey--text">Buyer Name</small>
								    <h4 class="font-weight-medium">
	                                  <p class="mb-0">{{ inquiry.buyer.first_name }} {{ inquiry.buyer.last_name }}</p>
	                                </h4>
								</v-flex>

                                <v-flex xs12 v-if="inquiryImages.length > 0">
                                    <!-- <h4 class="font-weight-medium">Image</h4> -->
                                    <!-- <v-flex xs10 offset-xs1> -->
                                         <image-gallery-small :images="inquiryImages" noThumbnails height="250px"></image-gallery-small> 
                                    <!-- </v-flex> -->
                                </v-flex>

                                <v-flex xs12>
                                    <!-- <small class="blue-grey--text">Details</small> -->
                                    <h4 class="font-weight-medium">Keywords </h4>
                                    <h4 class="font-weight-light">
                                      <p class="mb-0">{{ inquiry.keyword }}</p>
                                    </h4>
                                </v-flex>

                                <v-flex xs6>
                                    <h4 class="font-weight-medium">Category</h4>
                                    <h4 class="font-weight-light">
                                      <span style="text-transform:uppercase;">{{ inquiry.categories.join(', ') }}</span>
                                    </h4>
                                </v-flex>

                           
                                <v-flex xs6>
                                    <h4 class="font-weight-medium">Quantity</h4>
                                    <h4 class="font-weight-light">
                                    <span>{{ inquiry.quantity }} pcs</span>
                                  </h4>
                                </v-flex>

                                <v-flex xs12>
                                    <h4 class="font-weight-medium">Message </h4>
                                    <h4 class="font-weight-light">
                                      <p class="mb-0">{{ inquiry.message }}</p>
                                    </h4>
                                </v-flex>


                                <v-flex xs12>
                                        <v-layout row wrap>
                                            <!-- specification -->
                                            <v-flex xs12>
                                                <h4 class="font-weight-medium">Specifications</h4>
                                                <v-layout row wrap class="specifications">
                                                   
                                                     <span v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index"> 
                                                        <v-chip label dark outline text-color="black" v-if="specification.value" >
                                                               {{ specification.name }}: &nbsp;
                                                           <span class="font-weight-light">
                                                              {{ specification.value.split(',').join(', ') }}
                                                           </span>
                                                          </v-chip>
                                                      </span>
                                                    <v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="ma-4" outline>
                                                        No specifications..
                                                    </v-alert>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                         
                                 </v-flex>

                                <v-flex xs12 class="attachments">

                                    <h4 class="font-weight-medium">Attachments </h4>
                                    <div v-if="inquiryAttachments.length">

                                    <v-layout row wrap>
                                         <v-flex xs4 v-for="(attachment, index) in inquiryAttachments" :key="attachment+'_'+index">
                                                 <a target="_blank" :href="attachment.location">
                                                    <v-icon style="font-size: 80px !important;padding: 10px;" color="red" large>fas fa-file-pdf</v-icon>
                                                 </a>   
                                          </v-flex> 
                                    </v-layout>
                                      
                                    </div>
                                    
                                    <div v-else>
                                        <h4 class="red--text">No Attachment</h4>
                                    </div>

                                </v-flex>

                                    
                                <v-flex xs12 class="mb-10">
                                  <v-divider></v-divider>
                                </v-flex>
                                                    

                                    <v-flex xs12 v-show="inquiry.shipping_country_id">
                                        <small class="blue-grey--text">Mass Shipping Address</small>
                                        <h4 class="font-weight-medium">Shipping Address</h4>
                                        <h4 class="font-weight-light">
                                          <span>{{ getCountryName(inquiry.shipping_country_id) }} </span>
                                          <span>{{ inquiry.shipping_address }} </span>
                                          <span>{{ inquiry.shipping_city }} </span>
                                          <span>{{ inquiry.shipping_postal }} </span>
                                        </h4>
                                    </v-flex>

               
                                <v-flex xs12 class="mb-10">
                                  <v-divider></v-divider>
                                </v-flex>
                                           


                                    <v-flex xs12 v-show="inquiry.sample_quantity">
                                        <small class="blue-grey--text">Sample Order Information</small>
                                        <h4 class="font-weight-medium">Sample Orders Quantity </h4>
                                        <h4 class="font-weight-light">
                                        <span>{{ inquiry.sample_quantity }} </span>
                                       </h4>

                                       <h4 class="font-weight-medium mt-2"> Shipping Address</h4>
                                        <h4 class="font-weight-light">
                                           <span>{{ getCountryName(inquiry.sample_shipping_country_id) }} </span>
                                           <span>{{ inquiry.sample_shipping_address }}</span>
                                           <span>{{ inquiry.sample_shipping_city }} </span>
                                           <span>{{ inquiry.sample_shipping_postal }} </span>
                                        </h4>
                                    </v-flex>


               
                                <v-flex xs12 class="mb-10" v-show="inquiry.sample_quantity">
                                  <v-divider></v-divider>
                                </v-flex>
                                           


                                   <v-flex xs12 v-show="inquiry.oem">

                                        <small class="blue-grey--text">Original Equipment Manufacture</small>
                                        <h4 class="font-weight-medium">
                                           What kind of Original Equipment Manufacture ?
                                        </h4>
                                        <h4 class="font-weight-light">{{ inquiry.oem_service }}</h4>

                                        <h4 class="font-weight-medium mt-2">
                                           Description
                                        </h4>
                                        <h4 class="font-weight-light">{{ inquiry.oem_description }}</h4>
                                        
                                        <h4 class="mt-2">Files</h4>

                                          <v-layout row wrap v-if="inquiryOEM.length" class="attachments">
                                                        
                                                    <!-- display only here the attachment and images from thre inquiry -->
                                                    <v-flex xs4 lg4 v-for="(attachment, index) in inquiryOEM" :key="attachment+'_'+index">

                                                            <div v-if="attachment.filetype === 'image/jpeg' || attachment.filetype === 'image/png' ">

                                                               <a :href="attachment.location">

                                                                     <v-img
                                                                       :src="attachment.location"
                                                                       aspect-ratio="1"
                                                                       class="grey lighten-2"
                                                                       >
                                                                     </v-img>

                                                               </a>

                                                           </div>
                                                          
                                                           <!-- other file pdf -->
                                                          
                                                           <div v-else-if="attachment.filetype">
                                                             <a :href="attachment.location">
                                                                 <v-icon style="font-size: 80px !important;padding: 10px;" color="red" large>fas fa-file-pdf</v-icon>
                                                             </a>
                                                           </div>

                                                    </v-flex>
                                                    
                                              </v-layout>

                                              <v-layout v-else row wrap>
                                                <v-flex xs12>
                                                      <h4 class="red--text">No Files</h4>
                                                </v-flex>
                                              </v-layout>
                                   </v-flex>

               
                                <v-flex xs12 class="mb-10" v-show="inquiry.oem">
                                  <v-divider></v-divider>
                                </v-flex>
                                           
                        </v-layout>




         </v-flex>

        </v-layout>
      </v-container>
    </v-card>
    <message-box :CommentData="CommentData" :openMessageDialog.sync="openMessageDialog" :inquiry="inquiry"> </message-box>


	<!-- <confirm-payment-dialog v-if="bidToAward"></confirm-payment-dialog> -->

  </div>
</template>
<script>

// import helpers from "@/mixins/helpers"
import inqMixin from "@/mixins/inquiry"
import inqEvntBs from "@/bus/inquiry"
import MessageBox from '@/views/Components/App/Admin/MessageDialog'
import ImageGallerySmall from "@/views/Components/App/ImageGallery"
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";

import config from '@/config/index'

export default {

  	mixins: [
    	// helpers,
    	inqMixin,
  	],

    // 'inquiry',
    // 'isClosed'
  	components: {

    	MessageBox,
    	ImageGallerySmall,
		InquiryStatusButtons,
  	},


	props: {
	    
	    inquiry: {
	      type: Object
	    },


	    isClosed: {
	      type: Boolean
	    }      

	},

	data: () => ({

	    onVerification: 1001,
	    openMessageDialog: false,
	    CommentData: [],

	    inquiryImages:[],
	    inquiryAttachments:[],
	    inquiryOEM:[],


	}),



  	methods: {

	    getCountryName(country_id) {

	          var countryselect = this.countries.filter(country => {
	              return country.id == country_id;
	          });

	          return (countryselect.length)?countryselect[0].name:null;
	    },

	    // if query selected is set to true
	    openMessageBox(inquiry_id) {

	      this.$store.dispatch('admnInq/approvedInquiry_a', {
	          inquiry_id: inquiry_id
	        })
	        .then((response) => {

	          // create a event bus 
	          // this.$emit('update:isClosed', true);
	             this.hideInquiry();

	          // inqEvntBs.emitApproved();

	        })
	        .catch((e) => {
	          console.log(e);
	          // this.$emit('update:isClosed', true);
	             this.hideInquiry();


	        })
	        .finally(() => {
	          // this.$emit('update:isClosed', true);
	            this.hideInquiry();

	        });
	    },

	    rejectInquiry(inquiry_id) {

	      this.$store.dispatch('admnInq/declinedInquiry_a', {
	          inquiry_id: inquiry_id
	        })
	        .then((response) => {
	          // create a event bus 
	          // this.$emit('update:isClosed', true);
	             this.hideInquiry();


	          // inqEvntBs.emitApproved();
	        })
	        .catch((e) => {
	          // this.$emit('update:isClosed', true);
	             this.hideInquiry();

	          console.log(e);
	        })
	        .finally(() => {

	        });
	    },


	    SortAttachments() {


	    	// console.log('aslllllllllllllllllllllllllllllllllllllllllllllllllllllll');
	    	// console.log(this.inquiry.attachments);

	            var attachmentHolder = this.inquiry.attachments;

	            this.inquiryImages = []
	            this.inquiryAttachments = []
	            this.inquiryOEM = []

	            if(attachmentHolder) {

	            	 for (var i = attachmentHolder.length - 1; i >= 0; i--) {

	            	 
	                    switch (attachmentHolder[i].filegroup) {

	                          case 'add-inquiry-oems':

	                                this.inquiryOEM.push(attachmentHolder[i])

	                          break;

	                          case 'add-inquiry-attachments':

	                                this.inquiryAttachments.push(attachmentHolder[i])

	                          break;

	                          case 'add-inquiry-images':

	                                this.inquiryImages.push(attachmentHolder[i])
	                              
	                          break;
	            
	                    }
	                }

	            }
	               
	    },
  
  	},


  	watch: {
        inquiry: {

            handler(nVal, oVal) {
	            if(nVal) 
                 this.SortAttachments();
            },
            deep: true,
        },
   	},



    computed: {

      countries(){
          return config.countries;
      },

      statuses(){
			return this.$route.meta.statuses;
      },

  },


  created() {
            // console.log(this.inquiry);
             this.SortAttachments();    
    },

}

</script>
<style scoped lang="scss">
.specifications {
  .v-chip {
    width: 220px;
  }
}

.attachments {
  .v-icon {
    width: 50px;
    margin-right: 15px;
    margin-top: 15px;
    font-size: 60px !important;
    cursor: pointer;
  }
}

</style>
