// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'
import hlprs from '@/mixins/helpers'

import vm from '@/main.js';



import MsgBus from "@/bus/messaging";
import NtfctnBus from "@/bus/notification";









const base_url = config.main.apiURL;

const state = {

	notifications: [],
	notificationsMsgs: [],
	unread:null,
	unreadMsgs:null,

	// [
	//     {
	//         title:"title to display",
	//         dataType: "inquiry,quote,user, etc..",
	//         data:"any data that is related to the notification",
	//     }
	// ]

	showSnackbar: false,
	dataSnackbar: null,

	api: {

		getNotifications: {
			method  : 'get',
			url     : base_url+'/v1/notifications',
		},

		markNotifasRead: {
			method  : 'put',
			url     : base_url+'/v1/notifications'
		},
	} 

}



















const mutations = {

	SET_NOTIFICATIONS_M(state, data) {
		state.notifications = data;
	},
	INSERT_ARR_NOTIFICATIONS_M(state, data) {
		state.notifications = [
			...state.notifications,
			...data,
		];
	},
	UNSHIFT_ARR_NOTIFICATIONS_M(state, data) {
		state.notifications = [
			...data,
			...state.notifications,
		];        
	},
	INSERT_NOTIFICATIONS_M(state, data) {
		state.notifications.push(data);
	},
	RESET_NOTIFICATIONS_M(state) {
		state.notifications = [];
	},
	SET_UNREAD_M(state,data) {
		state.unread = data;
	},

	//////////////////////////////////////////////////////////

	SET_NOTIFICATIONSMSGS_M(state, data) {
		state.notificationsMsgs = data;
	},
	INSERT_ARR_NOTIFICATIONSMSGS_M(state, data) {
		state.notificationsMsgs = [
			...state.notificationsMsgs,
			...data,
		];        
	},

	UNSHIFT_ARR_NOTIFICATIONSMSGS_M(state, data) {
		state.notificationsMsgs = [
			...data,
			...state.notificationsMsgs,
		];        
	},
	RESET_NOTIFICATIONSMSGS_M(state) {
		state.notificationsMsgs = [];
	},
	SET_UNREADMSGS_M(state,data) {
		state.unreadMsgs = data;
	},

	//////////////////////////////////////////////////////////


	UPDATE_SNACKBAR_M(state,data) {
		state.dataSnackbar = data;
	},

	SHOW_SNACKBAR_M(state) {
		state.showSnackbar = true;
	},

	HIDE_SNACKBAR_M(state) {
		state.showSnackbar = false;
	},

	// UPDATE_TEXTSNACKBAR_M(state,data) {        
	//     state.textSnackbar = data.textSnackbar;
	// },
}

 



















const actions = {






	// sockets
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////


	// admin
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	adminApprovedInquiry_a(context, data){
		
		// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Inquiry #'+data.inquiry_id+' APPROVED!';        
		context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);
	},


	// zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz







	adminRejectedInquiry_a(context, data){

		// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Inquiry #'+data.inquiry_id+' REJECTED!';        
		context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);

		// context.dispatch('byrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
		// .then((response)=>{
		//     var ntfctn = {
		//         title:          "Inquiry \""+response.keyword+"\" REJECTED!",
		//         dataType:       'inquiry',
		//         data:           response,
		//         textSnackbar:   'Inquiry "'+response.keyword+'" REJECTED!',
		//     }
		//     context.dispatch('updateNotification_a',ntfctn);
		// });    	
	},
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	// admin

	// buyer
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	buyerAwardedBid_a(context, data){

		// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Bid for Inquiry #'+data.inquiry_id+' AWARDED!';        
		context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);

		// context.dispatch('spplrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
		// .then((response)=>{
		//     var ntfctn = {
		//         title:          "Bid \""+response.keyword+"\" AWARDED!",
		//         dataType:       'inquiry',
		//         data:           response,
		//         textSnackbar:   'Bid "'+response.keyword+'" AWARDED!',
		//     }
		//     context.dispatch('updateNotification_a',ntfctn,);
		// });

	},
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	// buyer

	// supplier
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	supplierCreatedBid_a(context, data) {

		// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'New Bid for Inquiry #'+data.inquiry_id+' AWARDED!';        
		context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);


	},

	supplierConfirmedAward_a(context, data) {
		// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Supplier Confirmed for Inquiry #'+data.inquiry_id+' AWARDED!';
		context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);

		
	},

	supplierModifiedBid_a(context, data) {
		// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = 'Supplier Modified Bid for Inquiry #'+data.inquiry_id+'!';
		context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		NtfctnBus.emitNewNotification(data);


		// context.dispatch('byrInq/getInquiry_a',{inq_id:data.inquiry_id},{root:true})
		// .then((response)=>{
		//     var ntfctn = {
		//         title:          "Supplier Confirmed \""+response.keyword+"\"!",
		//         dataType:       'inquiry',
		//         data:           response,
		//         textSnackbar:   'Supplier Confirmed "'+response.keyword+'"!',
		//     }
		//     context.dispatch('updateNotification_a',ntfctn);
		// });       	
	},

	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    
	// supplier



	// messaging
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    
	newMessage_a(context, data){

		// console.log('newMessage_a = ',data);
		
		// populate but not show snackbar yet until all notifications are loaded
		var textSnackbar = '';
		if(data.type == 'bid.buyer.admin')
		textSnackbar = 'New Message on BID #'+data.id+'!';
		else if(data.type == 'inquiry.buyer.admin')
		textSnackbar = 'New Message on INQUIRY #'+data.id+'!';
		else if(data.type == 'bid.supplier.admin')
		textSnackbar = 'New Message on INQUIRY #'+data.id+'!';
		else if(data.type == 'project.buyer.admin')
		textSnackbar = 'New Message on Project '+data.id+'!';
		else
		textSnackbar = 'New Message!';

		context.commit('UPDATE_SNACKBAR_M',textSnackbar);

		if(data.type == 'project.buyer.admin')
		MsgBus.emitNewProjectMessage(data);
		else
		MsgBus.emitNewMessage(data);
		
		// var ntfctn = {
		//     title:          "Supplier Confirmed \""+response.keyword+"\"!",
		//     dataType:       'inquiry',
		//     data:           response,
		//     textSnackbar:   'Supplier Confirmed "'+response.keyword+'"!',
		// }
		// context.dispatch('ntfctns/updateNotification_a',ntfctn,{root:true});		

	},
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    
	// messaging

	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	// sockets






















	resetNotification_a(context){
		context.commit('RESET_NOTIFICATIONS_M');
	},

	resetAllNotification_a(context){
		context.commit('RESET_NOTIFICATIONS_M');
		context.commit('RESET_NOTIFICATIONSMSGS_M');
	},



	// commented because when there's a notification the notifcation component will just refresh
	// updateNotification_a(context, data){
	   
	//     context.commit('INSERT_NOTIFICATIONS_M',data);

	//     context.commit('UPDATE_SNACKBAR_M',{dataSnackbar:data});
	//     context.commit('SHOW_SNACKBAR_M');

	//     // if there's an update
	//     context.commit('SET_UNREAD_M', parseInt(state.unread) + 1);
	//     // state.unread = parseInt(state.unread) + 1

	// },



	gotoNotfication_a(context,ntfctn){

		// // console.log('this.$route ',vm.$route);
		var store = vm.$route.meta.storeType.inq;
		var meta = vm.$route.meta;
		// if inquiry type
		if(ntfctn.dataType == 'inquiry' || ntfctn.dataType == 'bid') {


			// show notification
			/////////////////////////////////////////////////////////
			context.dispatch(store+'/getInquiry_a', {
				inq_id: ntfctn.data.id
			}, {root:true})
			.then((response) => {
				// // console.log('response',response);
				// console.log('ntfctn',ntfctn);

				// serach BID
				// var bid = null;
				// if(data.bids && data.bids.length)
				// bid = data.bids.filter(bid => bid.id == ntfctn.data.bid_id)[0];

				var bid_id = ntfctn.data.bid_id

				context.commit('inq/UPDATE_INQUIRY_M',{inquiry:response}, {root:true});
				context.commit('inq/UPDATE_BID_ID_M', { bid_id:bid_id }, {root:true});
				context.commit('inq/SHOW_OPENINQUIRYVIEW_M', null, {root:true});
				
				var routeName = '';

				if(meta.role == 3)
				routeName = 'BuyerInquiryView';
				else if(meta.role == 1)
				routeName = 'AdminInquiryView';

				var routePayload = {
					name:routeName,
					params:{
						inquiry_id:ntfctn.data.id,
					},
				};

				router.push(routePayload);

				
			})
			.catch((error) => {
				// console.log(error);
			});
			/////////////////////////////////////////////////////////
			// show notification
		} 
		else if(ntfctn.dataType == 'project') {

			var routeName = '';

			if(meta.role == 3) {
				if(ntfctn.data.package_type=='my-home')
				routeName = 'BuyerMyHomeProject';
				else if(ntfctn.data.package_type=='my-tower')
				routeName = 'BuyerMyTowerProject';
			}
			else if(meta.role == 1) {
				if(ntfctn.data.package_type=='my-home')
				routeName = 'AdminMyHomeProject';
				else if(ntfctn.data.package_type=='my-tower')
				routeName = 'AdminMyTowerProject';	        	
			}

			var routePayload = {
				name:routeName,
				params:{
					proj_id:ntfctn.data.project_id,
				},
			};


			router.push(routePayload);       	


			// console.log('meta', meta);
			// console.log('store', store);
			// console.log('url', projectUrl);

			// var projectUrl = window.location.origin + router.resolve(routePayload).href;
			// window.location.href = projectUrl;

		}

	},



	populateNotifications_a(context, options) {
		return new Promise((resolve, reject) => {

			var headers = {token:localStorage.access_token};
			var offsetUrl = "offset="+options.offset;
			var limitUrl = "limit="+options.limit;

			axios({
				method: state.api.getNotifications.method,
				url: state.api.getNotifications.url+"?"+offsetUrl+"&"+limitUrl,
				headers: headers,
			})
			.then(response => {

				var count = response.data.data.length;
				var notifications = response.data.data;
				var unreadCount = response.data.unread;

				console.log('populateNotifications_a response',response);

				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

				var isRead;
				var title = '';
				var dataType = '';
				var data = {};

				// sort by date updated_at
				notifications = _.sortBy(notifications,'created_at');

				var ntfctns = notifications.map((ntfctn)=>{

					title = '';
					data = {};
					dataType = "";
					isRead = true; 

					data = {
						'id':ntfctn.data.inquiry_id,
						'bid_id':ntfctn.data.bid_id,
						'notification_id': ntfctn.id,
					}

					isRead = (ntfctn.read_at == null || ntfctn.read_at == undefined)?false:true;

					switch (ntfctn.type) {

						case 'adminApprovedInquiry':
							title='Inquiry "'+ntfctn.data.inquiry_id+'" APPROVED!';
							dataType = 'inquiry';
							data.bid_id = null;
						break;

						case 'adminRejectedInquiry':
							title="Inquiry \""+ntfctn.data.inquiry_id+"\" REJECTED!";
							dataType = 'inquiry';
							data.bid_id = null;
						break;

						case 'supplierCreatedBid': 
							title="Supplier Created Bid for Inquiry #"+ntfctn.data.inquiry_id+"!";
							dataType = 'bid';
						break;

						case 'supplierConfirmedAward': 
							title="Supplier Confirmed \""+ntfctn.data.inquiry_id+"\"!";
							dataType = 'inquiry';
							data.bid_id = null;
						break;

						// supplier
						case 'buyerAwardedBid': 
							title=`Buyer has Awarded for Inquiry # ${ ntfctn.data.inquiry_id }  to you`;
							dataType = 'inquiry';
						break;

						case 'adminApprovedBid': 
							title=`BAL has Approved Bid for Inquiry # ${ ntfctn.data.inquiry_id }`;
							dataType = 'inquiry';
						break;

						default : 
							title='Others';
							dataType = 'inquiry';
						break;
					}


					return {
						// title:         ntfctn.created_at+' = '+title,
						title:         title,
						dataType:      dataType,
						data:          data,
						textSnackbar:  title,
						isRead: 	   isRead,
					}

				});

				// remove Others notifications and on unread count
				//////////////////////////////////////////////////////
				var urc = 0;
				ntfctns = ntfctns.filter((ntfctn)=>{
					if(ntfctn.title=='Others')
					urc++;
					
					return ntfctn.title!='Others';
				});
				unreadCount = unreadCount-urc;
				//////////////////////////////////////////////////////
				// remove Others notifications and on unread count

				if(options.insertMethod=='unshift')
				context.commit('UNSHIFT_ARR_NOTIFICATIONS_M',ntfctns);
				else			    
				context.commit('INSERT_ARR_NOTIFICATIONS_M',ntfctns);

				// context.commit('SET_NOTIFICATIONS_M',ntfctns);
				context.commit('SET_UNREAD_M',unreadCount);


				resolve({
					count:count
				});
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

			})
			.catch(error => {
				// // console.log(error);
				// if(actions.checkToken(error)) {
					reject(error);
				// }
			})

		});
   },



	populateNotificationsMsgs_a(context, options) {
		return new Promise((resolve, reject) => {

			var headers = {token:localStorage.access_token};
			var offsetUrl = "offset="+options.offset;
			var limitUrl = "limit="+options.limit;
			var typeUrl = 'type=message';
			axios({
				method: state.api.getNotifications.method,
				url: state.api.getNotifications.url+"?"+typeUrl+"&"+offsetUrl+"&"+limitUrl,
				headers: headers,
			})
			.then(response => {
				console.log('populateNotificationsMsgs_a response',response);    			

				var count = response.data.data.length;
				var notifications = response.data.data;
				var unreadCount = response.data.unread;

				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

				var isRead;
				var title = '';
				var data = {};
				var dataType = "";
				
				// sort by date updated_at
				// notifications = _.sortBy(notifications,'created_at');

				// // console.log("getNotificationsMsgs_a notifications = ",notifications);

				var ntfctns = notifications.map((ntfctn)=>{

					data = {};
					dataType = "";
					title = '';
					isRead = true; 

					isRead = (ntfctn.read_at == null || ntfctn.read_at == undefined)?false:true;

					// check what type of message
					if(ntfctn.data.type=="bid.buyer.admin") {
						data = {
							'id':ntfctn.data.id.split("-")[0],
							'bid_id':ntfctn.data.id,
							'notification_id': ntfctn.id,
							'type': ntfctn.data.type,
						};
						dataType = "bid";
						title = 'Message in BID# '+ntfctn.data.id;
					} 
					else
					if(ntfctn.data.type=="inquiry.buyer.admin") {
						data = {
							'id':ntfctn.data.id,
							'bid_id':null,
							'notification_id': ntfctn.id,
							'type': ntfctn.data.type,
						};
						dataType = "inquiry";
						title = 'Message in Inquiry# '+ntfctn.data.id;
					}
					else
					if(ntfctn.data.type=="bid.supplier.admin") {
						data = {
							'id':ntfctn.data.id.split("-")[0],
							'bid_id':ntfctn.data.id,
							'notification_id': ntfctn.id,
							'type': ntfctn.data.type,
						};
						dataType = "inquiry";
						title = 'Message in BID# '+ntfctn.data.id;
					}
					else
					if(ntfctn.data.type=="project.buyer.admin") {
						data = {
							'id':ntfctn.data.id.split("-")[0],
							'project_id':ntfctn.data.id,
							'notification_id': ntfctn.id,
							'type': ntfctn.data.type,
							// 'package_type': ntfctn.data.package_type,
							'package_type': 'my-tower',
						};
						dataType = "project";
						title = 'Message in Project #'+ntfctn.data.id;
					}
					else {
						data = {};
						dataType = "others";
						title = 'Others';
					}


					return {
						// title:         ntfctn.created_at+" || "+ntfctn.id+' <br> '+ntfctn.data.content+" = #"+ntfctn.data.id,
						// title:         ntfctn.created_at+" || "+ntfctn.id,
						title:         title,
						dataType:      dataType,
						data:          data,
						textSnackbar:  title,
						isRead: 	   isRead,
					};

				});

				// test
				// ntfctns.push({
				// 	title:         'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
				// 	dataType:      dataType,
				// 	data:          data,
				// 	textSnackbar:  title,
				// 	isRead: 	   isRead,					
				// });


				// remove blank notifications on unread count
				//////////////////////////////////////////////////////
				var urc = 0;
				ntfctns = ntfctns.filter((ntfctn)=>{
					if(ntfctn.title=='Others')
					urc++;
					
					return ntfctn.title!='Others';
				});
				unreadCount = unreadCount-urc;
				// console.log(ntfctns);
				//////////////////////////////////////////////////////
				// remove blank notifications on unread count


				if(options.insertMethod=='unshift')
				context.commit('UNSHIFT_ARR_NOTIFICATIONSMSGS_M',ntfctns);
				else
				context.commit('INSERT_ARR_NOTIFICATIONSMSGS_M',ntfctns);

				context.commit('SET_UNREADMSGS_M',unreadCount);
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

				resolve({
					count:count
				});
			})
			.catch(error => {
				// // console.log(error);
				// if(actions.checkToken(error)) {
					reject(error);
				// }
			})

		});
	},




   markNotifasRead_a(context,data) {
   		var ntfctn = data.ntfctn;
   		var ntfctnType = data.ntfctnType;
		return new Promise((resolve, reject) => {

			var headers = {token:localStorage.access_token};
		   	axios({
				method: state.api.markNotifasRead.method,
				url: state.api.markNotifasRead.url + `/${ntfctn.data.notification_id}/read`,
				headers: headers,
			})
			.then(response => {
				resolve(response.data);
				
				// deduct unread
				if(!ntfctn.isRead) {
					
					if(ntfctnType=='normalType')
					state.unread = parseInt(state.unread) - 1;
					else if(ntfctnType=='messageType')
					state.unreadMsgs = parseInt(state.unreadMsgs) - 1;
					
					ntfctn.isRead = true;
				}
				

			})
			.catch(error => {
				// // console.log(error);
				// if(actions.checkToken(error)) {
					reject(error);
				// }
			})




				// setTimeout(()=>{

				// 	resolve(ntfctn);

				// 	// deduct unread
				// 	if(!ntfctn.isRead) {
						
				// 		if(ntfctnType=='normalType')
				// 		state.unread = parseInt(state.unread) - 1;
				// 		else if(ntfctnType=='messageType')
				// 		state.unreadMsgs = parseInt(state.unreadMsgs) - 1;
						
				// 		ntfctn.isRead = true;
				// 	}

				// },1000);

		});

   },



}






























 
const methods = {





}
 
 

















const getters = {

}


















export default {
	namespaced: true,
	state,
	getters,
	mutations,
	methods,	
	actions, 
}

