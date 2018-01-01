function check_guid() {
    "use strict";
    if (Cookies.get("GUID")) {
        return true;
    } else {
        return false;
    }
}

function get_guid(api_addr) {
    "use strict";
    $.get(api_addr + "/guid", function (data, status) {
        //console.log("Data: " + data + "\nStatus: " + status);
        console.log(data);
        if(data.guid){
            //Cookies.set("GUID", data.id, {expires: 7, secure: true});
            console.warn("cookie is not being set securely, make sure to change this");
            Cookies.set("GUID", data.guid, {expires: 7});

            $.post(api_addr + "/guid", {guid: data.guid}, function (output, status) {
                if(output.result){
                    console.log(output);
                } else {
                    console.log(output);
                }
            });
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
