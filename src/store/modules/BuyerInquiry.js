// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

const base_url = config.main.apiURL;

const state = {
	api: {
		getInquiries: {
			method  : 'get',
			url     : base_url+'/v1/buyer/inquiries',
		},

		getInquiry: {
			method  : 'get',
			url     :base_url+'/v1/buyer/inquiries'
		},

		getTokens: {
			method 	:'get',
			url 	:'https://buyanylight.com/get-tokens'
		},

		getInquiry: {
			method  : 'get',
			url     :base_url+'/v1/buyer/inquiries'
		},

		addInquiry: {
			method  : 'post',
			url     : base_url+'/v1/buyer/inquiries',
		},

		editInquiry: {
			method  : 'patch',
			url     : base_url+'/v1/buyer/inquiries',
		},

		getInquiryBids: {
			method  : 'get',
			url     : base_url+'/v1/buyer/inquiries',
			url2    : 'bids',
		},
		getInquiryBid: {
			method: 'get',
			url: base_url+'/v1/buyer/inquiries',
			url2: 'bids/own-bid',
		},
		awardBid: {
			method: 'put',
			url: base_url+'/v1/buyer/inquiries',
			url2: 'bids',
			url3: 'award',
		},

		// getCreditCardResource: {
		// 	method  : 'post',
		// 	url     : base_url+'/v1/pay/credit-card',
		// },

		payByBankTransfer: {
			method  : 'post',
			url     : base_url+'/v1/pay/bank-transfer',
		},


		paySubscription: {
			method  : 'post',
			url     : base_url+'/v1/pay/credit-card',
		},


		updateProfile: {
			method  : 'patch',
			url     : base_url+'/v1/profile',
		},


		updatePassword: {
			method  : 'patch',
			url     : base_url+'/v1/password',
		},


		getActiveSubscriptions: {
			method  : 'get',
			url     : base_url+'/v1/active-packages',
		},



	},

	paymentMethod: {
		creditCard: 1,
		bankTransfer: 2,
	},

	// inquiries: [],
	// inquiry: null,
	// openInquiryView: false,

}



const mutations = {

	// SHOW_OPENINQUIRYVIEW_M(state){
	//     state.openInquiryView = true;
	// },

	// HIDE_OPENINQUIRYVIEW_M(state){
	//     state.openInquiryView = false;
	// },

	// UPDATE_INQUIRY_M(state,data){
	//     state.inquiry = data.inquiry;
	// },

}
	
const actions = {


		getTokensokens(){
				return true
		},

	getBalTokens_a(context,data){
		return new Promise((resolve, reject) =>{
			var headers = {
				token: localStorage.access_token,
				"content-type": "application/json",
			}

			axios({
				method: state.api.getTokens.method,
				url: state.api.getTokens.url,
				headers: headers
			})
			.then(response => {
				console.log(11111111)
				resolve(response.data[0]);
			}).catch(error => {
				if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
					console.log("EXPIRED")
					router.push({'name': 'Logout'});
				} else {
					console.log("normal error!")
					reject(error)
				}
			});
		})
	},

	getActiveSubscription_a(context,data){
		return new Promise((resolve, reject) => {
			var headers = {
				token: localStorage.access_token,
				"content-type": "application/json",
			};

			axios({
				method: state.api.getActiveSubscriptions.method,
				url: state.api.getActiveSubscriptions.url,
				headers: headers,
			})
			.then(response => {
				console.log(response);
				resolve(response.data[0]);
			})
			.catch(error => {
				if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
					console.log("EXPIRED")
					router.push({'name': 'Logout'});
				} else {
					console.log("normal error!")
					reject(error)
				}
			});
		})
	},


	updateProfile_a(context, data) {
		return new Promise((resolve, reject) => {
			var headers = {
				token: localStorage.access_token,
				"content-type": "application/json",
			};

			axios({
				method: state.api.updateProfile.method,
				url: state.api.updateProfile.url,
				headers: headers,
				data: JSON.stringify(data.data)
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
					console.log("EXPIRED")
					router.push({'name': 'Logout'});
				} else {
					console.log("normal error!")
					reject(error)
				}
			});
		})
	},

	updatePassword_a(context, data) {
		return new Promise((resolve, reject) => {

			var headers = {
				token: localStorage.access_token,
				"content-type": "application/json",
			};

			axios({
				method: state.api.updatePassword.method,
				url: state.api.updatePassword.url,
				headers: headers,
				data: JSON.stringify(data.data)
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
					console.log("EXPIRED")
					router.push({'name': 'Logout'});
				} else {
					console.log("normal error!")
					reject(error)
				}
			});

		})
	},






	getInquiries_a(context, data){
		return new Promise((resolve, reject) => {
			var headers = {token:localStorage.access_token};
			// console.log(state.api.getInquiries.url);
			// console.log(state.api.getInquiries.method);
			// console.log(headers);
			var stage_id = (data && data.stage_id)?"stage_id="+data.stage_id:"";
			var with_bids = (data && data.with_bids)?"with_bids="+data.with_bids:"";
			// var with_bids = "";

			axios({
				method: state.api.getInquiries.method,
				url: state.api.getInquiries.url+"?"+stage_id+"&"+with_bids,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				console.log('error getInquiries_a',error);
				// if(actions.checkToken(error)) {                
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})
		});
	},


	getInquiry_a(context, data) {
		return new Promise((resolve, reject) => {

			var headers = { token: localStorage.access_token }

			axios({

				method  : state.api.getInquiry.method,
				url     : state.api.getInquiry.url + "/" + data.inq_id,
				headers : headers

			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				console.log('byrInq/getInquiries_a error',error);
				
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

		}) 
	},

	addInquiry_a(context,data){
		return new Promise((resolve, reject) => {

			// console.log(data.formData);
			// console.log(JSON.stringify(data.formData));

			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};
			axios({
				method: state.api.addInquiry.method,
				url: state.api.addInquiry.url,
				headers: headers,
				data: JSON.stringify(data.formData),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
				
			});

		});
	},


	editInquiry_a(context,data){
		return new Promise((resolve, reject) => {

			// console.log(data.formData);
			// console.log(JSON.stringify(data.formData));

			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};
			axios({
				method: state.api.editInquiry.method,
				url: state.api.editInquiry.url + '/' + data.inq_id,
				headers: headers,
				data: JSON.stringify(data.formData),
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
				
			});

		});
	},


	getAllInquiryBids_a(context,data){
		
		return new Promise((resolve, reject) => {

			var method = state.api.getInquiryBids.method; 
			var url = state.api.getInquiryBids.url + "/" + data.inq_id + "/" + state.api.getInquiryBids.url2; 
			
			var headers = {
				 token:localStorage.access_token,
				 "content-type": "application/json",
			};
			axios({
				method: method,
				url: url,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				// console.log(error);
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
				
			})
		});
	},

	getInquiryBid_a(context,data){
		return new Promise((resolve, reject) => {

			var method = state.api.getInquiryBid.method; 
			var url = state.api.getInquiryBid.url+"/"+data.inq_id+"/"+state.api.getInquiryBid.url2; 
			var headers = { token:localStorage.access_token, "content-type": "application/json", };
			axios({
				method: method,
				url: url,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				// console.log(error);
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
				

			})
		});
	},


	// getCreditCardResource(context, data) {
	// 	return new Promise((resolve, reject) => {

	// 		var headers = { token: localStorage.access_token }

	// 		axios({

	// 			method  : state.api.getCreditCardResource.method,
	// 			url     : state.api.getCreditCardResource.url,
	// 			headers : headers,
	// 			data 	: {
	// 				id: 	 data.inquiry_id,
	// 				type:    "inquiry",
	// 				payment_method_id: state.paymentMethod.creditCard,
	// 			},
	// 		})
	// 		.then(response => {
	// 			resolve(response.data);
	// 		})
	// 		.catch(error => {
	// 			// if(actions.checkToken(error)) {
	// 			if(context.dispatch('checkToken',error)) {
	// 				reject(error);
	// 			}
	// 		})

	// 	}) 
	// },



	// getSampleOrderCreditCardResource(context, data) {
	// 	return new Promise((resolve, reject) => {

	// 		var headers = { token: localStorage.access_token }
	// 		axios({
	// 			method  : state.api.getCreditCardResource.method,
	// 			url     : state.api.getCreditCardResource.url,
	// 			headers : headers,
	// 			data 	: data,
	// 		})
	// 		.then(response => {
	// 			resolve(response.data);
	// 		})
	// 		.catch(error => {
	// 			// if(actions.checkToken(error)) {
	// 			if(context.dispatch('checkToken',error)) {
	// 				reject(error);
	// 			}
	// 		})

	// 	}) 
	// },



	// payByBankTransfer(context, data) {
	// 	return new Promise((resolve, reject) => {

	// 		var headers = { token: localStorage.access_token }

	// 		axios({

	// 			method  : state.api.payByBankTransfer.method,
	// 			url     : state.api.payByBankTransfer.url,
	// 			headers : headers,
	// 			data 	: {
	// 				id: 	 data.id,
	// 				type:    data.payment_type,
	// 				payment_method_id: state.paymentMethod.bankTransfer,
	// 			},
	// 		})
	// 		.then(response => {
	// 			resolve(response);
	// 		})
	// 		.catch(error => {
	// 			// if(actions.checkToken(error)) {
	// 			if(context.dispatch('checkToken',error)) {
	// 				reject(error);
	// 			}
	// 		})

	// 	}) 
	// },


	paySubscription_a(context, data) {
		return new Promise((resolve, reject) => {

			var headers = { token: localStorage.access_token }

			axios({

				method  : state.api.paySubscription.method,
				url     : state.api.paySubscription.url,
				headers : headers,
				data 	: {
					"id" : data.buyer_id,
					"type" : "subscribe",
					"payment_method_id" : 1,
					"plan" : data.plan,
				},
			})
			.then(response => {				
				resolve(response.data);
			})
			.catch(error => {
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}
			})

		}) 
	},


	awardBid_a(context,data){
		return new Promise((resolve, reject) => {

			var method = state.api.awardBid.method; 
			var url = state.api.awardBid.url+"/"+data.inquiry_id+"/"+state.api.awardBid.url2+"/"+data.bid_id+"/"+state.api.awardBid.url3; 

			var headers = {
				token:localStorage.access_token,
				"content-type": "application/json",
			};

			// console.log(data);



			// shipping_method_id:
			// shipping_address:
			// shipping_city:
			// shipping_country_id:
			// shipping_postal:
			
			axios({

				method: method,
				url: url,
				headers: headers,
				data    : JSON.stringify(data)

			})
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {

				// console.log(error);
				// if(actions.checkToken(error)) {
				if(context.dispatch('checkToken',error)) {
					reject(error);
				}

			})
		});
	},


	checkToken(context,error){
		
		// console.log("checkToken = ",error);
		if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
			console.log("EXPIRED");
			router.push({'name': 'Logout'})
		}
		else {
			// reject(error);
			return true;
		}

	},


}


const getters = {

}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}






// Admin Buyanylight

// Supplier Buyanylight

// Buyer Buyanylight
// info@bal.com






// {   
//     uuid,
//     token,
//     user: {     
//         firstname,
//         lastname,
//         email,
//         role,
//         avatar,
//     },
// }