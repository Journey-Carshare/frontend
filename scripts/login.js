"use strict";function elementHide(){$(".sign-up-container").hide()}function elementShow(){$(".sign-up-container").show()}function postArray(){}function getCookie(e){for(var t=e+"=",n=decodeURIComponent(document.cookie),r=n.split(";"),o=0;o<r.length;o++){for(var a=r[o];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(t))return a.substring(t.length,a.length)}return""}function generateAlert(e){$(".banner-alert").html('<div class="alert alert-success" role="alert">'+e+"</div>")}""!==getCookie("Cookie")&&window.location.replace("/calendar.html"),document.getElementById("exampleInputEmail1").addEventListener("focus",elementHide),document.getElementById("exampleInputPassword1").addEventListener("focus",elementHide),document.getElementById("exampleInputEmail1").addEventListener("focusout",elementShow),document.getElementById("exampleInputPassword1").addEventListener("focusout",elementShow),$("#loginForm").submit(function(e){e.preventDefault();for(var t,n,r=$("#loginForm").serializeArray(),o=0;o<r.length;o++)"password"===r[o].name?n=r[o].value:"email"===r[o].name&&(t=r[o].value);var a={email:t,password:n};$.ajax({type:"POST",url:"https://p6flgqzkv2.execute-api.eu-west-1.amazonaws.com/stage1/user/login",data:JSON.stringify(a),success:function(e){if(e.errorMessage);else if(e.id){var t=new Date;t.setTime(+t+864e5),document.cookie="Cookie="+e.id+"; expires="+t.toGMTString()+" path=/",window.location.replace("/calendar.html")}},error:function(e){}})});var getUrlParameter=function(e){var t,n,r=decodeURIComponent(window.location.search.substring(1)),o=r.split("&");for(n=0;n<o.length;n++)if(t=o[n].split("="),t[0]===e)return void 0===t[1]||t[1]},alert=getUrlParameter("alert");"cHdkY2huZw=="==alert&&generateAlert("You successfully changed your password"),"YWNjbnRvcGVu"==alert&&generateAlert("You successfully registered an account");