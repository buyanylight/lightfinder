import axios from 'axios';
import router from '@/router';
import config from '@/config/index';
import { ceil,floor } from 'lodash'

export default {

	methods: {

	    getDateTime(format = "yyyy-mm-dd", date){
	        let retVal = null;

	        var d = null;

	        var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	        if(date)
	        d = new Date(date);
	        else
	        d = new Date();

	        if(format=="yyyy-mm-dd") {
	            retVal = new Date(
	                    Date.UTC(
	                          d.getFullYear(),
	                          d.getMonth(),
	                          d.getDate(),
	                          d.getHours(),
	                          d.getMinutes(),
	                          d.getSeconds()
	                    )
	              // `toIsoString` returns something like "2017-08-22T08:32:32.847Z"
	              // and we want the first part ("2017-08-22")
	              ).toISOString().slice(0, 10);
	        } 
	        else if(format=="mmm dd, yyyy") {
	            retVal = month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
	        } 
	        else if(format=="mmm dd, yyyy hh:mm") {
	            var hrs = (d.getHours()<10?"0":"")+d.getHours();
	            retVal = month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" "+hrs+":"+(d.getMinutes()<10?"0":"")+d.getMinutes();
	        } 
	        else {
	            retVal = null;
	        }


	        return retVal;
	    },

	    ucwords(string){
	        string = string.trim();
	        if(string!="")
	        return string.replace(/^./, string[0].toUpperCase());
	    },


	    getCountries(context) {
	          return new Promise((resolve, reject) => {
	              axios({
	                  method: 'GET',
	                  url:  config.main.apiURL+'/v1/countries',
	              })
	              .then(response => {
	                  resolve(response.data);
	              })
	              .catch(error => {
	                  reject(error);
	              })
	          });
	    },

	    randomIndexArray: function (items) {
	      return Math.floor(Math.random() * items.length)
	    },


	    isRole(roleName){

	        var retVal = false;

	        if(roleName == 'admin') {
	            retVal = (localStorage.role == config.auth.role.admin.id)?true:false;
	        }
	        else if(roleName == 'buyer') {
	            retVal = (localStorage.role == config.auth.role.buyer.id)?true:false;
	        }
	        else if(roleName == 'supplier') {
	            retVal = (localStorage.role == config.auth.role.supplier.id)?true:false;
	        }

	        return retVal;

	    },


	    getRole(){
	        var retVal = false;
	        var roleId = this.$store.state.auth.auth_user.role;
	        return {
	        	id: roleId,
	        	name: config.auth.roleIndex[roleId],
	        };
	    },


	    getStore(type='inq'){

	    	console.log('$route',this.$route.meta.storeType[type]);

	        // return this.$route.meta.storeType.inq;
	        return this.$route.meta.storeType[type];
	    },

	    getAttachments(attachments) {
	        console.log(attachments.filegroup);
	        console.log(attachments.filename)
	        return attachments.filegroup
	    },


		currency(arg,decimals=2){
			// return ceil(arg,2).toFixed(2)
			// return this.numberWithCommas(arg.toFixed(2));
			
			// console.log('arg 1',arg);

			if(typeof arg === 'undefined')
			arg = 0.0;
			else if(!arg)
			arg = 0.0;
			else
			arg = parseFloat(arg);

			// console.log('arg 2',arg);

			return this.numberWithCommas(arg.toFixed(decimals));
		},

		decimals(arg,decimals=2){
			// return ceil(arg,2).toFixed(2)
			// return this.numberWithCommas(arg.toFixed(2));
			if(arg)
			return parseFloat(arg).toFixed(decimals);
			else
			return 0;
		},


		numberWithCommas(x) {
		    
			if(typeof x === 'undefined') 
				return '';
			else {
			    var parts = x.toString().split(".");
			    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			    return parts.join(".");
			}
		},


		cnsl(output1,output2=null){

			if(config.main.devMode) {
				if(output2)
				console.log(output1,output2);
				else
				console.log(output1);
			}
		},

        isInMobile() {
            if( screen.width <= 760 ) {
                return true;
            }
            else {
                return false;
            }
        },

		isIE() {
		  var ua = navigator.userAgent;
		  /* MSIE used to detect old browsers and Trident used to newer ones*/
		  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		  
		  return is_ie; 
		},


		// Changes XML to JSON
		xmlToJson(xml) {

			
			// Create the return object
			var obj = {};

			if (xml.nodeType == 1) { // element
				// do attributes
				if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
					for (var j = 0; j < xml.attributes.length; j++) {
						var attribute = xml.attributes.item(j);
						obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
					}
				}
			} else if (xml.nodeType == 3) { // text
				obj = xml.nodeValue;
			}

			// do children
			if (xml.hasChildNodes()) {
				for(var i = 0; i < xml.childNodes.length; i++) {
					var item = xml.childNodes.item(i);
					var nodeName = item.nodeName;
					if (typeof(obj[nodeName]) == "undefined") {
						obj[nodeName] = this.xmlToJson(item);
					} else {
						if (typeof(obj[nodeName].push) == "undefined") {
							var old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
						}
						obj[nodeName].push(this.xmlToJson(item));
					}
				}
			}
			return obj;
		},		

	},



}