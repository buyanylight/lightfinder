<template>
  <div class="text-xs-center">
    <v-dialog :value="openQuoteDialog" @input="$emit('update:openQuoteDialog', false)" @keydown.escape="keyPress" width="80%" scrollable>
      <v-card id="QuoteDialog">
        
        <!--   <v-card-title class="black white--text" height="20px">
          <h3 class="font-weight-light">{{ quoteAction }} Quote</h3>
        </v-card-title> -->

        <!-- #69779b blue-grey darken-4 -->
        <v-toolbar card color="grey darken-4" dark >
          <v-toolbar-title> <span class="font-weight-bold">Add Quotation</span> </v-toolbar-title>
          <v-spacer></v-spacer>
          <h2 class="font-weight-bold">INQUIRY # <span class="font-weight-thin">{{ inquiry.id }}</span> </h2>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="max-height: 100%;">
          <!-- 
            <v-flex xs12 mb-3>
                  <h2 class="font-weight-bold">INQUIRY # <span class="font-weight-thin">{{ inquiry.id }}</span> </h2>
                   <v-divider></v-divider>
              </v-flex> 
          -->
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="formData">
            <v-layout row wrap>
              <v-flex xs4 mr-5>

              <v-container class="pt-2">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-layout row wrap>
                        <v-flex xs12 mr-4 mb-3>
                          <h5 class="font-weight-thin">Keywords </h5>

                          <h4 class="font-weight-bold">
                            <p class="mb-0">{{ inquiry.keyword }}</p>
                          </h4>
                        </v-flex>

                        <v-flex xs12 mr-4 mb-3>
                          <h5 class="font-weight-thin">Category</h5>
                          <h4 class="font-weight-bold">
                            <span style="text-transform:uppercase;">{{ inquiry.categories.join(', ') }}</span>
                          </h4>
                        </v-flex>

                        <v-flex xs12 mr-4 mb-3>
                          <h5 class="font-weight-thin">Quantity</h5>
                          <h4 class="font-weight-bold">
                            <span>{{ inquiry.quantity }} pcs</span>
                          </h4>
                        </v-flex>

                         <!-- shipping address -->
                            
                            <v-flex mr-4 mb-3 xs12 v-show="inquiry.shipping_country_id">
                                <h5 class="font-weight-thin">Shipping Address</h5>
                                <h4 class="font-weight-bold">
                                  <span>{{ inquiry.shipping_country_id }} </span>
                                  <span>{{ inquiry.shipping_address }} </span>
                                  <span>{{ inquiry.shipping_city }} </span>
                                  <span>{{ inquiry.shipping_postal }} </span>
                                </h4>
                            </v-flex>

                         <!-- shipping address -->
      
                        <!-- sample orders -->
                              <v-flex mr-4 mb-3 xs6 v-show="inquiry.sample_quantity">
                                  <h5 class="font-weight-thin">Sample Orders Quantity</h5>
                                  <h4 class="font-weight-bold">
                                  <span>{{ inquiry.sample_quantity }} </span>
                                 </h4>

                                 <h5 class="font-weight-thin">Sample Order Shipping Address</h5>
                                  <small></small>
                                  <h4 class="font-weight-bold">
                                     <span>{{ inquiry.sample_shipping_country_id }} </span>
                                     <span>{{ inquiry.sample_shipping_address }}</span>
                                  </h4>
                                  <h4>
                                     <span>{{ inquiry.sample_shipping_city }} </span>
                                     <span>{{ inquiry.sample_shipping_postal }} </span>
                                  </h4>
                              </v-flex>
                        <!-- sample orders -->

                        <!-- oem -->
                             <v-flex mr-4 mb-3 xs6 v-show="inquiry.oem">
                                  <h5 class="font-weight-thin">Original Equipment Manufacture</h5>
                                  <h4 class="font-weight-bold">
                                     What kind of Original Equipment Manufacture
                                  </h4>
                                  <h5>{{ inquiry.oem_service }}</h5>
                                  <h4 class="font-weight-bold">
                                     Description
                                  </h4>
                                  <h5>{{ inquiry.oem_description }}</h5>
                              </v-flex>
                        <!-- oem -->

                        <v-flex xs12 mr-4 mb-3>
                          <h5 class="font-weight-thin">Message </h5>
                          <h4 class="font-weight-bold">
                            <p class="mb-0">{{ inquiry.message }}</p>
                          </h4>
                        </v-flex>
                        <v-flex xs12 mr-4 mb-3 class="attachments">
                          <h5 class="font-weight-thin">Attachments </h5>
                          <v-icon large>far fa-file-excel</v-icon>
                          <v-icon large>far fa-file-archive</v-icon>
                        </v-flex>

                        <v-flex xs12>
                          <h5 class="font-weight-thin">Specifications</h5>
                          <v-layout row wrap class="specifications">
                   
                             <span v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index"> 
                                    <v-chip label dark outline text-color="black" v-if="specification.value" >
                                           {{ specification.name }}: &nbsp;
                                       <span class="font-weight-bold">
                                          {{ specification.value.split(',').join(', ') }}
                                       </span>
                                      </v-chip>
                                  </span>

                            <v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="mt-4 ml-0" outline>
                              No specifications..
                            </v-alert>

                          </v-layout>
                        </v-flex>


                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
              <!--  -->
              
              <v-layout pa-0>
                 <v-divider vertical></v-divider>
            </v-layout>






























			<!-- BID form -->
			<!-- //////////////////////////////////////////////// -->
			<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->
			<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->
              <v-flex xs7 pa-2 mr-4>
                <h4>Product Details</h4>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-layout row wrap>

                      <v-flex xs12>
                      	<v-tooltip bottom>
                      	<template #activator="{on}">                      		
	                        <!-- change to product code  -->
	                        <v-text-field 
	                        v-on="on"
	                        label="Product Code" 
	                        v-model="formData.product_name">
	                        </v-text-field>
                      	</template>                      	  
                        <span>This code will be used as reference for you and will not be displayed anywhere to the buyer.</span>
                      	</v-tooltip>
                      </v-flex>

                      <!--    <v-flex xs12>
                        <v-textarea label="Product Details" v-model="formData.description">
                        </v-textarea>
                      </v-flex> -->

                      <v-flex xs4 pr-5>
                        <v-text-field 
                        label="Quantity" 
                        placeholder="0" 
                        readonly 
                        :value="inquiry.quantity" 
                        style="color: #000;" 
                        suffix="pcs">
                        </v-text-field>
                      </v-flex>


                      <v-flex xs4 pr-3>
                        <v-text-field 
                        label="Unit Prices" 
                        v-model="formData.price" 
                        :error-messages="fieldErrors('formData.price')" 
                        @blur="$v.formData.price.$touch()" 
                        placeholder="0.00" 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        prefix="$"
                        persistent-hint
                        :hint="'Desired Unit Price: $ '+currency(inquiry.desired_unit_price)">
                        </v-text-field>
                      </v-flex>

                      <v-flex xs4 pr-3>
                        <v-text-field 
                        label="Total Prices" 
                        v-model="formData.total_price" 
                        placeholder="0.00" 
                        :error-messages="fieldErrors('formData.total_price')" 
                        @blur="$v.formData.total_price.$touch()" 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        prefix="$"
                        persistent-hint
                        :hint="'Desired Total Price: $ '+currency(inquiry.desired_price)">
                        </v-text-field>
                      </v-flex>	
                      


                       	<!-- sample details  -->
                       	<!-- //////////////////////////////////////////////////////// -->
                      	<v-flex mt-3 v-if="inquiry.sample_quantity">
                        <v-layout row wrap mt-3 mb-3>

                                <h4 class="mb-2">
                                	Product Sample Details <span style="font-weight: normal;">({{ inquiry.sample_quantity }} pc/s required)</span>
                                </h4>&nbsp;&nbsp;
                                <!-- <small v-show="is_sample	">Note: for the developer this is required when the buyer put sample details on the inquiry: to be delete later</small> -->
                                <v-flex xs12 v-if="inquiry.sample_quantity">
                                  <v-layout row wrap>

                                    <v-flex xs5 mr-5>
                                      <v-text-field 
                                      label="Sample Cost" 
                                      :error-messages="fieldErrors('formData.sample_cost')" 
                                      @blur="$v.formData.sample_cost.$touch()" 
                                      v-model="formData.sample_cost" 
                                      style="color: #000;" 
                                      prefix="$" 
                                      suffix="USD">
                                      ></v-text-field>
                                    </v-flex>

                                    <v-flex xs5 ml-3>
                                      <v-text-field label="Sample Shipment Cost"  :error-messages="fieldErrors('formData.sample_shipment_cost')" @blur="$v.formData.sample_shipment_cost.$touch()" prefix="$" suffix="USD" v-model="formData.sample_shipment_cost" style="color: #000;"> </v-text-field>
                                    </v-flex>
                                  </v-layout>
                              </v-flex>
                        </v-layout>
                      	</v-flex>
                       	<!-- //////////////////////////////////////////////////////// -->
                       	<!-- sample details  -->


		
                      <v-flex xs12 pa-1 v-if="formData.attachments && formData.attachments.length > 0">
                      	<v-layout row wrap>
                      		<v-flex xs4 v-for="(file, i) in formData.attachments" :key="'image'+i">
                    		   <div class="image-area">
									  <img :src="file.location" alt="Preview">
									  <a class="remove-image" @click="removeFile(file)" style="display: inline;">&#215;</a>
								</div>
                        	</v-flex>  
                      	</v-layout>
                        
                      </v-flex>

                      <v-flex xs12>
                         <h4 class="font-weight-thin">Images </h4>
                        <!-- IMAGE QUOTE DROPZONE  -->
                              <vue-dropzone 
                                  id="dropzone_oem" 
                                  ref="dropzone_oem" 
                                  :options="dropzoneOptions" 
                                  :useCustomSlot="useCustomSlot"
                                  :awss3="getAWSS3('images')"
                                  @vdropzone-success="vdz_success($event,'add-quote-images')"
                                  >
                                <div class="dropzone-custom-content">
                                  <h3 class="dropzone-custom-title">Drag and drop to upload Images</h3>
                                  <div class="subtitle">...or click to select a file from your computer</div>
                                </div>
                              </vue-dropzone>
                          <!-- IMAGE QUOTE DROPZONE  -->
                      </v-flex>


                      <!-- specification -->
                        <v-flex xs12  v-show="inquiry.specifications.length">
                          <v-layout row wrap justify-center>

                            <v-layout row wrap mt-3>
                                <v-flex xs2>
                                    <v-layout row column>
                                        <v-flex  lg4 md4 xs4 sm3>
                                            <h4 class="text-xs-left ml-0 mt-2">
                                                Specifications
                                            </h4>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3 v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index">
                                            <h4 color="#504f4fde" 
                                            class="text-xs-left font-weight-light ml-0 mt-3">
                                                {{ specification.name }}:
                                            </h4>&nbsp;
                                        </v-flex> 
                                    </v-layout>
                                </v-flex>

                           

                                <v-flex xs5>                                  
                                    <v-layout row column>
                                        <v-flex  lg4 md4 xs4 sm3 >
                                            <h4 class="text-xs-left ml-4 mt-2">
                                                &nbsp;
                                            </h4>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3 >
                                            <v-text-field solo flat class="ml-4 mt-2  border-textfield" v-model="formData.power"  suffix="watts"></v-text-field>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3>
                                           <v-text-field solo flat class="ml-4 mt-2  border-textfield" v-model="formData.lumen" suffix="lm"></v-text-field>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3>
                                           <v-text-field solo flat class="ml-4 mt-2  border-textfield"  v-model="formData.efficiency = getEfficiency()"  suffix="lm/w"></v-text-field>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3>
                                            <v-text-field solo flat class="ml-4 mt-2  border-textfield" v-model="formData.beam_angle"  suffix="degrees"></v-text-field>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3>
                                          <v-text-field solo flat class="ml-4 mt-2  border-textfield" v-model="formData.cct" suffix="lm"></v-text-field>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3>
                                          <v-text-field solo flat class="ml-4 mt-2  border-textfield" v-model="formData.ip" ></v-text-field>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3>
                                          <v-text-field solo flat class="ml-4 mt-2  border-textfield" v-model="formData.finish" ></v-text-field>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3>
                                          <v-text-field solo flat class="ml-4 mt-2  border-textfield" v-model="formData.size" ></v-text-field>
                                        </v-flex>

                                        <v-flex  lg4 md4 xs4 sm3>
                                          <v-text-field solo flat class="ml-4 mt-2  border-textfield" v-model="formData.dimmable" ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>


                                <!-- ----------------------------------------- -->

                                <v-flex xs5>
                                    <v-layout row column>          

                                        <v-flex lg4 md4 xs4 sm3>
                                            <h4 class="text-xs-left ml-2 mt-2">
                                                <!-- Inquiry Specifications -->&nbsp;
                                            </h4>
                                        </v-flex>

                                        <v-flex 
                                        lg4 md4 xs4 sm3
                                        v-for="(specification, index) in inquiry.specifications" 
                                        :key="specification+'_'+index">
                                            <v-text-field 
                                            readonly solo flat 
                                            class="ml-2 mt-2 border-textfieldb"                                             
                                            :value="specification.value ? specification.value : '' "  
                                            :suffix="getSuffix(specification.name)"></v-text-field>
                                        </v-flex>

                                    </v-layout>                                 
                                </v-flex>
                              
                            </v-layout>
                              

                         

                          </v-layout>
                        </v-flex>



                      <v-flex xs12>
                        <v-textarea label="Message" placeholder="Enter Remarks Here" v-model="formData.remarks">
                        </v-textarea>
                      </v-flex>
                    <!--   <v-flex xs12>
                      <h4 class="font-weight-thin mt-3 mb-2">Attachments </h4>
                    
                      <upload-file></upload-file>
                      <vue-dropzone 
                      id="dropzone_attachments" 
                      :options="dropzoneOptions" 
                      :useCustomSlot="useCustomSlot"
                      :awss3="getAWSS3('attachments')"
                      @vdropzone-success="vdz_success($event,'add-quote-attachments')">
                          <div class="dropzone-custom-content">
                              <h3 class="dropzone-custom-title">Drag and drop to upload files</h3>
                              <div class="subtitle">...or click to select a file from your computer</div>
                          </div>
                      </vue-dropzone>
                    
                    </v-flex> -->
                    </v-layout>

                  </v-flex>
                </v-layout>
              </v-flex>
			<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->
			<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->
			<!-- //////////////////////////////////////////////// -->
			<!-- BID form -->












































            </v-layout>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="">
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="loading" @click="submitForm()"> Submit </v-btn>


            <!-- <v-btn 
            @click="triggerTestEvent()">
                Trigger Create Inquiry Event
            </v-btn> -->

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import config from '@/config/index'

// import helpers from "@/mixins/helpers";
import UploadFile from "@/views/Components/App/UploadFile";
import inqEvntBs from "@/bus/inquiry";

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import { required, email, maxLength, requiredIf, requiredUnless } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

export default {
mixins: [
  // helpers,
  validationMixin
],


validations: {

  formData: {
    price: { required },
    total_price: { required },

    sample_cost: {

        required: requiredIf(function() {
       
          if (this.is_sample) {
            return true;
          }

        })
        
      },

       sample_shipment_cost: {

        required: requiredIf(function() {
       
          if (this.is_sample) {
            return true;
          }

        })
        
      },


  }

},

validationMessages: {
  formData: {
    
    price: { required: 'Please enter a price.' },
    total_price: { required: 'Please enter a total price.' },
    sample_cost: { required: 'Please enter a sample cost' },
    sample_shipment_cost: { required: 'Please enter a sample shipment cost' },

  }
},


components: {
  UploadFile,
  vueDropzone: vue2Dropzone
},

props: {

  openQuoteDialog: {
    type: Boolean,
    default: false,
  },

  inquiry: {
    type: Object,
  },

  bid: {
    type: Object,
  },

  editQuote: {
    type: Boolean,
  },

},



data() { return {
    loading: false,

    formData: {
        // price: 11.11,
        // total_price: 7777.56,
        // product_name: "Super LED Industrial",
        // remarks: "Nice light",
        // description: "Last multiple years!",
        price: null,
        total_price: null,
        product_name: null,
        remarks: null,
        description: null,

        sample_cost:null,
        sample_shipment_cost:null,

        lumen:null,
        power:null,
        efficiency:null,
        beam_angle: null,
        cct: null,
         ip: null,
        finish: null,
        size: null,
        dimmable: null,
        attachments: [],

    },

    is_sample:false, 
    quoteAction: "Add",

    initBid: {

        price: null,
        total_price: null,
        product_name: null,
        remarks: null,
        description: null,

        sample_cost:null,
        sample_shipment_cost:null,

        lumen:null,
        power:null,
        efficiency:null,
        beam_angle: null,
        cct: null,
         ip: null,
        finish: null,
        size: null,
        dimmable: null,
        attachments: [],

},


    // Dropzone
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd

    useCustomSlot: true,
    dropzoneOptions: {
        url: config.main.awss3.urls.inquiry,
        thumbnailWidth: 200,
        maxFilesize: 50,
        headers: {},
        addRemoveLinks: true,            
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
    },


    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone



}},



methods: {

    submitForm() {

        var formData = {

          "price": this.formData.price,
          "total_price": this.formData.total_price,
          "product_name": this.formData.product_name,
          "remarks": this.formData.remarks,
          "description": 'test data',
          
          "specifications": {
                power: this.formData.power,
                lumen: this.formData.lumen,
                efficiency:  this.formData.efficiency,
                beam_angle:  this.formData.beam_angle,
                cct: this.formData.cct,
                ip: this.formData.ip,
                finish:  this.formData.finish,
                size: this.formData.size,
                dimmable: this.formData.dimmable,
          },

          "attachments": this.formData.attachments,
          "sample_cost": this.formData.sample_cost ? this.formData.sample_cost : null,
          "sample_shipment_cost": this.formData.sample_shipment_cost ? this.formData.sample_shipment_cost : null
        };

        var action = "";
        var data = {};

        if (this.editQuote) {

          action = 'spplrInq/editInquiryBid_a';
          data = {
            formData: formData,
            inq_id: this.inquiry.id,
            bid_ref: this.bid.reference,
          }

        } else {
          action = 'spplrInq/addInquiryBid_a';
          data = {
            formData: formData,
            inq_id: this.inquiry.id,
          }
        }

        if (this.$v.$invalid) {
             this.$v.$touch()
        } else {
          	this.loading = true;
            this.$store.dispatch(action, data)
              .then((response) => {
                  this.loading = false;
                  this.$emit('update:openQuoteDialog', false);
              }).catch((e) => {
                  this.loading = false;
                  console.log('Error: ' + e);
                  // alert("ERROR!!");
              }).finally(() => {
                  this.loading = false;
              });

        }

        // alert("action = "+action);
        // alert("this.editQuote = "+this.editQuote);
        // alert("this.inquiry.id = "+this.inquiry.id);
        // alert("this.bid.reference = "+this.bid.reference); 
    },
    
    // resetForm() {
    //     this.formData = this.initBid;
    // },

    keyPress(e) {

      if (e.target.querySelector("#QuoteDialog"))
          this.$emit('update:openQuoteDialog', false)
          // console.log(e.target);
    },


    triggerTestEvent() {

        // this.$socket.emit('supplierNewQuoteCreated', {inq_id:this.inquiry.id});        

    },

    getSpefications(key) {

         var specsValue = null;

         if(this.bid.specifications.length > 0) {
               let objectHolder = this.bid.specifications.find( specifications => specifications.name === key)
              specsValue = objectHolder.value
         }

         return specsValue;

    },

    /* get specifications suffix */
    getSuffix(key) {

      var suffix = '';
      
        if(key.toLowerCase() == 'power') {
           suffix = 'watts'
        } else if(key.toLowerCase() == 'lumen' || key.toLowerCase() == 'cct') {
          suffix = 'lm'
        } else if(key.toLowerCase() == 'efficiency') {
          suffix = 'lm/w'          
        } else if(key.toLowerCase() == 'beam angle') {
          suffix = 'degrees';
        }

      return suffix;

    },

    getEfficiency() {
      var result = 0;

      if(this.formData.lumen || this.formData.power)
        result = this.formData.lumen / this.formData.power
        this.formData.efficiency = result.toFixed(2)
        

      return result.toFixed(2)

    },

      // clear existing object
    clearData() {

        // for (const prop of Object.keys(this.formData)) {
        //     delete this.formData[prop];
        // }

        this.formData = {
	        price: null,
	        total_price: null,
	        product_name: null,
	        remarks: null,
	        description: null,

	        sample_cost:null,
	        sample_shipment_cost:null,

	        lumen:null,
	        power:null,
	        efficiency:null,
	        beam_angle: null,
	        cct: null,
	         ip: null,
	        finish: null,
	        size: null,
	        dimmable: null,
	        attachments: [],
        };
        this.$refs.dropzone_oem.removeAllFiles();

    },

    fillFormData() {

          console.log('bid  xxxxxxxxxxxxxx',this.bid);
          console.log('formData  xxxxxxxxxxxxxx',this.formData);

          
          this.formData.total_price = this.bid.total_price;
          this.formData.price = this.bid.price;
          this.formData.product_name = this.bid.product_name;
          this.formData.remarks = this.bid.remarks;
          this.formData.description = this.bid.description;
          this.formData.sample_cost = this.bid.sample_cost;
          this.formData.sample_shipment_cost = this.bid.sample_shipment_cost;

          this.formData.lumen = this.getSpefications('Lumen');
          this.formData.power = this.getSpefications('Power');
          this.formData.efficiency = this.getSpefications('Efficiency');
          this.formData.beam_angle = this.getSpefications('Beam Angle');
          this.formData.cct = this.getSpefications('CCT');
          this.formData.ip = this.getSpefications('IP');
          this.formData.finish = this.getSpefications('Finish');
          this.formData.size = this.getSpefications('Size');
          this.formData.dimmable = this.getSpefications('Dimmable');

          this.formData.attachments = this.bid.attachments;
          

    },


    removeFile(file) {

		this.formData.attachments = this.formData.attachments.filter(function(attachments){
		    return attachments != file;
		});

    },


   pushImage(file) {
   		this.formData.attachments.push(file);
   },





    // Dropzone
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    getAWSS3(upload_group){

        var awss3 =  {
            signingURL: config.main.awss3.signingURL,
            headers: {
                token:localStorage.access_token,
            },
            params : { 
                action: upload_group, 
                inquiry_id: this.inquiry.id,
            },
            sendFileToServer : true,
            withCredentials: false
        };

        return awss3;
    },

    vdz_s3UploadSuccess: function(s3ObjectLocation){
        // console.log("vdz_s3UploadSuccess",s3ObjectLocation);
        // console.log();
    },

    vdz_success(file, upload_group){

        console.log("vdz_success file = ",file);
        console.log("vdz_success upload_group = ",upload_group);

        if(file.status=='success') {


            var attachment = {
                location: file.s3ObjectLocation,
                filename: file.name,
                filetype: file.type,
                filegroup: upload_group,
                filesize: _.round((file.size/1000), 2),
            };


            console.log('attachment',attachment);
            // this.formData.attachments.push(attachment);
            // this.formData.attachments.concat(attachment);
            this.pushImage(attachment)
        }

        // if(upload_group=='attachments')    
        // action = "add-inquiry-attachments";
        // else if(upload_group=='images')
        // action = "add-inquiry-images";
        // else
        // action = "add-inquiry-attachments";



        // this.formData.attachments.push({

        // });

    },
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone

},



mounted() {

},


watch: {

    editQuote(nVal, oVal) {

        // if (nVal) {
        //     this.quoteAction = "Edit";
        //     this.clearData();
        //     this.$v.$reset();
        //     this.fillFormData();
        //   	console.log('this.formData.price',this.formData.price)
        //   	console.log('-edit-')
        // } else {
        //     this.quoteAction = "Add";
        //     this.formData = this.initBid;
        //     this.$v.$reset();
        //     this.clearData();
        //     console.log('-add-')
        // }

    },

    // when openQuoteDialog set as false, editQuote will be set to false also
    openQuoteDialog(nVal, oVal) {
        if (!nVal)
        this.$emit('update:editQuote', false);


        if (this.editQuote) {
            this.quoteAction = "Edit";
            this.clearData();
            this.$v.$reset();
            this.fillFormData();
          	// console.log('-edit-')
        } else {
            // this.formData = this.initBid;
            this.quoteAction = "Add";
            this.clearData();
            this.$v.$reset();
            // console.log('-add-')
        }

    },

    // check if inquiry has required to put sample cost
    // inquiry: {

	   //  handler(nVal, oVal) {

	   //  	console.log('nVal',nVal);
	   //  	console.log('nVal.sample_quantity',nVal.sample_quantity);
	   //  	console.log('this.inquiry.sample_quantity',this.inquiry.sample_quantity);
	   //      // check if sample cost && and sample shipment cost is 
	   //      if(nVal.sample_quantity > 0) {
	   //      	this.is_sample = true
	   //      } else {
	   //      	this.is_sample = false
	   //      }
	   //  },
	   //  deep: true,
    // },


    'formData.price': {
    	handler(nVal,oVal){
	    	console.log('formData.price nVal',nVal);
	    	if(nVal) {
	    		console.log('GOOOO',this.formData.quantity);
	    		this.formData.total_price = this.currency(parseFloat(this.inquiry.quantity) * parseFloat(nVal));
	    	}
	    	// this.$v.formData.total_price.$touch();
		},

		deep: true,
	},


    	

    'formData.total_price': {    	
		handler(nVal,oVal){
			console.log('formData.total_price nVal',nVal);
		},
		deep: true,
    }

},


}

</script>

<style scoped lang="scss">

.border-textfield /deep/ .v-input__slot {
  border: 1px solid black;
  margin-bottom: -17px;
}

.border-textfieldb /deep/ {
    
    input {
        text-align: right;
        font-weight:bold;
    }
    
    .v-input__slot {
      border: 1px solid transparent;
      margin-bottom: -17px;
    }

    .v-text-field__suffix {
        font-size: 85%;
    }

}




.dropzone-custom-content {
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

.specifications {
  .v-chip {
    width: 210px;
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


.image-area {
  position: relative;
  width: 50%;
  // background: #333;
}
.image-area img{
  max-width: 100%;
  height: auto;
}
.remove-image {
display: none;
position: absolute;
    top: -4px;
    right: -30px;
border-radius: 10em;
padding: 2px 6px 3px;
text-decoration: none;
font: 700 21px/20px sans-serif;
background: #555;
border: 3px solid #fff;
color: #FFF;
box-shadow: 0 2px 6px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3);
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  -webkit-transition: background 0.5s;
  transition: background 0.5s;
}
.remove-image:hover {
 background: #E54E4E;
  padding: 3px 7px 5px;
     top: -4px;
    right: -30px;
}
.remove-image:active {
 background: #E54E4E;
    top: -4px;
    right: -30px;
}

</style>
