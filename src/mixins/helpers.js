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
            retVal = month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
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

  },

}