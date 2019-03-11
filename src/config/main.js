// Define authentication static data

export default {

	shipping_methods: [
		{
			id: 1,
			name: "AIR",
		},
		{
			id: 2,
			name: "SEA",
		},
		{
			id: 3,
			name: "Buyer handles shipment",
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
				class: "pink lighten-1 font-weight-light",
				icon: "far fa-envelope-open",
			},
			{
				id: 1001, 
				name: "Verifying",
				class: "orange darken-3",
				icon: "fas fa-hourglass-half",
			},
			{
				id: 1003, 
				name: "Rejected",
				class: "blue darken-4",
				icon: "far fa-times-circle",
			},
			{
				id: 1004, 
				name: "Confirmation",
				class: "orange darken-3",
				icon: "fas fa-handshake",
			},
			{
				id: 1005, 
				name: "Pending Payment",
				class: "red darken-3",
				icon: "far fa-credit-card",
			},
			{
				id: 2001, 
				name: "Production",
				class: "blue darken-3",
				icon: "fas fa-industry",
			},
			{
				id: 2002, 
				name: "Shipment",
				class: "green darken-3",
				icon: "fas fa-truck",
			},
			{
				id: 2003, 
				name: "Receiving",
				class: "orange darken-3",
				icon: "fas fa-sign-in-alt",
			},
			{
				id: 2004, 
				name: "Return",
				class: "red darken-3",
				icon: "fas fa-exchange-alt",
			},
			{
				id: 3001, 
				name: "Success",
				class: "red accent-3",
				icon: "far fa-check-circle",
			},
			{
				id: 3002, 
				name: "Cancelled",
				class: "teal accent-3",
				icon: "fas fa-ban",
			},
		],		

		suppliers: [
			// {
			// 	id: 'all', 
			// 	name: "All",
			// 	icon: "fas fa-envelope-open-text",
			// },
			{
				id: 'priority', 
				name: "Priority",
				icon: "fas fa-exclamation-circle",
			},
			{
				id: 'closed', 
				name: "Closed",
				icon: "fas fa-envelope",
			},
		],

		buyer: [

			{
		        "id": 1,
		        "name": "Open",
		        "icon": "fas fa-envelope-open",
		        'status': [
	        			{
							id: 1002, 
							name: "Open"
						},
						{
							id: 1001, 
							name: "Verifying"
						},
						{
							id: 1003, 
							name: "Rejected"
						},
						{
							id: 1004, 
							name: "Confirmation"
						},
						{
							id: 1005, 
							name: "Pending Payment"
						},

		        ]

		    },
		    {
		        "id": 2,
		        "name": "In-Progress",
		        "icon": "fas fa-tasks",
		        "status": [

					{
						id: 2001, 
						name: "Production"
					},
					{
						id: 2002, 
						name: "Shipment"
					},
					{
						id: 2003, 
						name: "Receiving"
					},
					{
						id: 2004, 
						name: "Return"
					},
		        ]
		    },
		    {
		        "id": 3,
		        "name": "Closed",
		        "icon": "fas fa-envelope",
		        "status": 
		        	[
	        			{
							id: 3001, 
							name: "Success"
						},
						{
							id: 3002, 
							name: "Cancelled"
						},
		      		]

		    }
		]
	},

	polling: {
		bidTable:{
			time: 5000,			
		},
		inquiryTable: {
			time: 10000,
		}
	}

    
}

