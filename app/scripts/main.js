if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

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
        break;
    case 2:
        color = '#ff0000';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', color);
        $('.password-strength .bar:nth-child(3)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(4)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
        break;
    case 3:
        color = '#ff0000';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', color);
        $('.password-strength .bar:nth-child(3)').css('background-color', color);
        $('.password-strength .bar:nth-child(4)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
        break;
    case 4:
        color = '#28a745';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', color);
        $('.password-strength .bar:nth-child(3)').css('background-color', color);
        $('.password-strength .bar:nth-child(4)').css('background-color', color);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
        break;
    case 5:
        color = '#28a745';
        $('.password-strength .bar:nth-child(1)').css('background-color', color);
        $('.password-strength .bar:nth-child(2)').css('background-color', color);
        $('.password-strength .bar:nth-child(3)').css('background-color', color);
        $('.password-strength .bar:nth-child(4)').css('background-color', color);
        $('.password-strength .bar:nth-child(5)').css('background-color', color);
        break;
    default:
        $('.password-strength .bar:nth-child(1)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(2)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(3)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(4)').css('background-color', defaultColor);
        $('.password-strength .bar:nth-child(5)').css('background-color', defaultColor);
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

document.getElementById('password').addEventListener('input', updateStrengthMeter);
