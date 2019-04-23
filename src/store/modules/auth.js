// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

import vm from '@/main.js';

import hlprs from '@/mixins/helpers'

const state = {
    api: {
        login: {
            method: 'post',
            url: "http://192.168.1.200:8000/v1/login",  
        },
        logout: {
            method: 'post',
            url: "http://192.168.1.200:8000/v1/logout",
        },

        getInquiryStatuses: {
            method: 'get',
            url: "http://192.168.1.200:8000/v1/inquiry-stages",
        },


    },
    token: localStorage.getItem('access_token') || null,
    axios: {
        config: {
            headers: {'Authorization': "bearer " + (localStorage.getItem('access_token') || null)},
        },
    },
    auth_user: {
        name:      localStorage.getItem('name') || null,
        firstname: localStorage.getItem('firstname') || null,
        lastname:  localStorage.getItem('lastname') || null,
        email:     localStorage.getItem('email') || null,
        avatar:    localStorage.getItem('avatar') || null,
        role:      localStorage.getItem('role') || null,
        uuid:      localStorage.getItem('uuid') || null,
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
    },

    DESTROY_AUTHUSER_M(state) {
        state.auth_user.name       = null;
        state.auth_user.firstname  = null;
        state.auth_user.lastname   = null;
        state.auth_user.email      = null;
        state.auth_user.avatar     = null;
        state.auth_user.role       = null;
        state.auth_user.uuid       = null;
    },


    CHANGE_TEST_M(state,data){
        state.auth_user.name = data;
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

                // console.log('dfatadfatadfatadfatadfata');
                // console.log(response.data);
                // console.log(response.data.user);
                // console.log('dfatadfatadfatadfatadfata');
                
                var token = response.data.token;
                var user = response.data.user;
                user.uuid = response.data.uuid;


                // set token
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                localStorage.setItem('access_token',token);
                context.commit('SET_TOKEN_M',token);
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                // set token

                

                // set user details                
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                localStorage.setItem('uuid'       ,user.uuid); // change this later to the real uuid
                localStorage.setItem('name'       ,user.firstname+" "+user.lastname);
                localStorage.setItem('firstname'  ,user.firstname);
                localStorage.setItem('lastname'   ,user.lastname);
                localStorage.setItem('email'      ,user.email);
                localStorage.setItem('avatar'     ,user.avatar);
                localStorage.setItem('role'       ,user.role);
                context.commit('SET_AUTHUSER_M',user);
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                // set user details 


                // reset notifications
                // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                context.dispatch('ntfctns/resetNotification_a', null, { root: true });
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
        console.log("headers");
        console.log(headers);
        console.log(localStorage.getItem('access_token'));

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
                    context.dispatch('ntfctns/resetNotification_a', null, { root: true });

                    // unsubscribe to socket                    
                    context.dispatch('sckts/unsubscribeSocket_a', null, { root: true });

                    resolve(response);
                })
                .catch(error => {
                    localStorage.clear();
                    context.commit('DESTROY_TOKEN_M');
                    context.commit('DESTROY_AUTHUSER_M');

                    // reset notifications                    
                    context.dispatch('ntfctns/resetNotification_a', null, { root: true });
                    
                    // unsubscribe to socket                    
                    context.dispatch('sckts/unsubscribeSocket_a', null, { root: true });

                    reject(error)
                })
            });
        // }
    },

    loginSuccess_a(context){

        if(hlprs.methods.isRole('admin')) 
        router.push({name:'AdminHome'});
        else if(hlprs.methods.isRole('buyer')) 
        router.push({name:'BuyerHome'});
        else if(hlprs.methods.isRole('supplier')) 
        router.push({name:'SupplierHome'});
        else
        router.push({name:'Login'});

    },
}


const getters = {
	isLoggedIn_g(state){
	    return state.token !== null;
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}





// http://192.168.1.200:8000/v1/login
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