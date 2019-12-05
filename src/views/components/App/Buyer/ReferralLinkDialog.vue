<template>
	<div class="">
	    <v-layout row justify-center>

	    <v-dialog
	    width="600"
	    :value="dialog" 
	    @input="closeDialog()" >

	        <v-card >
	          	<!-- <v-toolbar dark color="dark">
		            <v-toolbar-title>
		            	Referral URL
		            </v-toolbar-title>
		            <v-spacer></v-spacer>
					<v-btn icon @click="closeDialog()">
						<v-icon>close</v-icon>
					</v-btn>		            
	          	</v-toolbar> -->
			    
			    <v-container fluid>
				    <v-layout row wrap>
						<v-flex xs12>
				    		<v-layout row wrap>
								<h2>Referral URL</h2>
					            <v-spacer></v-spacer>
								<v-btn icon @click="closeDialog()">
									<v-icon>close</v-icon>
								</v-btn>
							</v-layout>
						</v-flex>
						<v-flex xs12 mt-4 mb-2 pl-3 pr-3>
			        		<v-text-field 
			        		id="referralUrl"
			        		readonly
			        		:value="'https://buyanylight.com/ieo?code='+authUser.referral_code+'#section-bal-token'"
			        		:append-outer-icon="'fas fa-copy'"
							@click:append-outer="copyLink"></v-text-field>
						</v-flex>
						<v-flex xs12 style="text-align: center;">
							<h4 v-if="linkCopied">URL Copied!</h4>
							<h4 v-else>&nbsp;</h4>
						</v-flex>

					</v-layout>
			    </v-container>		
	        </v-card>
	      </v-dialog>

	    </v-layout>

	</div>

</template>

<script>

export default {

		props: {
			dialog: {
	            type: Boolean,
	            default: false,            
	        },
		},

		data () { return {
			linkCopied: false,
	    }},

	    methods: {
	    	closeDialog(){
	    		this.linkCopied = false;
				this.$emit('update:dialog', false);
	    	},

	    	copyLink(){
	    		// alert('Link Copied!');
				let input=document.getElementById("referralUrl");
				input.select();
				document.execCommand("copy");
	    		this.linkCopied = true;				
	    	},
	    },

		computed:{
		    authUser () {        
		        return this.$store.state.auth.auth_user;
		    },			
		},
	}

</script>

<style scoped>
	.buyerinquirydialog a {
		text-decoration: none;
	}
</style>