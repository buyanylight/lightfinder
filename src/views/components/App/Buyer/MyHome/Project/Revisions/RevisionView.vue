<template>
<span>
	<v-container fluid grid-list-xl>
		<v-layout row wrap>
			
			<v-flex xs12 class="white--text">
				<router-link :to="{name:package.routeName.main}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						{{ package.title }}
					</h3>
				</router-link> 
				/
				<router-link :to="{name:package.routeName.project, params:{proj_id:proj_id}}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						Project {{ proj_id }}
					</h3>
				</router-link> 
				/
				<h3 class="d-inline-block ml-2">Revision {{ revision.revision }} </h3>
			</v-flex>

			<v-flex xs12>

				<v-card>
					<v-card-text class="item-box">
					<v-layout row wrap>						  

						<v-flex xs12>
							<v-layout row wrap justify-space-between align-center py-3 px-3>
								<h1 class="d-inline-block">
									{{ revision.revision }} <span class="font-weight-regular title">({{ rev_id }})</span>
								</h1>

								<router-link 
								v-if="project.selected_quotation_id == rev_id || project.stage_id!=1004"
								:to="{name:package.routeName.orderSamples, params:{proj_id:proj_id,rev_id:rev_id}}">
									<v-btn class="black white--text">
										order samples
									</v-btn>
			                    </router-link>
		                	</v-layout>
						</v-flex>

						<v-flex xs4>
							<revision-view-summary :revision="revision"></revision-view-summary>
						</v-flex>

						<v-flex xs8>
							<revision-view-table :revision="revision"></revision-view-table>
						</v-flex>

						<v-flex xs12>
							<v-card>
								<v-card-text>
									<messaging :proj_id="proj_id"></messaging>
								</v-card-text>
							</v-card>					
						</v-flex>

					</v-layout>

					</v-card-text>
				</v-card>

			</v-flex>
		</v-layout>
	</v-container>





</span>	
</template>

<script>
import Messaging from "@/views/Components/App/Buyer/MyHome/Project/ProjectViewMessagingBox"
import RevisionViewTable from "@/views/Components/App/Buyer/MyHome/Project/Revisions/RevisionViewTable";
import RevisionViewSummary from "@/views/Components/App/Buyer/MyHome/Project/Revisions/RevisionViewSummary";
import PackageMixin from '@/mixins/Package'

export default {

	components:{
		Messaging,
		RevisionViewTable,
		RevisionViewSummary,
	},
	
	mixins: [PackageMixin],

	data() { return {
		project: {},
		revision: {},
	}},

	created(){
		this.getRevision();	
		this.getProject();
	},

	methods: {

	    getRevision(){
	    	this.$store.dispatch(this.getStore('myHm')+'/getQuotation_a',{
	    		proj_id: this.proj_id,
	    		rev_id: this.rev_id,
	    	})
	    	.then((rspns)=>{
	    		this.revision = rspns;
	    	})
	    	.catch((e)=>{
	    		console.log(e);
	    	});
	    },
		
		getProject(){
			// console.log('xxxxxxx'+this.getStore('myHm')+'/getProject_a');
			this.$store.dispatch(this.getStore('myHm')+'/getProject_a',{
				proj_id:this.proj_id,
			})
			.then((rspns)=>{
				this.project = rspns;
			})
			.catch((e)=>{
				console.log(e);
			});
		},
	},


	computed:{
		proj_id(){
			return this.$route.params.proj_id;
		},
		rev_id(){
			return this.$route.params.rev_id;
		},
	
	},


}	
</script>


<style scoped lang="scss">

.item-table /deep/ {
	width: 100%;
	table {
		thead {
			th {
				.v-icon {
					margin-left: 10px;
				}
			}
		}
		tbody {
			tr {
				td {
					img {
						// width: 150px;
						// margin-left: 0px;
						// margin-right: 20px;
						// margin-top: 20px;
						// margin-bottom: 20px;
					}
				}
			}
		}
	}
}	
</style>