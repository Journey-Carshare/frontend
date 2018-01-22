function setCalendarMonthTitle(dateIn) {
    "use strict";
    var today = dateIn;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var output = months[today.getMonth()] + " " + today.getFullYear();
    document.getElementById("titleMonth").innerHTML = output;
}

function setCalendarWeekTitle(calendar) {
    "use strict";
    var output = calendar.week[0].date + " - " + calendar.week[4].date;
    document.getElementById("titleWeek").innerHTML = output;
}

function setCalendarArray(dateIn) {
    "use strict";
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var today = dateIn;
    var calendar = {
        week: []
    };
    var i;
    for(i = 0; i < 5; i++){
        var date1 = today.getDate() + i;
        var day1 = days[today.getDay() + i];

        calendar.week.push({
            "day": day1,
            "date": date1
        });
    }
    return calendar;
}

function setupCalendarDiv(calendar) {
    "use strict";
    var output = "";
    var j;
    for(j = 0; j < 5; j++){
        output += "<div class='mat-cal-foot-day-element'><div class='date'>";
        output += calendar.week[j].date;
        output += "<div class='day'>";
        output += calendar.week[j].day;
        output += "</div></div><div class='mat-cal-foot-day-journey'><div class='mat-cal-foot-day-journey-element bg-morn'><div class='title'>To Work</div><div class='location'><i class='fa fa-map-marker'></i> UB7 9HF</div><div class='time'><i class='fa fa-clock-o'></i> 07:40</div><div class='icon'><i class='fa fa-sun-o'></i></div></div><div class='mat-cal-foot-day-journey-element bg-aft'><div class='title'>To Home</div><div class='location'><i class='fa fa-map-marker'></i> RG2 6GF</div><div class='time'><i class='fa fa-clock-o'></i> 16:00</div><div class='icon'><i class='fa fa-moon-o'></i></div></div></div></div>";
        console.log(output);
    }
    document.getElementById("calendarContainer").innerHTML = output;
}

function setupCalendar() {
    "use strict";
    var today = new Date();
    setCalendarMonthTitle(today);
    var calendar = setCalendarArray(today);
    setCalendarWeekTitle(calendar);
    setupCalendarDiv(calendar);
}

setupCalendar();

// console.log(today.);

// var output;
// output += "<div class='mat-cal-foot-day-element'><div class='date'>";
// output += "08"
// output += "<div class='day'>";
// output += "Mon"
// output += "</div></div><div class='mat-cal-foot-day-journey'><div class='mat-cal-foot-day-journey-element bg-morn'><div class='title'>To Work</div><div class='location'><i class='fa fa-map-marker'></i> UB7 9HF</div><div class='time'><i class='fa fa-clock-o'></i> 07:40</div><div class='icon'><i class='fa fa-sun-o'></i></div></div><div class='mat-cal-foot-day-journey-element bg-aft'><div class='title'>To Home</div><div class='location'><i class='fa fa-map-marker'></i> RG2 6GF</div><div class='time'><i class='fa fa-clock-o'></i> 16:00</div><div class='icon'><i class='fa fa-moon-o'></i></div></div></div></div>";
