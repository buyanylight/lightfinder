<template>
	<div class="">
		<v-layout row justify-center>

		<v-dialog
		width="600"
		:value="dialog" 
		@input="closeDialog()">

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
				
				<v-container fluid pt-5>
					<v-layout row wrap>
						<v-flex xs12>
							<v-btn style="position: absolute; right: 0; top: 0;"
							icon @click="closeDialog()">
								<v-icon>close</v-icon>
							</v-btn>
						</v-flex>

						<v-flex xs12>
							<h4 class="mx-4 mt-0 mb-4" style="font-weight: normal;">
								Please send an email 
								<a href = "mailto: invest@buyanylight.com"><strong>invest@buyanylight.com</strong></a>
								along with your 
								referrel link and <strong>ETH address</strong> to claim your BAL token commissions
							</h4>
						</v-flex>


					</v-layout>
				</v-container>		
			</v-card>
		  </v-dialog>

		</v-layout>

	</div>

</template>

<script>
import config from '@/config/index';
import { forEach } from 'lodash'

export default {

		props: {
			dialog: {
				type: Boolean,
				default: false,            
			},
		},

		data () { return {


		}},

		created() {

		},

		methods: {
			closeDialog(){
				this.$emit('update:dialog', false);
			},
		},

		computed:{
			authUser () {        
				return this.$store.state.auth.auth_user;
			},
		},

		watch:{
			dialog: {
				handler(nVal,oVal){
					if(nVal){

					}
				},
			},
		},
	}

</script>

<style scoped lang="scss">
	.refTranxs {
		td {
			text-align: left;
		}
	}
</style>