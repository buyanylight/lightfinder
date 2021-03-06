import { store } from '@/store'
import config from '@/config/index'
import helpers from '@/mixins/helpers'



export default  (to, from, next) => {

	// console.log('auth/isLoggedIn_g xxxxxxxxx');
	// console.log(store.getters['auth/isLoggedIn_g']);
	
	// console.log('auth/role xxxxxxxxx');
	// console.log(store.state.auth.auth_user.role);
	
	// console.log('meta role xxxxxxxxx');
	// console.log(to.matched[to.matched.length-1].meta.role);

	// console.log('meta redirectToRole xxxxxxxxx');
	// console.log(to.matched[to.matched.length-1].meta.redirectToRole);

	// console.log('to.matched xxxxxxxxx');
	// console.log(to.matched);

	// console.log('TOTOTOTOTO');
	// console.log(to);
	// console.log('TOTOTOTOTO');

	if (to.matched.some(record => record.meta.requiresAuth)) {

		// console.log('xxxxxxxxx');
		// if not logged in then logout user
		if (!store.getters['auth/isLoggedIn_g']) {
			console.log("!!LOGOUT!! !store.getters['auth/isLoggedIn_g']");
			next({name: 'Logout'});
		}
		// when / is accessed it should redirect to homepage of logged in user
		else if(to.matched[to.matched.length-1].meta.redirectToRole){

			// console.log('store.state.auth.auth_user.role',store.state.auth.auth_user.role);
			// console.log('config.auth.role.buyer.id',config.auth.role.buyer.id);

			
			// All are set to Home because the router was set to only include User Based Routes and
			// will have issues if you set name: Admin if before the login was a buyer.
			if(store.state.auth.auth_user.role==config.auth.role.admin.id){
				// console.log('AdminHome');
				// next({name: 'Home'})
				next({name: 'AdminHome'})
			}
			else if(store.state.auth.auth_user.role==config.auth.role.buyer.id) {
				// console.log('BuyerHome');
				// next({name: 'Home'});
				next({name: 'BuyerHome'})
			}
			else if(store.state.auth.auth_user.role==config.auth.role.supplier.id) {
				// console.log('SupplierHome');
				// next({name: 'Home'})				
				next({name: 'SupplierHome'})
			}
			else {
				// console.log('LOGOUT!!!!!!!!!!!!!!!!!!!!!!');
				console.log("!!LOGOUT!! NO ROLE DETECTED");
				next({name: 'Logout'})
			}
		}

		// if route is not for current user then logout user
		else if(to.matched[to.matched.length-1].meta.role != store.state.auth.auth_user.role){
			// console.log(to.matched[to.matched.length-1].meta.role);
			console.log("!!LOGOUT!! to.matched[to.matched.length-1].meta.role != store.state.auth.auth_user.role");
			next({name: 'Logout'})
		}

		else {
			next()
		}

	} 

	else if(!to.matched.length) {
		// next({name: 'Home'});
		next({name: 'Logout'})
	} 

	else {
		next() // make sure to always call next()!
	}
}

