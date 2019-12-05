<template>
  <v-layout column wrap class="pos-relative">
    <v-flex xs12 center-align>
      <v-layout wrap>
        <v-flex xs12 class="text-xs-center">
			
			<div class="headline">Password Reset Successfull!</div>

			
        </v-flex>
      </v-layout>
        <v-container grid-list-xl fluid>
          	<v-layout wrap pa-4>
	            <v-flex xs12 px-2>
	              	<v-layout row wrap text-xs-center>
		                <!-- Login form submit -->
		                <v-flex xs12 class="no-mrpd">
		                  		
		                  		<router-link :to="{ name: 'Logout'}">
				                  	<v-btn flat class="black white--text mt-4">
				                  			Go to Login Page
				                  	</v-btn>
		                  		</router-link>
		                  		
		                </v-flex>
	              	</v-layout>
	            </v-flex>
          	</v-layout>
        </v-container>
    </v-flex>
  </v-layout>
</template>

<script>

import config from '@/config/index';

export default {


    created () {

    },

    data () { return {
    	loginUrl: config.main.websiteURL,
    }},

    methods: {

    },

    watch: {

    },
}
</script>


<style scoped lang="scss">
.theme--light.v-btn.v-btn--disabled {
	color: rgba(255, 255, 255, 0.31) !important;
}

.theme--light.v-btn.v-btn--disabled /deep/ .v-btn__loading {
    color: rgba(255, 255, 255, 1) !important;
}
</style>
