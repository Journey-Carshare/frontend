function elementHide() {
    "use strict";
    $(".sign-up-container").hide();
}

function elementShow() {
    "use strict";
    $(".sign-up-container").show();
}
document.getElementById("exampleInputEmail1").addEventListener("focus", elementHide);
document.getElementById("exampleInputPassword1").addEventListener("focus", elementHide);
document.getElementById("exampleInputEmail1").addEventListener("focusout", elementShow);
document.getElementById("exampleInputPassword1").addEventListener("focusout", elementShow);
