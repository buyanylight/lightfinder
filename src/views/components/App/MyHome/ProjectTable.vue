<template>
<v-container pt-0 fluid grid-list-xl>
<!-- <div> -->

<v-layout mb-3 mt-2 row wrap justify-space-between align-center>
	<h4 class="white--text">Project Inquiries</h4>
	<create-project ></create-project>
</v-layout>


<v-layout 
v-if="items.length"
row wrap justify-space-between align-center>
	<v-data-iterator 1
	style="width:100%;"
	:items="items" 
	:rows-per-page-items="rowsPerPageItems" 
	:pagination.sync="pagination" 
	content-tag="v-layout" 
	row wrap>
	    <template v-slot:item="sp">
	        <v-flex xs6 >
	            <v-card>
	                <v-card-title>
	                	<v-layout row wrap justify-space-between align-center>
		                    <h2 class="ma-2" style="line-height: normal;">
		                    	<span style="text-transform: uppercase;">{{ sp.item.name }}</span> <br>
		                    	<span style="font-size: 0.8em; font-weight: normal;">{{ sp.item.id }}</span>
		                    </h2>

		                    <slot name="project-link" :item="sp.item"></slot>

	                	</v-layout>
	                </v-card-title>
	                
	                <v-divider></v-divider>

	                <v-card-text>
	                	<v-layout row wrap>
	                		<v-flex xs6>                			
	                			<span class="body-1 mr-2">Project Type: </span>
	                			<span class="subheading font-weight-bold">{{ sp.item.type }}</span>
	                		</v-flex>
	                		<v-flex xs6>                			
	                			<span class="body-1 mr-2">Target Budget: </span>
	                			<span class="subheading font-weight-bold">${{ currency(sp.item.budget) }}</span>
	                		</v-flex>
	                	</v-layout>
						<p class="mt-2" style="min-height: 150px;">{{ sp.item.description }}</p>
	                </v-card-text>                
	            </v-card>
	        </v-flex>
	    </template>
	</v-data-iterator>
</v-layout>



<v-layout 
v-else
row wrap justify-space-between align-center>
<v-flex xs12>  
<v-card>  
	<v-card-text style="height:300px;">
		<v-layout row wrap fill-height justify-center align-center>		  
		 	<h2>No projects...</h2>
		</v-layout>
	</v-card-text>
</v-card>
</v-flex>
</v-layout>

<!-- </div> -->
</v-container>
</template>



<script>
import CreateProject from '@/views/Components/App/Buyer/MyHome/CreateProject'
import prjctEvntBs from '@/bus/project'



export default {

components:{
	CreateProject,
},

data:() => ({  
    rowsPerPageItems:[  
        4,
        8,
        12
    ],
    pagination:{  
        rowsPerPage:4
    },
    items:[],

}),

created(){	
	this.getProjects();
	prjctEvntBs.onRefreshProjectTable(() => {
		this.getProjects();
	});
},

methods:{

	getProjects(){
		this.$store.dispatch(this.getStore('myHm')+'/getProjects_a')
		.then((rspns)=>{

			console.log(rspns);

			var pt =  this.$route.meta.package_type;
			console.log(pt);

			this.items = rspns.filter((item) => {
				return item.package_type == pt;
			});

		})
		.catch((e)=>{
			console.log(e);
		});

	}

},



}
</script>



<style scoped lang="scss">
/deep/ .v-data-iterator__actions__select,
/deep/ .theme--light.v-data-iterator .v-data-iterator__actions {
	text-shadow: 0px 0px 1px #fff;
	font-size: 15px;
}

/deep/ .theme--light.v-data-iterator .v-data-iterator__actions__select .v-select .v-select__selection--comma,
/deep/ .theme--light.v-select .v-select__selections,
/deep/ .v-data-iterator__actions__select,
/deep/ .theme--light.v-data-iterator .v-data-iterator__actions {
	color: #fff  !important;
}

/deep/ .v-select__slot {
	color: #fff;
    text-shadow: 0px 0px 1px #fff;
}

/deep/ .theme--light.v-icon {
	color: rgba(255, 255, 255, 0.54);
}

/deep/ .theme--light.v-text-field .v-input__slot:before {
	border-color: rgba(255, 255, 255, 0.42);
}

/deep/ .v-text-field.v-input--is-focused .v-input__slot:after,
/deep/ .theme--light.v-text-field:not(.v-input--has-state) .v-input__slot:hover:before {
	border-color: rgba(255, 255, 255, 0.42);	
}
</style>



