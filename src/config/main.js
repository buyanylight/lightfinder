

const env = {
	apiURL : process.env.APIURL,
	socketURL : process.env.SOCKETURL,
	websiteURL : process.env.WEBSITEURL,
	mainURL : process.env.MAINWEBSITEURL,
	devMode : process.env.DEVMODE,
	defaultMaxInqs : process.env.DEFAULTMAXINQS,
	merchant_key : process.env.MERCHANT_KEY,
	eur_convesion_url : process.env.EUR_CONVESION_URL,
	crypto_convesion_url : process.env.CRYPTO_CONVESION_URL,
};

export default {
	...env,
	
	awss3: {
		signingURL:env.apiURL+"/v1/aws-s3-signature",
        urls: {
        	inquiry: 'https://httpbin.org/post',
        },
	},

	plan: {
		yearly:{
			mini: 5499,
			standard: 7699,
			premium: 9899,
		},
		monthly:{
			mini: 499,
			standard: 699,
			premium: 899,
		},
		maxInqs: {
			mini: 3,
			standard: 6,
			premium: 10,
		}
	},

	shipping_methods: [
		{
			id: 1,
			name: "AIR",
		},
		{
			id: 2,
			name: "SEA",
		},
	],

    
	payment_methods: [
		{
			id: 1,
			name: "CASH",
		},
		{
			id: 2,
			name: "CHEQUE",
		},
		{
			id: 3,
			name: "BANK TRANSFER",
		},
	],


	inquiry_statuses: {

		default: [
			{
				id: 1002, 
				name: "Open",
				class: "green",
				icon: "far fa-envelope-open",
				desc:"Inquiry is ready for bids.",
			},

			{
				// before this was Confirmation
				id: 1004, 
				name: "Awarded",
				class: "teal",
				icon: "fas fa-handshake",
				desc:"",
			},

			{
				id: 10041, 
				name: "BAL Confirmation",
				class: "purple",
				icon: "fas fa-handshake",
				desc:"",
			},

			{
				id: 1005, 
				name: "Pending Payment",
				class: "deep-orange",
				icon: "far fa-credit-card",
				desc:"",
			},

			{
				id: 1006, 
				name: "Confirming Payment",
				class: "green",
				icon: "far fa-credit-card",
				desc:"",
			},

			{
				id: 2001, 
				name: "Production",
				class: "blue",
				icon: "fas fa-industry",
				desc:"",
			},

			{
				id: 20011, 
				name: "Production Done",
				class: "blue",
				icon: "fas fa-industry",
				desc:"",
			},

			{
				id: 2002, 
				name: "Shipment",
				class: "light-green",
				icon: "fas fa-truck",
				desc:"",
			},

			{
				id: 2003, 
				name: "Receiving",
				class: "orange",
				icon: "fas fa-sign-in-alt",
				desc:"",
			},
			{
				id: 2004, 
				name: "Return",
				class: "red",
				icon: "fas fa-exchange-alt",
				desc:"",
			},
			{
				id: 3001, 
				name: "Success",
				class: "light-blue",
				icon: "far fa-check-circle",
				desc:"",
			},
			{
				id: 3002, 
				name: "Cancelled",
				class: "red red darken-2",
				icon: "fas fa-ban",
				desc:"",
			},
		],		

		buyers: [
			{
				id: 1001, 
				name: "Verifying",
				class: "orange",
				icon: "fas fa-hourglass-half",
				desc:"",
			},
			{
				id: 1003, 
				name: "Rejected",
				class: "red",
				icon: "far fa-times-circle",
				desc:"",
			},
		],

		suppliers: [
			// {
			// 	id: 'all', 
			// 	name: "All",
			// 	icon: "fas fa-envelope-open-text",
			// 	desc:"",
			// },
			// {
			// 	id: 'priority', 
			// 	name: "Priority",
			// 	icon: "fas fa-exclamation-circle",
			// 	desc:"",
			// },
			{
				id: 'closed', 
				name: "Closed",
				icon: "fas fa-envelope",
				desc:"",
			},
		],

		confirmed_orders: [
			2001,
			20011,
			2002,
		],

		bid_non_editable: [
			2001,
			20011,
			2002,
			2003,
			2004,
			3001,
			3002,
		],

		bid_sample_disabled: [
			2001,
			20011,
			2002,
			2003,
			2004,
			3001,
			3002,
		],

	},

	polling: {
		bidTable:{
			time: 150000,
		},
		inquiryTable: {
			time: 100000,
		},
		default: {
			time: 150000,
		},
	},



}

