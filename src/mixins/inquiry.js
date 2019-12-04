import config from '@/config/main';

// const defaultMaxInqs = config.defaultMaxInqs;

export default {
	
	methods:{

		gettokens(){
			return new Promise((resolve, reject) => {
				this.$store.dispatch(this.getStore()+'/getBalTokens_a')
				.then((rspns)=>{
					resolve(rspns);
					console.log(rspns);
				}).catch((e)=>{
					console.log(e);
					reject(e);
				});	
			})
		},

		getMaxInqs(){
			return new Promise((resolve,reject)=>{
				this.$store.dispatch(this.getStore()+'/getActiveSubscription_a')
				.then((rspns)=>{
					console.log('setMaxInqs rspns',rspns);
					var retVal = {
						max_inquiry: 0,
						package_type: 0,
					};
					if(rspns && rspns.paid) { // paid should be 1
						retVal.max_inquiry = rspns.inclusions.max_inquiry;
						retVal.package_type = rspns.package_type;
					}
					else if(rspns && !rspns.paid) { // if Bank Transfer and still confirming						
						retVal.max_inquiry = this.defaultMaxInqs;
						retVal.package_type = rspns.package_type;
						retVal.bankTransferStatus = 'confirming';
					}
					else {
						// if no / free subscription
						retVal.max_inquiry = this.defaultMaxInqs;
						retVal.package_type = 'free';
					}

					resolve(retVal);
				})
				.catch((e)=>{
					console.log(e);
					reject(e);
				});		
			});
		},

		getTotalInqs(){
			return new Promise((resolve, reject) => {
				this.$store.dispatch(this.getStore()+'/getInquiries_a')
				.then((rspns)=>{
					// console.log('Inquiries ',rspns);
					var retVal = 0;

					if(rspns.length)
					retVal = rspns.length;

					resolve(retVal);
				})
				.catch((e)=>{
					console.log(e);
					reject(e);
				});
			});
		},


		showInquiry(inq_id) {
			return new Promise((resolve, reject) => {
				var storeType = this.$route.meta.storeType.inq;            
				this.$store.dispatch(storeType+'/getInquiry_a', {
					inq_id: inq_id
				})
				.then((data) => {
					// console.log('data',data);

					if(data.bids){
						var awarded_bid_id = data.id+'-'+data.awarded_bid_id
						var bid = data.bids.filter(function(item) {
							return (item.id==awarded_bid_id)?true:false;
						});
						data.amount = (bid.length)?bid[0].total_price:0.0;
					} else 
					data.amount = 0.0;


					this.stateInquiry = data;
					this.openInquiry = true;
		  			resolve(data);
				})
				.catch((error) => { 
					console.log(error);
		  			reject(error);
				});
			});
		},		

		hideInquiry() {
			this.openInquiry = false;
		},

		setDataTableInquiry(inquiries){

			// var sttss = this.$route.meta.statuses;
			var sttss = [
				...config.inquiry_statuses.default,
				...config.inquiry_statuses.buyers,
				...config.inquiry_statuses.suppliers,
			];

			// console.log(sttss);

			var retVal = inquiries.map((inquiry)=>{

				var amount = 0.0;
				var price = 0.0;
				
				// console.log('bids ',bids[0]);

				var bids = [];
				var bid_stages = [];
				var bid_sample_stages_string = [];
				if(inquiry.bids && inquiry.bids.length) {

					// amount and price only for bids that are awarded
					///////////////////////////////////////////////////////////
					var bids_awarded = inquiry.bids.filter(function(item) {
						return item.awarded;
					});
					amount = (bids_awarded.length)?bids_awarded[0].total_price:0.0;
					price = (bids_awarded.length)?bids_awarded[0].price:0.0;
					///////////////////////////////////////////////////////////


					if(inquiry.bids.length)
					bids = inquiry.bids;

					// amount and price only for bids that are awarded

					inquiry.bids.forEach((bid,index)=>{
						// console.log('bid.sample_stage_id',bid.sample_stage_id);
						if(bid.sample_stage_id) {
							var stts = sttss.find((stts)=>stts.id==bid.sample_stage_id);
							if(stts) {
								bid_stages.push(stts);
								bid_sample_stages_string.push(stts.name);
							}
							else {
								bid_stages.push({name:'---'});
								bid_sample_stages_string.push('---');
							}
						}
					});
				}

				return {
					id: inquiry.id,
					// bid_id: null,
					bids: bids,
					bid_stages: bid_stages,
					bid_sample_stages_string: bid_sample_stages_string,
					awarded: inquiry.awarded,
					awarded_to_me: inquiry.awarded_to_me,
					notification_id: null,
					amount: amount,
					unit_cost: price,
					quantity: inquiry.quantity,
					stage_id: inquiry.stage_id,
					shipping_cost: inquiry.shipping_cost,
					estimated_no_days: inquiry.estimated_no_days,
					keyword: inquiry.keyword,
					message: inquiry.message,
					dataType: "inquiry",
					isRead: true,
					textSnackbar: null,
					title: null,
					loading: false,
				}				
			});

			return retVal;
		},
		
		setDataTableGrid(inquiries){
			var retVal = [];

			for (var i = inquiries.length - 1; i >= 0; i--) {
				var item = {};
				var bid_count = (inquiries[i].bids)?inquiries[i].bids.length:0;

				item.inq_id = inquiries[i].id;
				item.keywords = this.ucwords(inquiries[i].keyword);
				item.message = inquiries[i].message+"";
				item.categories = inquiries[i].categories.join(', ');
				item.quantity = inquiries[i].quantity;
				item.shipping_date = inquiries[i].desired_shipping_date;
				item.created_at = inquiries[i].created_at;
				item.status = inquiries[i].stage_id;
				item.bid_count = bid_count;
				item.loading = false;
				retVal.push(item);
			}

			return retVal;
		},

		getStatus(status_id){

			var retVal = this.$route.meta.statuses.filter((stts)=>{
				return (stts.id==status_id);
			});

			retVal = (retVal.length)?retVal[0]:"---";

			return retVal;
		},	

	},

	computed:{

		openInquiry: {  
			get() {
				return this.$store.state.inq.openInquiryView;
			},
			set(nVal){
				if(nVal)
				this.$store.commit('inq/SHOW_OPENINQUIRYVIEW_M');
				else
				this.$store.commit('inq/HIDE_OPENINQUIRYVIEW_M');
			},
		},

		// openInquiry() {  
		// 	return this.$store.state.inq.openInquiryView;
		// },


		defaultMaxInqs() {

			if(config.devMode) {
				return config.defaultMaxInqs;
			} else {				
				var subscrpt = this.$store.state.auth.auth_user.subscription;

				if(subscrpt=='monthly.mini' || subscrpt=='yearly.mini')
				return config.plan.maxInqs.mini;
				else if(subscrpt=='monthly.standard' || subscrpt=='yearly.standard')
				return config.plan.maxInqs.standard;
				else if(subscrpt=='monthly.premium' || subscrpt=='yearly.premium')
				return config.plan.maxInqs.premium;
				else
				return config.defaultMaxInqs;
			}
		},


		storeType(){
			return  this.$route.meta.storeType.inq;
		},


		stateInquiry: {
			get() {
				return this.$store.state.inq.inquiry;
			},
			set(nVal) {
				this.$store.commit('inq/UPDATE_INQUIRY_M',{inquiry:nVal});
			},
		},			
	},

}



					// var bid = response[i].bids.filter(function(item) {
					// 	return item.awarded;
					// });
					// var amount = (bid.length)?bid[0].total_price:0.0;
