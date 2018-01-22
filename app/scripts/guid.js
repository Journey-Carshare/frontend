// function check_guid() {
//     'use strict';
//     if (Cookies.get('GUID')) {
//         return true;
//     } else {
//         return false;
//     }
// }
//
// function get_guid(api_addr) {
//     'use strict';
//     $.get(api_addr + '/guid', function (data, status) {
//         //console.log("Data: " + data + "\nStatus: " + status);
//         console.log(data);
//         if(data.guid){
//             //Cookies.set("GUID", data.id, {expires: 7, secure: true});
//             console.warn('cookie is not being set securely, make sure to change this');
//             Cookies.set('GUID', data.guid, {expires: 7});
//
//             $.post(api_addr + '/guid', {guid: data.guid}, function (output, status) {
//                 if(output.result){
//                     console.log(output);
//                 } else {
//                     console.log(output);
//                 }
//             });
//         }
//     });
// }
//
// function guid() {
//     'use strict';
//     var api_addr = 'http://localhost:3000';
//     if (!check_guid()) {
//         get_guid(api_addr);
//     }
// }
//
// guid();

// Add amazon-cognito-auth-js SDK in your application.
//1) -- Create an instance of Auth --
//   var authData = {
//   ClientId                       : '78v9rqpe7cpitfi59ff1blq04d',
//   AppWebDomain       : 'journeys.io',
//   TokenScopesArray   : '<add scope array>',
//   RedirectUriSignIn    : '<add redirect url when signed in>',
//   RedirectUriSignOut : '<add redirect url when signed out>'
// };
// var auth = new AWSCognito.CognitoIdentityServiceProvider.CognitoAuth(authData);
//
// // 2) -- Get tokens for your user --
// auth.getSession();

'user pool id eu-west-1_hHC08zjgQ'
'app client id v2u7b84ip31mdlagd5ut9irvt'

var poolData = {
       UserPoolId : 'eu-west-1_hHC08zjgQ', // Your user pool id here
       ClientId : 'v2u7b84ip31mdlagd5ut9irvt' // Your client id here
   };
   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

   var attributeList = [];

   var dataEmail = {
       Name : 'email',
       Value : 'email@mydomain.com'
   };

   var dataPhoneNumber = {
       Name : 'phone_number',
       Value : '+15555555555'
   };
   var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
   var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

   attributeList.push(attributeEmail);
   attributeList.push(attributePhoneNumber);

   userPool.signUp('username', 'password', attributeList, null, function(err, result){
       if (err) {
           alert(err);
           return;
       }
       cognitoUser = result.user;
       console.log('user name is ' + cognitoUser.getUsername());
   });
