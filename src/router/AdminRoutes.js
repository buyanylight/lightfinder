import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'
import AppProfile from '@/views/Pages/Profile'

import AppToolbarMyHmMyTwr from '@/views/Components/App/ToolbarMyHmMyTwr'

import AdminHome from '@/views/Pages/Admin/Home'
// import AdminInquiry from '@/views/Pages/Admin/Inquiry'
import AdminBuyer from '@/views/Pages/Admin/Buyer'
import AdminSupplier from '@/views/Pages/Admin/Supplier'
import AdminInquiryView from "@/views/Components/App/Admin/InquiryView"

import AdminMyTower from '@/views/Pages/Admin/MyTower'
import AdminMyHome from '@/views/Pages/Admin/MyHome'

import AdminMyHomeProject from '@/views/Components/App/Admin/MyHome/Project/ProjectView'
import AdminMyHomeUnderConstruction from '@/views/Pages/UnderConstruction'
import AdminMyHomeRevisionView from '@/views/Components/App/Admin/MyHome/Project/Revisions/RevisionView'
import AdminMyHomeRevisionCopy from '@/views/Components/App/Admin/MyHome/Project/Revisions/RevisionCopy'
import AdminMyHomeRevisionEdit from '@/views/Components/App/Admin/MyHome/Project/Revisions/RevisionEdit'

import AdminMyHomePayQuotation from '@/views/Components/App/Admin/MyHome/PayQuotation/PayQuotationView'
import AdminMyHomeOrderSamples from "@/views/Components/App/Admin/MyHome/OrderSamples/OrderSamplesView"


// import AdminMyHomeOrderedSamples from '@/views/Components/App/Admin/MyHome/Project/OrderedSamples/OrderedSamplesView'


import config from '@/config/index'


const meta = {
	requiresAuth: true,
	role: config.auth.role.admin.id,
	items: [
		{
			title: 'Dashboard',
			name: 'AdminHome',
			icon: 'fas fa-th-large',
		},
		// {
		// 	title: 'Inquiry',
		// 	name: 'AdminInquiry',
		// 	icon: 'fas fa-clipboard',
		// },
		{
			title: 'Buyer',
			name: 'AdminBuyer',
			icon: 'fas fa-user',
		},
		{
			title: 'Supplier',
			name: 'AdminSupplier',
			icon: 'fas fa-user-tie',
		},



		///////////////////////////////////////
		{
			type: 'spacer',			
		},		
		///////////////////////////////////////


		{
			title: 'My Home',
			name: 'AdminMyHome',
			icon: 'fas fa-home',
		},
		{
			title: 'My Tower',
			name: 'AdminMyTower',
			icon: 'fas fa-building',
		},



	],	
	profileItems: [
		{
			title: 'Edit Profile',
			name: 'AdminProfile',
			icon: 'person',
		},    
	],
	statuses: [
		...config.main.inquiry_statuses.default,
		...config.main.inquiry_statuses.suppliers,
		...config.main.inquiry_statuses.buyers,
	],
	storeType: {
		byr: 'admnByr',
		spplr: 'admnSpplr',
		inq: 'admnInq',
		myHm: "admnMyHm",
	},
}

const meta2 = {
	...meta,
	style:{
		backgroundImage:'url(/static/bg-image.png)',
		backgroundSize: '100% auto ',
		backgroundPositionY: '-20vh',
		backgroundAttachment: 'fixed',
	},

}

const myHomeMeta = {
	...meta2,
	package_type: 'my-home',
}


const myTowerMeta = {
	...meta2,
	package_type: 'my-tower',
}

export default [
	{
		name: 'AdminHome',
		path: '/lightfinder',
		components: {
			default: AdminHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: AdminInquiryView,
		},
		meta: meta,
		 props: { default:true },

	},
	{
		name: 'AdminInquiry',
		path: '/lightfinder/inquiries',
		components: {
			default: AdminHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: AdminInquiryView,
		},
		meta: meta,
		props: { default:true },

	},





	{
		name: 'AdminInquiryView',
		path: '/lightfinder/inquiry/:inquiry_id',
		components: {
			default: AdminHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: AdminInquiryView,
		},
		meta: meta,
		props: { default:true },
	},













	{
		name: 'AdminBuyer',
		path: '/buyer/',
		components: {
			default: AdminBuyer,
			sidebar: AppSidebar,
			header: AppToolbar,
			footer: AppFooter,
			dialog: AdminInquiryView,
		},
		meta: meta,
		props: { default:true },

	},
	{
		name: 'AdminProfile',
		path: '/profile/',
		components: {
			default: AppProfile,
			sidebar: AppSidebar,
			header: AppToolbar,
			footer: AppFooter,
			dialog: AdminInquiryView,
		},
		meta: meta,
		props: { default:true },

	},
	{
		name: 'AdminSupplier',
		path: '/supplier',
		components: {
			default: AdminSupplier,
			sidebar: AppSidebar,
			header: AppToolbar,
			footer: AppFooter,
			dialog: AdminInquiryView,
		},
		meta: meta,
		 props: { default:true },
	},

















	// My Home
	//////////////////////////////////////////////////////

	{
		name: 'AdminMyHome',
		path: '/my-home',
		components: { 
			default: AdminMyHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'AdminMyHomeProject',
		path: '/my-home/project/:proj_id',
		components: { 
			default: AdminMyHomeProject, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	// {
	// 	name: 'AdminMyHomeOrderedSamples',
	// 	path: '/my-home/project/:proj_id',
	// 	components: { 
	// 		default: AdminMyHomeOrderedSamples, 
	// 		sidebar: AppSidebar, 
	// 		header: AppToolbar, 
	// 		footer: AppFooter,
	// 	},
	// 	meta: meta2,
	// },



	{
		name: 'AdminMyHomePayQuotation',
		path: '/my-home/project/:proj_id/payment',
		components: { 
			default: AdminMyHomePayQuotation, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'AdminMyHomeRevisionView',
		path: '/my-home/project/:proj_id/revision/:rev_id',
		components: { 
			default: AdminMyHomeRevisionView, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'AdminMyHomeRevisionEdit',
		path: '/my-home/project/:proj_id/revision/:rev_id/edit-revision',
		components: { 
			default: AdminMyHomeRevisionEdit, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'AdminMyHomeRevisionCopy',
		path: '/my-home/project/:proj_id/revision/:rev_id/copy-revision',
		components: { 
			default: AdminMyHomeRevisionCopy, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myHomeMeta,
	},

	{
		name: 'AdminMyHomeOrderSamples',
		path: '/my-home/project/:proj_id/revision/:rev_id/order-samples',
		components: { 
			default: AdminMyHomeOrderSamples, 
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
	{
		name: 'AdminMyTower',
		path: '/my-tower',
		components: { 
			default: AdminMyTower, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'AdminMyTowerProject',
		path: '/my-tower/project/:proj_id',
		components: { 
			default: AdminMyHomeProject, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	// {
	// 	name: 'AdminMyTowerOrderedSamples',
	// 	path: '/my-home/project/:proj_id',
	// 	components: { 
	// 		default: AdminMyHomeOrderedSamples, 
	// 		sidebar: AppSidebar, 
	// 		header: AppToolbar, 
	// 		footer: AppFooter,
	// 	},
	// 	meta: meta2,
	// },



	{
		name: 'AdminMyTowerPayQuotation',
		path: '/my-tower/project/:proj_id/payment',
		components: { 
			default: AdminMyHomePayQuotation, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'AdminMyTowerRevisionView',
		path: '/my-tower/project/:proj_id/revision/:rev_id',
		components: { 
			default: AdminMyHomeRevisionView, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'AdminMyTowerRevisionEdit',
		path: '/my-tower/project/:proj_id/revision/:rev_id/edit-revision',
		components: { 
			default: AdminMyHomeRevisionEdit, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'AdminMyTowerRevisionCopy',
		path: '/my-tower/project/:proj_id/revision/:rev_id/copy-revision',
		components: { 
			default: AdminMyHomeRevisionCopy, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},

	{
		name: 'AdminMyTowerOrderSamples',
		path: '/my-tower/project/:proj_id/revision/:rev_id/order-samples',
		components: { 
			default: AdminMyHomeOrderSamples, 
			sidebar: AppSidebar, 
			// header: AppToolbarMyHmMyTwr, 
			header: AppToolbar, 
			footer: AppFooter,
		},
		meta: myTowerMeta,
	},		
	//////////////////////////////////////////////////////
	// My Tower






]

