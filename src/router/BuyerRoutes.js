import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'
import AppProfile from '@/views/Pages/Profile'


import AppToolbarMyHmMyTwr from '@/views/Components/App/ToolbarMyHmMyTwr'

import BuyerHome from '@/views/Pages/Buyer/Home'
// import BuyerInquiry from '@/views/Pages/Buyer/Inquiry'

import BuyerInvoice from '@/views/Components/App/Invoice'

import BuyerMyHome from '@/views/Pages/Buyer/MyHome'
import BuyerMyHomeUnderConstruction from '@/views/Pages/Buyer/MyHomeUnderConstruction'
import BuyerMyHomeProject from '@/views/Components/App/Buyer/MyHome/Project/ProjectView'
import BuyerMyHomeRevisionView from '@/views/Components/App/Buyer/MyHome/Project/Revisions/RevisionView'
import BuyerMyHomePayQuotation from '@/views/Components/App/Buyer/MyHome/PayQuotation/PayQuotationView'
import BuyerMyHomeOrderSamples from "@/views/Components/App/Buyer/MyHome/OrderSamples/OrderSamplesView"

// import BuyerMyTower from '@/views/Pages/Buyer/MyTower'
import BuyerMyTowerUnderConstruction from '@/views/Pages/Buyer/MyTowerUnderConstruction'
import BuyerMyTower from '@/views/Pages/Buyer/MyTower'

import config from '@/config/index'

import BuyerRegistration from '@/views/Pages/Buyer/Register'
import BuyerRegistrationDetails from '@/views/Pages/Buyer/RegisterDetails'
import BuyerRegistrationTerms from '@/views/Pages/Buyer/RegisterTerms'
import BuyerPackages from '@/views/Pages/Buyer/Packages'

import BuyerInquiryView from "@/views/Components/App/Buyer/InquiryView";


import UnderConstruction from '@/views/Pages/UnderConstruction'


import test from '@/views/Components/App/test' 


const meta = {
	requiresAuth: true,
	role: config.auth.role.buyer.id,
	items: [
		{
			title: 'LightFinder',
			name: 'BuyerHome',
			icon: 'fas fa-th-large',
		},


		///////////////////////////////////////
		{
			type: 'spacer',			
		},		
		///////////////////////////////////////

		{
			title: 'My Home',
			name: 'BuyerMyHome',
			icon: 'fas fa-home',
		},
		{
			title: 'My Tower',
			name: 'BuyerMyTower',
			icon: 'fas fa-building',
		},

		///////////////////////////////////////
		{
			type: 'spacer',			
		},				
		///////////////////////////////////////

		{
			title: 'General Lighting Consultation',
			name: 'BuyerGLC',
			icon: 'fas fa-chalkboard-teacher',
		},
		{
			title: 'Lux Calculation',
			name: 'BuyerLC',
			icon: 'fas fa-calculator',
		},
		{
			title: '3D Lighting Design',
			name: 'Buyer3DLD',
			icon: 'fas fa-cubes',
		},
	],

	profileItems: [
		{
			title: 'Edit Profile',
			name: 'BuyerProfile',
			icon: 'person',
		},    
	],
	statuses: [
		...config.main.inquiry_statuses.default,
		...config.main.inquiry_statuses.buyers,
	],
	storeType: {
		inq: "byrInq",
		myHm: "byrMyHm",
		auth: "auth",
		pymnt: "pymnt",
	},
}

const meta1 = {
	...meta,
	section:'lightfinder',
}

const meta2 = {
	...meta,
	style:{
		// backgroundImage:'url(/static/bg-image.png)',
		// backgroundSize: '100% auto ',
		// backgroundPositionY: '-20vh',
		backgroundImage:'url(/static/bg-image3.png)',
		backgroundSize: '45%',
		backgroundPosition: 'center',
		backgroundRepeat: 'repeat',

		backgroundAttachment: 'fixed',
	},

}


const myHomeMeta = {
	...meta2,
	package_type: 'my-home',	
	psf: 949,
}


const myTowerMeta = {
	...meta2,
	package_type: 'my-tower',
	psf: 1949,
}

export default [

	// {
	// 	name: 'BuyerHome2',
	// 	path: '',
	// 	components: { 
	// 		default: BuyerHome, 
	// 		sidebar: AppSidebar, 
	// 		header: AppToolbar, 
	// 		footer: AppFooter,
	// 		dialog: BuyerInquiryView,
	// 	},
	// 	meta: meta1,
	// },

	{
		name: 'BuyerHome',
		path: '/lightfinder',
		components: { 
			default: BuyerHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta1,
	},

	{
		name: 'BuyerInquiry',
		path: '/lightfinder/inquiries',
		components: { 
			default: BuyerHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta1,
	},

	{
		name: 'BuyerInquiryViewPayment',
		path: '/lightfinder/inquiry/:inquiry_id/payment/:payment_status',
		components: {
			default: BuyerHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta1,
	},


	{
		name: 'BuyerInquiryViewSamplePayment',
		path: '/lightfinder/inquiry/:inquiry_id/bids/:bid_id/payment/:payment_status',
		components: {
			default: BuyerHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta1,
	},


	{
		name: 'BuyerProfile',
		path: '/profile',
		components: {
			// default: BuyerHome, 
			default: AppProfile, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta1,
	},

	// {
	// 	name: 'BuyerInvoice',
	// 	path: '/invoice',
	// 	components: {
	// 		// default: BuyerHome, 
	// 		default: BuyerInvoice, 
	// 		// sidebar: AppSidebar, 
	// 		// header: AppToolbar, 
	// 		// footer: AppFooter,
	// 		// dialog: BuyerInquiryView,
	// 	},
	// 	meta: meta1,
	// },


	// {
	//     name: 'BuyerInquiryView',
	//     path: '/lightfinder/inquiry/:inq_id',
	//     components: { 
	//         default: BuyerInquiryView, 
	//         sidebar: AppSidebar, 
	//         header: AppToolbar, 
	//         footer: AppFooter,
	//         testview: test, 
	//     },
	//     meta: meta1,
	//     props: { default:true },

	// },    




	{
		name: 'BuyerInquiryView',
		path: '/lightfinder/inquiry/:inquiry_id',
		components: {
			default: BuyerHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta1,
	},


















	// My Home
	//////////////////////////////////////////////////////



	{
		name: 'BuyerMyHome',
		path: '/my-home',
		components: { 
			default: BuyerMyHome, 
			// default: BuyerMyHomeUnderConstruction, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'BuyerMyHomeProject',
		path: '/my-home/project/:proj_id',
		components: { 
			default: BuyerMyHomeProject, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'BuyerMyHomePayQuotation',
		path: '/my-home/project/:proj_id/payment',
		components: { 
			default: BuyerMyHomePayQuotation, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'BuyerMyHomeRevisionView',
		path: '/my-home/project/:proj_id/revision/:rev_id',
		components: { 
			default: BuyerMyHomeRevisionView, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'BuyerMyHomeOrderSamples',
		path: '/my-home/project/:proj_id/revision/:rev_id/order-samples',
		components: { 
			default: BuyerMyHomeOrderSamples, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	//////////////////////////////////////////////////////
	// My Home






	// My Tower
	//////////////////////////////////////////////////////
	// {
	// 	name: 'BuyerMyTower',
	// 	path: '/my-tower',
	// 	components: { 
	// 		default: BuyerMyTowerUnderConstruction, 
	// 		sidebar: AppSidebar, 
	// 		header: AppToolbarMyHmMyTwr, 
	// 		footer: AppFooter,
	// 		dialog: BuyerInquiryView,
	// 	},
	// 	meta: meta2,
	// },


	{
		name: 'BuyerMyTower',
		path: '/my-tower',
		components: { 
			default: BuyerMyTower, 
			// default: BuyerMyHomeUnderConstruction, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'BuyerMyTowerProject',
		path: '/my-tower/project/:proj_id',
		components: { 
			default: BuyerMyHomeProject, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'BuyerMyTowerPayQuotation',
		path: '/my-tower/project/:proj_id/payment',
		components: { 
			default: BuyerMyHomePayQuotation, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'BuyerMyTowerRevisionView',
		path: '/my-tower/project/:proj_id/revision/:rev_id',
		components: { 
			default: BuyerMyHomeRevisionView, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'BuyerMyTowerOrderSamples',
		path: '/my-tower/project/:proj_id/revision/:rev_id/order-samples',
		components: { 
			default: BuyerMyHomeOrderSamples, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},	
	//////////////////////////////////////////////////////
	// My Tower



  






	// Addons
	//////////////////////////////////////////////////////
	{
		name: 'BuyerGLC',
		path: '/general-lighting-consultation',
		components: { 
			default: UnderConstruction, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: {
			...meta2,
			title: 'General Lighting Consultation',
		},
	},
	{
		name: 'BuyerLC',
		path: '/lux-calculation',
		components: { 
			default: UnderConstruction, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: {
			...meta2,
			title: 'Lux Calculation',
		},
	},
	{
		name: 'Buyer3DLD',
		path: '/3d-lighting-design',
		components: {
			default: UnderConstruction, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: {
			...meta2,
			title: '3D Design',			
		},
	},

	//////////////////////////////////////////////////////
	// Addons











]

