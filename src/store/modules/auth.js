// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import {routes} from '@/router/routes'

import config from '@/config/index'
import { store } from '@/store'

import vm from '@/main.js';

import hlprs from '@/mixins/helpers'


import xmlToJSON from "xmlToJSON";

const base_url = config.main.apiURL;

const state = {

	api: {

		forgotPassword: {
			method: 'post',
			url: base_url+'/v1/forgot-password',  
		},

		login: {
			method: 'post',
			url: base_url+'/v1/login',  
		},

		logout: {
			method: 'post',
			url: base_url+'/v1/logout',
		},

		buyerRegistration: {
			method: 'post',
			url: base_url+'/v1/buyer/register'
		},

		supplierRegistration: {
			method: 'post',
			url: base_url+'/v1/supplier/register'
		},

		getInquiryStatuses: {
			method: 'get',
			url: base_url+'/v1/inquiry-stages',
		},

		isEmailExist: {
			method: 'post',
			url: base_url+'/v1/validate-email',
		},

		sendContactUs: {
			method: 'post',
			url: base_url+'/v1/contact-us',
		},



	},
	// currency_rates: {},
	token: localStorage.getItem('access_token') || null,
	axios: {
		config: {
			headers: {'Authorization': "bearer " + (localStorage.getItem('access_token') || null)},
		},
	},
	auth_user: {
		name:      		localStorage.getItem('name') || null,
		firstname: 		localStorage.getItem('firstname') || null,
		lastname:  		localStorage.getItem('lastname') || null,
		email:     		localStorage.getItem('email') || null,
		avatar:    		localStorage.getItem('avatar') || null,
		role:      		localStorage.getItem('role') || null,
		uuid:      		localStorage.getItem('uuid') || null,
		job_title:      localStorage.getItem('job_title') || null,
		phone:      	localStorage.getItem('phone') || null,
		fax:      		localStorage.getItem('fax') || null,
		address:      	localStorage.getItem('address') || null,
		country_id:     localStorage.getItem('country_id') || null,

		subscription:     localStorage.getItem('subscription') || null,
		referral_code:     localStorage.getItem('referral_code') || null,
	},


}



const mutations = {

	CONNECTED_M(state) {
		// console.log("CONNECTED_M auth,js");
		state.isConnected = true;
	},

	DISCONNECTED_M(state) {
		// console.log("DISCONNECTED_M auth,js");
		state.isConnected = false;
	},


	SET_TOKEN_M(state, token){
		state.token = token;
	},

	DESTROY_TOKEN_M(state){
		state.token = null;
	},

	SET_AUTHUSER_M(state,user){

		state.auth_user.name       = user.firstname+" "+user.lastname;
		state.auth_user.firstname  = user.firstname;
		state.auth_user.lastname   = user.lastname;
		state.auth_user.email      = user.email;
		state.auth_user.avatar     = user.avatar;
		state.auth_user.role       = user.role;
		state.auth_user.uuid       = user.uuid;
		state.auth_user.job_title  	= user.job_title;
		state.auth_user.phone		= user.phone;
		state.auth_user.fax			= user.fax;
		state.auth_user.address		= user.address;
		state.auth_user.country_id 	= user.country_id;
		state.auth_user.subscription 	= user.subscription;
		state.auth_user.referral_code 	= user.referral_code;
	},

	DESTROY_AUTHUSER_M(state) {
		state.auth_user.name       = null;
		state.auth_user.firstname  = null;
		state.auth_user.lastname   = null;
		state.auth_user.email      = null;
		state.auth_user.avatar     = null;
		state.auth_user.role       = null;
		state.auth_user.uuid       = null;

		state.auth_user.job_title	= null;
		state.auth_user.phone		= null;
		state.auth_user.fax			= null;
		state.auth_user.address		= null;
		state.auth_user.country_id	= null;
		state.auth_user.subscription	= null;
		state.auth_user.referral_code 	= null;
	},


	CHANGE_TEST_M(state,data){
		state.auth_user.name = data;
	},

	SET_CURRENCY_M(state,data){
		state.currency_rates = data;
	},

}

	
const actions = {


	retrieveToken_a(context,data){
		return new Promise((resolve, reject) => {

			var payload = {
				email: data.username,
				password: data.password,
			};

			axios({
				url: state.api.login.url,
				method: state.api.login.method,
				data: payload,
			})
			.then(response => {

				// console.log('retrieveToken_aretrieveToken_aretrieveToken_a');
				// console.log(response.data);
				// console.log(response.data.user);
				// console.log('retrieveToken_aretrieveToken_aretrieveToken_a');
				
				var token = response.data.token;
				var user = response.data.user;
				user.uuid = response.data.uuid;


				// set token
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				localStorage.setItem('access_token',token);
				// context.commit('SET_TOKEN_M',token);
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set token

				// set conversion
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// context.dispatch('setCurrency_a');
				// localStorage.setItem('currency_rates',token);
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set conversion

				

				// set user details                
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				localStorage.setItem('uuid'       ,user.uuid); // change this later to the real uuid
				localStorage.setItem('name'       ,user.firstname+" "+user.lastname);
				localStorage.setItem('firstname'  ,user.firstname);
				localStorage.setItem('lastname'   ,user.lastname);
				localStorage.setItem('email'      ,user.email);
				localStorage.setItem('avatar'     ,user.avatar);
				localStorage.setItem('role'       ,user.role);

				localStorage.setItem('job_title' 	,user.job_title);
				localStorage.setItem('phone' 		,user.phone);
				localStorage.setItem('fax' 			,user.fax);
				localStorage.setItem('address' 		,user.address);
				localStorage.setItem('country_id' 	,user.country_id);
				localStorage.setItem('subscription' 	,user.subscription);
				localStorage.setItem('referral_code' 	,user.referral_code);

				context.commit('SET_AUTHUSER_M',user);
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set user details 


				// reset notifications
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				context.dispatch('ntfctns/resetAllNotification_a', null, { root: true });
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// reset notifications


				// set socket user
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				context.dispatch('sckts/joinRoom_a', state.auth_user.uuid, { root: true });
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set socket user

				
				// set inquiry statuses
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				context.dispatch('retrieveInquiryStatuses_a').then(function(){                    
					resolve(response);
				});
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set inquiry statuses

			})
			.catch(error => {
				reject(error)
			})

		});
	},

	retrieveTokenOAuth_a(context,data){
		return new Promise((resolve, reject) => {


			var payload = data.user;

			axios({
				url: state.api.login.url+"/"+data.loginType,
				method: state.api.login.method,
				data: payload,
			})
			.then(response => {

				// console.log('retrieveTokenOAuth_aretrieveTokenOAuth_aretrieveTokenOAuth_a');
				// console.log(response.data);
				// console.log(response.data.user);
				// console.log('retrieveTokenOAuth_aretrieveTokenOAuth_aretrieveTokenOAuth_a');
				
				var token = response.data.token;
				var user = response.data.user;
				user.uuid = response.data.uuid;


				// set token
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				localStorage.setItem('access_token',token);
				// context.commit('SET_TOKEN_M',token);
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set token


				// set conversion
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// context.dispatch('setCurrency_a');
				// localStorage.setItem('currency_rates',token);
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set conversion


				// set user details                
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				localStorage.setItem('uuid'       ,user.uuid); // change this later to the real uuid
				localStorage.setItem('name'       ,user.firstname+" "+user.lastname);
				localStorage.setItem('firstname'  ,user.firstname);
				localStorage.setItem('lastname'   ,user.lastname);
				localStorage.setItem('email'      ,user.email);
				localStorage.setItem('avatar'     ,user.avatar);
				localStorage.setItem('role'       ,user.role);

				localStorage.setItem('job_title' 	,user.job_title);
				localStorage.setItem('phone' 		,user.phone);
				localStorage.setItem('fax' 			,user.fax);
				localStorage.setItem('address' 		,user.address);
				localStorage.setItem('country_id' 	,user.country_id);
				localStorage.setItem('subscription' 	,user.subscription);
				localStorage.setItem('referral_code' 	,user.referral_code);

				context.commit('SET_AUTHUSER_M',user);
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set user details 


				// reset notifications
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				context.dispatch('ntfctns/resetAllNotification_a', null, { root: true });
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// reset notifications


				// set socket user
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				context.dispatch('sckts/joinRoom_a', state.auth_user.uuid, { root: true });
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set socket user

				
				// set inquiry statuses
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				context.dispatch('retrieveInquiryStatuses_a').then(function(){                    
					resolve(response);
				});
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// set inquiry statuses

			})
			.catch(error => {
				reject(error)
			})

		});
	},

				// localStorage.setItem('currency_rates',token);


	retrieveInquiryStatuses_a(context){
		return new Promise((resolve, reject) => {            

			axios({
				url: state.api.getInquiryStatuses.url,
				method: state.api.getInquiryStatuses.method,
			})
			.then(response => {

				// Set Inquiry Stage / Status
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				localStorage.setItem('inquiry_statuses',JSON.stringify(response.data)); 
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// Set Inquiry Stage / Status

				resolve(response);

			})
			.catch(error => {
				reject(error)
			})
		});

	},


	logout_a(context){
		var headers = {token:localStorage.access_token};
		// console.log("headers");
		// console.log(headers);
		// console.log(localStorage.getItem('access_token'));

		// if(context.getters.isLoggedIn_g) {
			return new Promise((resolve, reject) => {
				axios({
					method: state.api.logout.method,
					url: state.api.logout.url,
					headers: headers,
				})
				.then(response => {
					// localStorage.removeItem('access_token');
					localStorage.clear();
					context.commit('DESTROY_TOKEN_M');
					context.commit('DESTROY_AUTHUSER_M');

					// reset notifications
					context.dispatch('ntfctns/resetAllNotification_a', null, { root: true });

					// unsubscribe to socket                    
					context.dispatch('sckts/unsubscribeSocket_a', null, { root: true });

					resolve(response);
				})
				.catch(error => {
					localStorage.clear();
					context.commit('DESTROY_TOKEN_M');
					context.commit('DESTROY_AUTHUSER_M');

					// reset notifications                    
					context.dispatch('ntfctns/resetAllNotification_a', null, { root: true });
					
					// unsubscribe to socket                    
					context.dispatch('sckts/unsubscribeSocket_a', null, { root: true });

					reject(error)
				})
			});
		// }
	},


	buyerRegistration_a(context, data) {

		 return new Promise((resolve, reject) => {

			var headers = {
				"content-type": "application/json",
			};

			axios({
				method: state.api.buyerRegistration.method,
				url: state.api.buyerRegistration.url,
				headers: headers,
				data: JSON.stringify(data.data),
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				console.log(error.response);
				// if(context.dispatch('checkToken',error))
				reject(error.response);
				
			})
		});


	},


	sendPasscode_a(context, data){

		return new Promise((resolve, reject) =>{
			axios({
				url: state.api.forgotPassword.url,
				method: state.api.forgotPassword.method,
				data: data
			})
			.then(response => {
				resolve(response);
			})		
			.catch(error=>{
				reject(error.response);

			})	
		})
	},





	isTest_a(context, data) {
        return new Promise((resolve, reject) => {
          	setTimeout(() => {
          		// console.log('data.email.length',data.email.length);
          		if(data.email.length<10)
            	resolve(true);
            	else
            	resolve(false);
          	}, 3500)
        })
	},

	isEmailExist_a(context, data) {

		 return new Promise((resolve, reject) => {

			var headers = {
				"content-type": "application/json",
			};

			axios({
				method: state.api.isEmailExist.method,
				url: state.api.isEmailExist.url,
				headers: headers,
				data: JSON.stringify({
					'email': data.email,
				}),
			})
			.then(response => {
				console.log('response',response)
				resolve((response.data)?false:true);
			})
			.catch(error => {
				console.log(error.response);
				reject(error.response);
			})


		});

	},


	supplierRegistration_a(context, data) {

		return new Promise((resolve, reject) => {
			
			var headers = {
				"content-type": "application/json",
			};

			axios({
				method: state.api.supplierRegistration.method,
				url: state.api.supplierRegistration.url,
				headers: headers,
				data: JSON.stringify(data.data),
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				// console.log(error);
				if(context.dispatch('checkToken',error))
				reject(error);
				
			})
		});

	},

	loginSuccess_a(context){

		// if(hlprs.methods.isRole('admin')) 
		// router.push({name:'AdminHome'});
		// else if(hlprs.methods.isRole('buyer')) 
		// router.push({name:'BuyerHome'});
		// else if(hlprs.methods.isRole('supplier')) 
		// router.push({name:'SupplierHome'});
		// else
		// router.push({name:'Login'});
		// console.log('store.state.auth.auth_user.role')
		// console.log(store.state.auth.auth_user.role)
		// console.log('store.state.auth.auth_user.role')
		// console.log('router')
		// console.log(router)
		// console.log('router')

		// router.push("/");


		// console.log('routes')
		// console.log(routes)


		if(hlprs.methods.isRole('admin')) 
		window.location.href = '/lightfinder'
		else if(hlprs.methods.isRole('buyer')) 
		window.location.href = '/lightfinder'
		else if(hlprs.methods.isRole('supplier')) 
		window.location.href = '/lightfinder'
		else
		router.push({name:'Login'});

	},



	sendContactUs_a(context, data){
		return new Promise((resolve, reject) => {

			// console.log(JSON.stringify(data));
			var headers = {
				"content-type": "application/json",
			};
			var stage_id = (data && data.stage_id)?"stage_id="+data.stage_id:"";
			var with_bids = (data && data.with_bids)?"with_bids="+data.with_bids:"";

			axios({
				method: state.api.sendContactUs.method,
				url: state.api.sendContactUs.url,
				headers: headers,
				data: JSON.stringify(data),
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




}


const getters = {
	isLoggedIn_g(state){
		return state.token !== null;
	},

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