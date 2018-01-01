function check_guid() {
    "use strict";
    if (Cookies.get('GUID')) {
        console.log("I have the cookie");
        return true;
    } else {
        console.log("I am getting the cookie");
        return false;
    }
}

function get_guid(api_addr) {
    "use strict";
    $.get(api_addr + "/getGUID", function (data, status) {
        //console.log("Data: " + data + "\nStatus: " + status);
        console.log(data);
        if(data.id){
            //Cookies.set('GUID', data.id, {expires: 7, secure: true});
            console.warn('cookie is now being set securely, make sure to change this');
            Cookies.set('GUID', data.id, {expires: 7});
        }
    });
}

function guid() {
    "use strict";
    var api_addr = "http://localhost:3000";
    if (!check_guid()) {
        get_guid(api_addr);
    }
}

guid();
