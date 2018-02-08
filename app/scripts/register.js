function boxcolor(strength) {
    'use strict';
    var color;
    var defaultColor = '#e1e0e0';
    switch (strength) {
    case 1:
        color = '#ff0000';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(3)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(4)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
        $('#password').removeClass('is-valid').addClass('is-invalid');
        break;
    case 2:
        color = '#ff0000';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', color);
        $('.password-strength .bar:nth-child(3)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(4)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
        $('#password').removeClass('is-valid').addClass('is-invalid');
        break;
    case 3:
        color = '#ff0000';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', color);
        $('.password-strength .bar:nth-child(3)').css('background-color', color);
        $('.password-strength .bar:nth-child(4)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
        $('#password').removeClass('is-valid').addClass('is-invalid');
        break;
    case 4:
        color = '#28a745';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', color);
        $('.password-strength .bar:nth-child(3)').css('background-color', color);
        $('.password-strength .bar:nth-child(4)').css('background-color', color);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
        $('#password').removeClass('is-invalid').addClass('is-valid');
        break;
    case 5:
        color = '#28a745';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', color);
        $('.password-strength .bar:nth-child(3)').css('background-color', color);
        $('.password-strength .bar:nth-child(4)').css('background-color', color);
        $('.password-strength .bar:nth-child(5)').css('background-color', color);
        $('#password').removeClass('is-invalid').addClass('is-valid');
        break;
    default:
        $('.password-strength .bar:nth-child(1)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(2)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(3)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(4)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
        $('#password').removeClass('is-invalid is-valid');
    }
}

function updateStrengthMeter() {
    'use strict';
    var password = document.getElementById('password').value;
    var score = zxcvbn(password).score;
    if (password === '') {
        boxcolor(0);
    } else {
        boxcolor(score + 1);
    }
}

function checkPwdMatch() {
    'use strict';
    if(document.getElementById('password').value != document.getElementById('passwordConfirm').value){
        //console.log('hide');
        // $('#pwdConfErr').show();
        $('#passwordConfirm').removeClass('is-valid').addClass('is-invalid');

    } else {
        //console.log('match');
        // $('#pwdConfErr').hide();
        $('#passwordConfirm').removeClass('is-invalid').addClass('is-valid');
    }
}

document.getElementById('password').addEventListener('input', updateStrengthMeter);
document.getElementById('passwordConfirm').addEventListener('input', checkPwdMatch);
// $('#alert').hide();
