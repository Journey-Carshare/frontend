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


var info={

    timeOpened:new Date(),
    timezone:(new Date()).getTimezoneOffset()/60,

    pageon(){return window.location.pathname},
    referrer(){return document.referrer},
    previousSites(){return history.length},

    browserName(){return navigator.appName},
    browserEngine(){return navigator.product},
    browserVersion1a(){return navigator.appVersion},
    browserVersion1b(){return navigator.userAgent},
    browserLanguage(){return navigator.language},
    browserOnline(){return navigator.onLine},
    browserPlatform(){return navigator.platform},
    javaEnabled(){return navigator.javaEnabled()},
    dataCookiesEnabled(){return navigator.cookieEnabled},
    dataCookies1(){return document.cookie},
    dataCookies2(){return decodeURIComponent(document.cookie.split(';'))},
    dataStorage(){return localStorage},

    sizeScreenW(){return screen.width},
    sizeScreenH(){return screen.height},
    sizeDocW(){return document.width},
    sizeDocH(){return document.height},
    sizeInW(){return innerWidth},
    sizeInH(){return innerHeight},
    sizeAvailW(){return screen.availWidth},
    sizeAvailH(){return screen.availHeight},
    scrColorDepth(){return screen.colorDepth},
    scrPixelDepth(){return screen.pixelDepth},


    latitude(){return position.coords.latitude},
    longitude(){return position.coords.longitude},
    accuracy(){return position.coords.accuracy},
    altitude(){return position.coords.altitude},
    altitudeAccuracy(){return position.coords.altitudeAccuracy},
    heading(){return position.coords.heading},
    speed(){return position.coords.speed},
    timestamp(){return position.timestamp},


    };
    // "user pool id eu-west-1_hHC08zjgQ"
    // "app client id v2u7b84ip31mdlagd5ut9irvt"
    // When using loose Javascript files:


    // var crypto = require('crypto');
    // var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    // var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
    //var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
