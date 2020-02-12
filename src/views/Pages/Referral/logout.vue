<template>
</template>


<script>
import config from '@/config/index'

export default {

	data: () => ({

	}),

	methods: {

	},

	created: function() {
        this.$store.dispatch('auth/logout_a')
        .then(response=>{

            // console.log("logout_a = "+config.auth.roleIndex[this.$store.state.auth.auth_user.role]);
            // alert("logout_a = "+config.auth.roleIndex[this.$store.state.auth.auth_user.role]);
                        
            // this.$router.push("/login");
            window.location.href = this.$router.resolve({name:'ReferralLogin'}).href;

        })
        .catch(error=>{
            console.log(error);           
            // this.$router.push("/login");
            window.location.href = this.$router.resolve({name:'ReferralLogin'}).href;
        });
        
	},
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
