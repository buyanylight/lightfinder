<template>
<div>

<v-toolbar 
v-if="toolbar"
:fixed="fixedToolbar" 
:class="navToolbarScheme" 
:clipped-left="toolbarClippedLeft" 
style="border-bottom: 1px solid #e8e8e8;"
app flat>

    <!-- <v-toolbar-side-icon
      class="hidden-lg-and-up"
      @click.stop="$store.dispatch('toggleDrawer', ! navDrawer)"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title" class="ml-0 hidden-lg-and-up"></v-toolbar-title>
    <v-btn
      icon
      light
      class="hidden-md-and-down"
      @click.stop="toggleMiniVariantMode" 
    >
      <v-tooltip bottom v-if="navMiniVarient" color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
        <span>Expand</span>
      </v-tooltip>
      <v-tooltip bottom v-else color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
        <span>Collapse</span>
      </v-tooltip>
    </v-btn> -->

    <!-- <v-btn icon :to="{name: 'Contacts'}" flat>
      <v-icon>contacts</v-icon>
    </v-btn>

    <v-btn icon :to="{name: 'Chat'}" flat>
      <v-icon>chat</v-icon>
    </v-btn>  -->

    <!-- <v-icon>far fa-bell</v-icon> -->

    <!-- bell notifications -->
    <!-- bellbellbellbellbellbellbellbellbellbellbellbellbellbellbellbellbellbellbell -->
    <v-menu offset-y transition="scale-transition" allow-overflow fixed>    	
        <template v-slot:activator="{ on }">
            <v-btn flat icon v-on="on">
                <v-badge color="red">
                    <template v-slot:badge  v-if="unread>0">
                        <span style="font-size:10px;">{{ unread }}</span>
                    </template>
                    <v-icon :class="{ bounce: isBounceNtfctns }">far fa-bell</v-icon>
                </v-badge>
            </v-btn>
        </template>

        <v-list 
        v-if="notifications && notifications.length"
        id="notification_list" 
        ref="notification_list" 
        dense>
        	<!-- v-if="index <= 10" -->
            <template v-for="(notification, index) in notifications">
                <v-list-tile  :key="'not_'+index" @click="gotoNotfication(notification,'normalType')">
                    <!-- <v-list-tile-title>{{notification.title  }}</v-list-tile-title> <br/> -->
                    <v-list-tile-sub-title 
                    :class="notification.isRead ? 'grey--text' : 'black--text'">
                		{{ notification.title }} 
                	</v-list-tile-sub-title>
                </v-list-tile>
                 <v-divider :key="'divider_'+index"></v-divider>
            </template>

            <!-- loading for mugen infinite scroll -->
            <mugen-scroll 
            v-if="showNtctnsLoading  && notifications.length > limit"
            :handler="fetchNtfctns" 
            :should-handle="!ntfctnsIsLoading" 
            :threshold="1"
            scroll-container="notification_list">
                <v-list-tile class="mugen-loading">
                    <v-list-tile-sub-title style="text-align: center;">
                    	<v-icon class="ma-4">fas fa-circle-notch fa-spin</v-icon>
                    </v-list-tile-sub-title>
                </v-list-tile>
			</mugen-scroll>
            <!-- loading for mugen infinite scroll -->


           <!--  <v-list-tile class="bottom-tile">
                <v-list-tile-sub-title class="black--text text-xs-center">
                	<v-layout>
                		<v-btn flat color="">Read All</v-btn>
                	</v-layout>
                </v-list-tile-sub-title>
           	</v-list-tile> -->
        </v-list>
		
    	<v-layout justify-end class="bottom-tile" v-if="notifications && notifications.length">
    		<v-btn flat small color="dark" @click="readAll('normalType')" :loading="ntfctnRALdng">Read All</v-btn>
    	</v-layout>


    </v-menu>
    <!-- bellbellbellbellbellbellbellbellbellbellbellbellbellbellbellbellbellbellbell -->
    <!-- bell notifications -->


    <!-- msg notifications -->
    <!-- msgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsg -->
    <v-menu offset-y transition="scale-transition" allow-overflow fixed>
        <template v-slot:activator="{ on }">
            <v-btn flat icon v-on="on" class="ml-4">
                <v-badge color="red">
                    <template v-slot:badge  v-if="unreadMsg>0" >
                        <span style="font-size:10px;">{{ unreadMsg }}</span>
                        <!-- <span>99</span> -->
                    </template>
                    <v-icon :class="{ bounce: isBounceMsgs }">far fa-envelope</v-icon>
                </v-badge>
            </v-btn>
        </template>
		
		<!-- <pre>{{ notificationMsgs }}</pre> -->
		<!-- <pre>{{ notificationMsgs.length }}</pre> -->

        <v-list 
		v-if="notificationMsgs && notificationMsgs.length"
        id="message_list" 
        ref="message_list" 
        dense>
            <template v-for="(notificationMsg, index) in notificationMsgs">
                <v-list-tile  :key="'not_'+index" @click="gotoNotfication(notificationMsg,'messageType')">
                    <!-- <v-list-tile-title
                    :class="notification.isRead ? 'grey--text' : 'black--text'">
                    	{{notification.title}}
                    </v-list-tile-title>  -->
                    <v-list-tile-sub-title 
                    :class="notificationMsg.isRead ? 'grey--text' : 'black--text'">
                		<!-- {{ notificationMsg.title }}  -->
                		<span v-html="notificationMsg.title"></span>
                	</v-list-tile-sub-title>
                </v-list-tile>
                 <v-divider></v-divider>
            </template>

            <!-- loading for mugen infinite scroll -->
            <mugen-scroll
            :handler="fetchMsgs" 
            :should-handle="!msgsIsLoading"
            :threshold="1"
            scroll-container="message_list">
                <v-list-tile 
                v-if="showMsgsLoading  && notificationMsgs.length > limit"
                class="mugen-loading">
                    <v-list-tile-sub-title style="text-align: center;">
                    	<v-icon class="ma-4">fas fa-circle-notch fa-spin</v-icon>
                    </v-list-tile-sub-title>
                </v-list-tile>
			</mugen-scroll>
            <!-- loading for mugen infinite scroll -->

            <!-- <v-list-tile @click="">
                <v-list-tile-sub-title class="black--text text-xs-center">See All</v-list-tile-sub-title>
           	</v-list-tile> -->
        </v-list>

    	<v-layout justify-end class="bottom-tile" v-if="notificationMsgs && notificationMsgs.length">
    		<v-btn flat small color="dark" @click="readAll('messageType')" :loading="msgsRALdng">Read All</v-btn>
    	</v-layout>

		
    </v-menu>
    <!-- msgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsgmsg -->
    <!-- msg notifications -->


	<!-- test -->
	<!-- ttttttttttttttttttttttttttttttttttttttttt -->    
    <!-- <v-icon 
    :class="{ bounce: isBounce }"
    style="margin: 0 50px 0 50px;">
    	fas fa-frog
	</v-icon>
	<v-btn @click="bounce()">bounce</v-btn> -->
	<!-- ttttttttttttttttttttttttttttttttttttttttt -->
	<!-- test -->
	
	<inquiry-counter v-if="isRole('buyer') && $route.meta.package_type!='my-home' && $route.meta.package_type!='my-tower' "></inquiry-counter>

    <v-spacer></v-spacer>

    <v-menu offset-x fixed>
        
        <!-- <v-avatar slot="activator" size="40">
            <div :style="avatarBgImage"></div>
        </v-avatar> -->

        <template v-slot:activator="{ on }">        
	        <v-avatar v-on="on" size="40" 
	        style="min-width: 40px; cursor: pointer;">
	            <div :style="avatarBgImage"></div>
	        </v-avatar>
    	</template>

        <!-- <v-list dense  style="position: fixed;"> -->
        <v-list dense >

            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <div :style="avatarBgImage">
                    </div>
                    <!-- <img :src="authUser.avatar" :alt="authUser.name"> -->
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>
                    	{{ authUser.name }}
                    </v-list-tile-title>

                    <v-list-tile-sub-title v-if="authUser.role==roles.admin.id">Administrator</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else-if="authUser.role==roles.buyer.id">Buyer</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else-if="authUser.role==roles.supplier.id">Supplier</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else>Unknown</v-list-tile-sub-title>

                </v-list-tile-content>

            </v-list-tile>

            <br>


    		<template v-for="(profileItem, i) in profileItems">
            <v-divider></v-divider>
            <v-list-tile 
            @click="goToRoute(profileItem.name)" 
            :key="`${i}-item`">
            	<v-list-tile-avatar>
                    <v-icon>{{ profileItem.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{ profileItem.title }}</v-list-tile-title>            	
            </v-list-tile>
			</template>
            
<!-- 
            <v-list-tile @click="() => {}">
                <v-list-tile-avatar>
                    <v-icon>settings_applications</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click="() => {}">
                <v-list-tile-avatar>
                    <v-icon>mail</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Inbox</v-list-tile-title>
            </v-list-tile>
 -->
            <v-divider></v-divider>

            <v-list-tile @click="logout()">
                <v-list-tile-avatar>
                    <v-icon>power_settings_new</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Sign Out</v-list-tile-title>
            </v-list-tile>

        </v-list>

    </v-menu>

</v-toolbar>

<v-snackbar 
:value="showSnackbar" 
:timeout="timeoutSnackbar"
right
top
multi-line
color="white"
v-if="sbNtfctnData"
style="cursor: pointer;">
    <h4 style="color:#000;" @click="showSnackbar = false">
        {{ sbNtfctnData }}
    </h4>
    <v-btn color="pink" flat @click="showSnackbar = false">
        Close
    </v-btn>
</v-snackbar>




</div>
</template>













<script>

import InquiryCounter from "@/views/Components/App/Buyer/InquiryCounter";

import { mapGetters } from 'vuex'
import config from '@/config/index'

import hlprs from "@/mixins/helpers";
// console.log(config);

import NtfctnBus from "@/bus/notification";
import MsgBus from "@/bus/messaging";

import MugenScroll from 'vue-mugen-scroll'

import { forEach } from 'lodash'

export default {
mixins:[
	hlprs,
],

components: {
	MugenScroll,
	InquiryCounter,
},

data() { return {
    title: 'BuyAnyLight.com',
    roles: config.auth.role,

    profileItems: this.$route.meta.profileItems,

    timeoutSnackbar: 8000,
    notificationList:null,
    isReadnow:false,
    isReadColor: 'grey--text',
    isunReadColor: 'black--text',

    isBounceNtfctns: false,
    isBounceMsgs: false,

    msgsIsLoading: false,
    ntfctnsIsLoading: false,

    showNtctnsLoading:true,
    showMsgsLoading:true,

    offsetNtfctns:0,
    offsetMsgs:0,

    limit: 20,


	ntfctnRALdng: false,
	msgsRALdng: false,

}},

computed: {
    ...mapGetters({
        navDrawer: 'navDrawer',
        toolbarClippedLeft: 'toolbarClippedLeft',
        fixedToolbar: 'fixedToolbar',
        toolbar: 'toolbarVisibility',
        navToolbarScheme: 'navToolbarScheme',
        navMiniVarient: 'navMiniVarient'
    }),

    authUser () {        
        return this.$store.state.auth.auth_user;
    },

    testVuex () {        
        return this.$store.state.auth.test_vuex;
    },

    avatarBgImage() {

    	// console.log(config.main.websiteURL);
      
      	if(!this.$store.state.auth.auth_user.avatar || this.$store.state.auth.auth_user.avatar == 'null' ) {
	      	// default image to be download later - https://image.flaticon.com/icons/svg/149/149071.svg
	      	this.$store.state.auth.auth_user.avatar = config.main.websiteURL+'/static/gender-neutral.png';
      	}

    	// console.log('this.$store.state.auth.auth_user.avatar',this.$store.state.auth.auth_user.avatar);

        return {
            backgroundImage:'url('+this.$store.state.auth.auth_user.avatar+')',
        };
    },

    // bell ntfctns
	unread() {
		return this.$store.state.ntfctns.unread
	},

    notifications(){
        return this.$store.state.ntfctns.notifications;
    },

    // msg ntfctns
	unreadMsg() {
		return this.$store.state.ntfctns.unreadMsgs
	},

    notificationMsgs(){
        return this.$store.state.ntfctns.notificationsMsgs;
    },


    showSnackbar:{
        get(){
            return this.$store.state.ntfctns.showSnackbar;
        },
        set(nVal){
            if(nVal)
            this.$store.commit('ntfctns/SHOW_SNACKBAR_M');
            else
            this.$store.commit('ntfctns/HIDE_SNACKBAR_M');
        },
    },

    sbNtfctnData(){
        return this.$store.state.ntfctns.dataSnackbar;
    },

},








methods: {


    toggleMiniVariantMode () {
      this.$store.dispatch('toggleMiniVariantMode')
      this.$store.dispatch('toggleMiniVarient')
    },

    logout() {
        this.$router.push({name:'Logout'});
    },

    goToRoute(routeName) {
    	// var routeName = '';
     //    if(hlprs.methods.isRole("admin"))
    	// routeName = 'AdminProfile'; 
     //    else if(hlprs.methods.isRole("buyer"))
    	// routeName = 'BuyerProfile';         
     //    else if(hlprs.methods.isRole("supplier"))
    	// routeName = 'SupplierProfile';         

        this.$router.push({name:routeName});
    },

    bounce(type){
    	// console.log('type = ',type)

    	if(type=='notifications') {
    		this.isBounceNtfctns = true;
			setTimeout(() => { this.isBounceNtfctns = false; },5000);
    	}
    	else 
    	if(type=='messages') {
    		this.isBounceMsgs = true;
			setTimeout(() => { this.isBounceMsgs = false; },5000);
    	}
    },


    // notifications
    // /////////////////////////////////////////////////////////
    resetNotifications() {
		// console.log('resetNotifications');
    	var options = {
    		offset: 0,
    		limit: this.limit,
    	};
        this.$store.dispatch('ntfctns/populateNotifications_a', options)
        .then((response) => {

        	// Now notifications are done populating show snackbar
        	this.$store.commit('ntfctns/SHOW_SNACKBAR_M');
			this.offsetNtfctns = this.limit;
        })
        .catch((e) => {
            console.log(e);
        });

    },
    // /////////////////////////////////////////////////////////
    // notifications




    // notifications messages
    // /////////////////////////////////////////////////////////
    resetNotificationsMsgs() {
		// console.log('resetNotificationsMsgs');
        var options = {
    		offset: 0,
    		limit: this.limit,
    	};
    	this.$store.dispatch('ntfctns/populateNotificationsMsgs_a', options)
        .then((response) => {

        	// Now notifications are done populating show snackbar
        	this.$store.commit('ntfctns/SHOW_SNACKBAR_M');

			this.offsetMsgs = this.limit;
        })
        .catch((e) => {
            console.log(e);
        });

    },
    // /////////////////////////////////////////////////////////
    // notifications messages






    test(){
    	alert('test');
    },


	readAll(ntfctnType){
		this.ntfctnRALdng = true;
		this.msgsRALdng = true;

    	this.$store.dispatch('ntfctns/readAll_a',{
    		ntfctnType,
    	})
    	.then((rspns)=>{

    		if(ntfctnType=='normalType') {	    		
	    		this.notifications.forEach((item,i)=>{
	    			item.isRead = true;
	    		});
    		}
    		else if(ntfctnType=='messageType') {
	    		this.notificationMsgs.forEach((item,i)=>{
	    			item.isRead = true;
	    		});
    		}
			
    	})
    	.finally((rspns)=>{
			this.ntfctnRALdng = false;
			this.msgsRALdng = false;
    	});
	},

    
    // gotonotification
    // /////////////////////////////////////////////////////////

    gotoNotfication(ntfctn,ntfctnType){
    	console.log('ntfctn',ntfctn);
        this.showSnackbar = false;
        this.$store.dispatch('ntfctns/gotoNotfication_a',ntfctn);
    	this.$store.dispatch('ntfctns/markNotifasRead_a',{
    		ntfctn,
    		ntfctnType,
    	})
    	.then((rspns)=>{
			ntfctn.isRead = true;
    	});
        // console.log(this.$refs);

    },

    // /////////////////////////////////////////////////////////
    // gotonotification




    // infinite-scroll
    //////////////////////////////////////////////////////////
	fetchNtfctns () {
		// console.log('fetchNtfctns');
		this.ntfctnsIsLoading = true

    	var options = {
    		offset: this.offsetNtfctns,
    		limit: this.limit,
    	};
        this.$store.dispatch('ntfctns/populateNotifications_a', options)
        .then((response) => {

            if(response.count>0) {        	
	        	// Now notifications are done populating show snackbar
	        	this.$store.commit('ntfctns/SHOW_SNACKBAR_M');			
				this.ntfctnsIsLoading = false;
				this.offsetNtfctns = this.offsetNtfctns+this.limit;
	            this.showNtctnsLoading = true;
            }
	        else 
	        this.showNtctnsLoading = false;

            
        })
        .catch((e) => {
            console.log(e);
        });		

	},

	fetchMsgs () {
		// console.log('fetchMsgs');
        this.msgsIsLoading = true

        var options = {
    		offset: this.offsetMsgs,
    		limit: this.limit,
    	};
    	this.$store.dispatch('ntfctns/populateNotificationsMsgs_a', options)
        .then((response) => {
            // console.log('fetchMsgs response',response);

            if(response.count>0) {
	        	// Now notifications are done populating show snackbar
	        	this.$store.commit('ntfctns/SHOW_SNACKBAR_M');
		        this.msgsIsLoading = false;
				this.offsetMsgs = this.offsetMsgs+this.limit;
	            this.showMsgsLoading = true;
            }
	        else 
	        this.showMsgsLoading = false;

            // console.log("this.offsetMsgs",this.offsetMsgs);
        })
        .catch((e) => {
            console.log(e);
        });      


	},

	insertLatestNtfctn(){

	},

	insertLatestMsg(){

        var options = {
    		offset: 0,
    		limit: 1,
    		insertMethod:'unshift',
    	};
    	this.$store.dispatch('ntfctns/populateNotificationsMsgs_a', options)
        .then((response) => {

        })
        .catch((e) => {
            console.log(e);
        });      


	},

    //////////////////////////////////////////////////////////
    // infinite-scroll


},

created()  {
	// this.resetNotificationsMsgs()
	// this.resetNotificationsMsgs()
	this.fetchNtfctns();
	this.fetchMsgs();

    NtfctnBus.onNewNotification((data)=>{
    	// console.log('toolbar onNewNotification data',data);
    	this.bounce('notifications');
    	this.offsetNtfctns++;
		this.insertLatestNtfctn();
		// this.resetNotificationsMsgs();
    });
	MsgBus.onNewMessage((data)=>{
    	// console.log('toolbar onNewMessage data',data);
    	this.bounce('messages');
    	this.offsetMsgs++;
		this.insertLatestMsg();
	});
}



}
</script>



<style lang="scss" scoped>

.v-avatar {
    div {
        overflow: hidden;
        height: 100%;
        width: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        img {
            height: auto;
            border-radius: 0;
        }
    }
}

.read {
	color: gray;
}

#notification_list {
	max-height: 495px;
	overflow-y: auto;
    padding-bottom: 0;
    // padding-top: 0;
}

#message_list {
	max-height: 500px;
	overflow-y: auto;
}


.mugen-loading {
	height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 8px;
}

// /deep/ .v-menu__content {
// 	position: fixed;
// }


.bottom-tile {
	background: #fff;
    border-top: 1px solid #e0e0e0;	

    /deep/ .v-btn__content {
    	font-size: 12px;
	    font-weight: bold;
    }
    /deep/ .v-btn__loading {
    	color: #000;
    	.v-progress-circular {
			height: 15px !important;
			width: 15px !important;
    	}
    }
}

</style>
