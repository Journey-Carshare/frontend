"use strict";function boxcolor(s){var r;switch(s){case 1:r="#ff0000",$(".password-strength .bar:nth-child(1)").css("background-color",r),$(".password-strength .bar:nth-child(2)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(3)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(4)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(5)").css("background-color","#e1e0e0"),$("#password").removeClass("is-valid").addClass("is-invalid");break;case 2:r="#ff0000",$(".password-strength .bar:nth-child(1)").css("background-color",r),$(".password-strength .bar:nth-child(2)").css("background-color",r),$(".password-strength .bar:nth-child(3)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(4)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(5)").css("background-color","#e1e0e0"),$("#password").removeClass("is-valid").addClass("is-invalid");break;case 3:r="#ff0000",$(".password-strength .bar:nth-child(1)").css("background-color",r),$(".password-strength .bar:nth-child(2)").css("background-color",r),$(".password-strength .bar:nth-child(3)").css("background-color",r),$(".password-strength .bar:nth-child(4)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(5)").css("background-color","#e1e0e0"),$("#password").removeClass("is-valid").addClass("is-invalid");break;case 4:r="#28a745",$(".password-strength .bar:nth-child(1)").css("background-color",r),$(".password-strength .bar:nth-child(2)").css("background-color",r),$(".password-strength .bar:nth-child(3)").css("background-color",r),$(".password-strength .bar:nth-child(4)").css("background-color",r),$(".password-strength .bar:nth-child(5)").css("background-color","#e1e0e0"),$("#password").removeClass("is-invalid").addClass("is-valid");break;case 5:r="#28a745",$(".password-strength .bar:nth-child(1)").css("background-color",r),$(".password-strength .bar:nth-child(2)").css("background-color",r),$(".password-strength .bar:nth-child(3)").css("background-color",r),$(".password-strength .bar:nth-child(4)").css("background-color",r),$(".password-strength .bar:nth-child(5)").css("background-color",r),$("#password").removeClass("is-invalid").addClass("is-valid");break;default:$(".password-strength .bar:nth-child(1)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(2)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(3)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(4)").css("background-color","#e1e0e0"),$(".password-strength .bar:nth-child(5)").css("background-color","#e1e0e0"),$("#password").removeClass("is-invalid is-valid")}}function updateStrengthMeter(){var s=document.getElementById("password").value,r=zxcvbn(s).score;boxcolor(""===s?0:r+1)}function checkPwdMatch(){document.getElementById("password").value!=document.getElementById("passwordConfirm").value?$("#passwordConfirm").removeClass("is-valid").addClass("is-invalid"):$("#passwordConfirm").removeClass("is-invalid").addClass("is-valid")}document.getElementById("password").addEventListener("input",updateStrengthMeter),document.getElementById("passwordConfirm").addEventListener("input",checkPwdMatch);