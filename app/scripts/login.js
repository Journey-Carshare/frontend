if(getCookie('Cookie') !== ''){
    console.log(getCookie('Cookie'));
    window.location.replace('/calendar.html');
}

function elementHide() {
    'use strict';
    $('.sign-up-container').hide();
}

function elementShow() {
    'use strict';
    $('.sign-up-container').show();
}
document.getElementById('exampleInputEmail1').addEventListener('focus', elementHide);
document.getElementById('exampleInputPassword1').addEventListener('focus', elementHide);
document.getElementById('exampleInputEmail1').addEventListener('focusout', elementShow);
document.getElementById('exampleInputPassword1').addEventListener('focusout', elementShow);

//
// var info={
//
//     timeOpened:new Date(),
//     timezone:(new Date()).getTimezoneOffset()/60,
//
//     pageon(){return window.location.pathname},
//     referrer(){return document.referrer},
//     previousSites(){return history.length},
//
//     browserName(){return navigator.appName},
//     browserEngine(){return navigator.product},
//     browserVersion1a(){return navigator.appVersion},
//     browserVersion1b(){return navigator.userAgent},
//     browserLanguage(){return navigator.language},
//     browserOnline(){return navigator.onLine},
//     browserPlatform(){return navigator.platform},
//     javaEnabled(){return navigator.javaEnabled()},
//     dataCookiesEnabled(){return navigator.cookieEnabled},
//     dataCookies1(){return document.cookie},
//     dataCookies2(){return decodeURIComponent(document.cookie.split(';'))},
//     dataStorage(){return localStorage},
//
//     sizeScreenW(){return screen.width},
//     sizeScreenH(){return screen.height},
//     sizeDocW(){return document.width},
//     sizeDocH(){return document.height},
//     sizeInW(){return innerWidth},
//     sizeInH(){return innerHeight},
//     sizeAvailW(){return screen.availWidth},
//     sizeAvailH(){return screen.availHeight},
//     scrColorDepth(){return screen.colorDepth},
//     scrPixelDepth(){return screen.pixelDepth},
//
//
//     latitude(){return position.coords.latitude},
//     longitude(){return position.coords.longitude},
//     accuracy(){return position.coords.accuracy},
//     altitude(){return position.coords.altitude},
//     altitudeAccuracy(){return position.coords.altitudeAccuracy},
//     heading(){return position.coords.heading},
//     speed(){return position.coords.speed},
//     timestamp(){return position.timestamp},
//
//
//     };
    // "user pool id eu-west-1_hHC08zjgQ"
    // "app client id v2u7b84ip31mdlagd5ut9irvt"
    // When using loose Javascript files:


    // var crypto = require('crypto');
    // var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    // var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
    //var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
function postArray(){
    console.log('test');
    var data

};

$('#loginForm').submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    // var url = "https://api.journeys.io/user/login"; // the script where you handle the form input.
    var url = 'https://p6flgqzkv2.execute-api.eu-west-1.amazonaws.com/stage1/user/login';
    var data = $('#loginForm').serializeArray();
    var email, password;
    for(var i = 0; i < data.length; i++){
        if(data[i].name === 'password'){
            password = data[i].value;
        } else if (data[i].name === 'email') {
            email = data[i].value;
        }
    }
    var output = {
        'email': email,
        'password': password
    }
    console.log(output);

    $.ajax({
           type: 'POST',
           url: url,
           data: JSON.stringify(output), // serializes the form's elements.
           success: function(data)
           {
               console.log(data);
               if(data.errorMessage){
                   console.log('uh oh');
               } else if(data.id){
                   var date = new Date();
                   date.setTime(+ date + (1 * 86400000));
                   //document.cookie = "Cookie=" + data.id + "; expires="+ date.toGMTString() + " domain='api.journeys.io' path=/";
                   document.cookie = 'Cookie=' + data.id + '; expires='+ date.toGMTString() + ' path=/';
                   window.location.replace('/calendar.html');
               } else {
                   console.log('fail');
               }
           },
           error: function(data){
               console.log(data);
           }
         });


});

function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
