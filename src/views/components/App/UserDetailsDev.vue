<template>
	<div>
		
		    <!-- devMode -->
		    <!-- dddddddddddddddddddddddddddddddddddddddddd -->
		    <template v-if="devMode">
		    <v-btn 
		    center
		    style="text-transform: none;"
			:style="style">
		        <h3 class="mr-4 ml-4">{{ authUser.email }}</h3>
		        <h3 class="mr-4">{{ authUser.name }}</h3>
		        <!-- <h3 class="mr-4">{{ authUser.uuid }}</h3> -->
		        <h3 class="mr-4" v-if="authUser.role==roles.admin.id">ADMIN</h3>
		        <h3 class="mr-4" v-else-if="authUser.role==roles.buyer.id">BUYER</h3>
		        <h3 class="mr-4" v-else-if="authUser.role==roles.supplier.id">SUPPLIER</h3>		        
		    </v-btn>
		    <!-- <p><pre>{{ configMain }}</pre></p> -->
		    </template>
		    <!-- dddddddddddddddddddddddddddddddddddddddddd -->
		    <!-- devMode -->

	
	</div>
</template>


<script>
import config from '@/config/index'
import hlprs from "@/mixins/helpers";
	
export default {

data() { return {
    roles: config.auth.role,
    devMode: config.main.devMode,
    configMain: config.main,
}},

computed: {
    authUser () {
        return this.$store.state.auth.auth_user;
    },

    style(){
        var style = '';
        
        
        // Dev mode, some markers for easier to know the user and type.
        if(this.devMode) {
            if(hlprs.methods.isRole("admin"))
            style = 'background-color:yellow !important; color:#fff; text-shadow: 1px 1px 7px black;';
            else if(hlprs.methods.isRole("buyer"))
            style = 'background-color:blue !important; color:#fff; text-shadow: 1px 1px 7px black;';
            else if(hlprs.methods.isRole("supplier"))
            style = 'background-color:red !important; color:#fff; text-shadow: 1px 1px 7px black;';
        }
        
        return style;
    },    
},


};

</script>