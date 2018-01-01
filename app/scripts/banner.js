

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
var alert = getUrlParameter('alert');

function generateAlert(text) {
    'use strict';
    $('.banner-alert').html('<div class="alert alert-success" role="alert">' + text + '</div>');
}

if(alert == 'cHdkY2huZw=='){
    generateAlert('You successfully changed your password');
}
if(alert == 'YWNjbnRvcGVu'){
    generateAlert('You successfully registered an account');
}
