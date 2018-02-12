function setCalendarMonthTitle(dateIn) {
    'use strict';
    var today = dateIn;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var output = months[today.getMonth()] + ' ' + today.getFullYear();
    document.getElementById('titleMonth').innerHTML = output;
}

function setCalendarWeekTitle(calendar) {
    'use strict';
    var output = calendar.week[0].date + ' - ' + calendar.week[4].date;
    document.getElementById('titleWeek').innerHTML = output;
}

function setCalendarArray(dateIn) {
    'use strict';
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var today = dateIn;
    var calendar = {
        week: []
    };
    var i;
    for(i = 0; i < 7; i++){
        var date1 = today.getDate() + i;
        var day1;
        if((today.getDay() + i) > 6){
            day1 = days[(today.getDay() + i) - 7];
        } else {
            day1 = days[today.getDay() + i];
        }

        calendar.week.push({
            'day': day1,
            'date': date1
        });
    }
    return calendar;
}

// function setupCalendarDiv(calendar) {
//     "use strict";
//     var output = "";
//     var j;
//     $()
//     for(j = 0; j < 5; j++){
//         output += "<div class='mat-cal-foot-day-element'><div class='date'>";
//         output += calendar.week[j].date;
//         output += "<div class='day'>";
//         output += calendar.week[j].day;
//         output += "</div></div><div class='mat-cal-foot-day-journey'><div class='mat-cal-foot-day-journey-element bg-morn'><div class='title'>To Work</div><div class='location'><i class='fa fa-map-marker'></i> UB7 9HF</div><div class='time'><i class='fa fa-clock-o'></i> 07:40</div><div class='icon'><i class='fa fa-sun-o'></i></div></div><div class='mat-cal-foot-day-journey-element bg-aft'><div class='title'>To Home</div><div class='location'><i class='fa fa-map-marker'></i> RG2 6GF</div><div class='time'><i class='fa fa-clock-o'></i> 16:00</div><div class='icon'><i class='fa fa-moon-o'></i></div></div></div></div>";
//     }
//     document.getElementById("calendarContainer").innerHTML = output;
// }

function getCalendarJSON(){
    return $.getJSON( 'data/calendar.json').then(function(data) {
        return data;
    });
};

function returnCurrentDay(int){
    var today = new Date();
    var int2 = 0;
    if(int){
        int2 = int;
    }
    while(int2 > 7){
        int2 -= 7;
    }
    today.setDate(today.getDate() + int2);
    return today.getDay();
}

function dayIntToSring(int){
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var input = int;
    while(input > 7){
        input -= 7;
    }
    return days[input];
}


function processJourneys(calendar){
    'use strict';
    getCalendarJSON().then(function(returndata){

        ///////////////////////////////
        // Setup final array //
        ////////////////////////////
        var finalJson = [];
        var finalDate = new Date;    //get todays date
        finalDate.setHours(0);
        finalDate.setMinutes(0);
        finalDate.setSeconds(0);
        finalDate.setMilliseconds(0);
        for(var k = 0; k < 7; k++){
            // finalJson.push({});
            finalJson.push({
                "day": finalDate.getDay(),
                "date": finalDate.getDate(),
                "month": finalDate.getMonth(),
                "year": finalDate.getFullYear(),
                "no_travel": false,
                "single_journey": false,
                "journeys": []
            });
            finalDate.setDate(finalDate.getDate() + 1);
        }

        ////////////////////////////////////////////////////////
        // convert Journeys to days of week //
        /////////////////////////////////////////////////////

        var i, j;
        for(i = 0; i < returndata.length; i++){
            //console.log(returndata[i].pattern.days_of_week);

            if(returndata[i].pattern.is_journey) {
                if(returndata[i].pattern.is_recurring) {
                    for(j = 0; j < 7; j++){
                        if(finalJson[j].single_journey){
                            // if single_journey flag has not been set in outputJson
                            //Do Nothing
                        } else {
                            // if single_journey flag has not been set in outputJson
                            if(returndata[i].pattern.days_of_week.includes(returnCurrentDay(j))){
                                //Handle reccuring journeys
                                finalJson[j].journeys.push({
                                    "name" : returndata[i].origin.name,
                                    "postcode": returndata[i].origin.postcode,
                                    "time": returndata[i].origin.time,
                                    "type": "outbound"
                                });
                                if(returndata[i].pattern.is_return){
                                    //handle reccuring return journeys
                                    finalJson[j].journeys.push({
                                        "name" : returndata[i].destination.name,
                                        "postcode": returndata[i].destination.postcode,
                                        "time": returndata[i].destination.time,
                                        "type": "return"
                                    });
                                }
                            } else {
                                //Handle Journey not part of current day
                                // Do Nothing
                            }
                        }
                    }
                } else {
                    //Handle Not Reccuring
                    var f;
                    for(f = 0; f < 7; f++){
                        //check date is not in past
                        var todaySingle = new Date();
                        todaySingle.setHours(0);
                        todaySingle.setMinutes(0);
                        todaySingle.setSeconds(0);
                        todaySingle.setMilliseconds(0);
                        var arrayDate = new Date(returndata[i].start_date)
                        if (todaySingle < arrayDate){
                            //date is in future
                            // check date is not more than one week away
                            todaySingle.setDate(todaySingle.getDate() + 7);
                            if ( arrayDate <= todaySingle){
                                //date is this week
                                // check date vs finalJson
                                if(finalJson[f].day === arrayDate.getDay()){
                                    // set single_journey flag  in outputJson
                                    if(!finalJson[f].single_journey){ // if flag not set, set flag and clear journeys
                                        finalJson[f].single_journey = true;
                                        finalJson[f].journeys = [];
                                    }

                                    //Handle Not Reccuring outbound
                                    finalJson[f].journeys.push({
                                        "name" : returndata[i].origin.name,
                                        "postcode": returndata[i].origin.postcode,
                                        "time": returndata[i].origin.time,
                                        "type": "outbound"
                                    });
                                    // handle single return journey
                                    if(returndata[i].pattern.is_return){
                                        //handle not reccuring return
                                        finalJson[f].journeys.push({
                                            "name" : returndata[i].destination.name,
                                            "postcode": returndata[i].destination.postcode,
                                            "time": returndata[i].destination.time,
                                            "type": "return"
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                //Handle not journeys
                var date2 = new Date(returndata[i].start_date);
                var todayDate = new Date();
                todayDate.setHours(0);
                todayDate.setMinutes(0);
                todayDate.setSeconds(0);
                todayDate.setMilliseconds(0);
                var oneweekfuture = new Date();
                oneweekfuture.setHours(0);
                oneweekfuture.setMinutes(0);
                oneweekfuture.setSeconds(0);
                oneweekfuture.setMilliseconds(0);
                oneweekfuture.setDate(todayDate.getDate() + 7);
                if(todayDate < date2){  // check no travel is in the future
                    if(date2 <= oneweekfuture) {
                        //handle no journey this week
                        for(var l = 0; l < 7; l++){
                            if(finalJson[l].day === date2.getDay()){
                                finalJson[l].no_travel = true;                  //if date in array matches journey then set no_travel flag to true
                            };
                        };
                    } else {
                        //Handle no jouney not this week
                        // Do nothing
                    }
                } else {
                    //Handle no journey before today
                    // Do nothing
                }
            }

        }

        ////////////////////////////////////////////////
        // If no journey make no travel //
        /////////////////////////////////////////////
        var g;
        for(g = 0; g < 7; g++){
            if (finalJson[g].journeys.length === 0){
                finalJson[g].no_travel = true;
            }
        }

        console.log(JSON.stringify(finalJson));

        /////////////////////////////////////////////////
        // Turn finalJson into elements //
        //////////////////////////////////////////////

        var output = "";
        var h;
        for(h = 0; h < 7; h++){
            var k;
            output += '<div class=\'mat-cal-foot-day-element\'><div class=\'date\'>';
            output += finalJson[h].date;
            output += '<div class=\'day\'>';
            output += dayIntToSring(finalJson[h].day);
            output += '</div></div><div class=\'mat-cal-foot-day-journey\'>';
            if(finalJson[h].no_travel){
                // handle NO travel
                output += '<div class=\'mat-cal-foot-day-journey-element bg-danger\'><div class=\'title\'>';
                output += "No Travel Today";
                output += '</div><div class=\'icon\'><i class=\'fas fa-minus-circle\'></i></div></div>';
            } else {
                for(k = 0; k < finalJson[h].journeys.length; k++){
                    output += '<div class=\'mat-cal-foot-day-journey-element bg-' + finalJson[h].journeys[k].type + '\'><div class=\'title\'>';
                    output += finalJson[h].journeys[k].name;
                    output += '</div><div class=\'location\'><i class=\'fas fa-map-marker-alt\'></i> ' ;
                    output += finalJson[h].journeys[k].postcode;
                    output += '</div><div class=\'time\'><i class=\'fas fa-clock\'></i> ';
                    output += finalJson[h].journeys[k].time;
                    var icon;
                    if (finalJson[h].journeys[k].type === "outbound") {
                        icon = 'fa-arrow-right';
                    } else if (finalJson[h].journeys[k].type === "return") {
                        icon = 'fa-arrow-left';
                    } else {
                        icon = 'fa-sun';
                    }
                    output += '</div><div class=\'icon\'><i class=\'fas ' + icon + '\'></i></div></div>';
                }
            }
            output += '</div></div></div></div>';
        }
        document.getElementById('calendarContainer').innerHTML = output;
    });
}




// function processJourneys(calendar){
//     'use strict';
//     var finalJson = {};
//     getCalendarJSON().then(function(returndata){
// for(j = 0; j < 7; j++){
//     var k;
//     output += '<div class=\'mat-cal-foot-day-element\'><div class=\'date\'>';
//     output += calendar.week[j].date;
//     output += '<div class=\'day\'>';
//     output += calendar.week[j].day;
//     output += '</div></div><div class=\'mat-cal-foot-day-journey\'>';
//     for(k = 0; k < calData.calendar[j].journeys.length; k++){
//         output += '<div class=\'mat-cal-foot-day-journey-element bg-' + calData.calendar[j].journeys[k].event + '\'><div class=\'title\'>';
//         output += calData.calendar[j].journeys[k].name;
//         output += '</div><div class=\'location\'><i class=\'fas fa-map-marker-alt\'></i> ' ;
//         output += calData.calendar[j].journeys[k].postcode;
//         output += '</div><div class=\'time\'><i class=\'fas fa-clock\'></i> ';
//         output += calData.calendar[j].journeys[k].time;
//         var icon;
//         if(calData.calendar[j].journeys[k].event == 'danger'){
//             icon = 'fa-minus-circle';
//         } else if(calData.calendar[j].journeys[k].event == 'evening'){
//             icon = 'fa-moon';
//         } else {
//             icon = 'fa-sun';
//         }
//         output += '</div><div class=\'icon\'><i class=\'fas ' + icon + '\'></i></div></div>';
//     }
//         output += '</div></div></div></div>';
// }
// document.getElementById('calendarContainer').innerHTML = output;
//     });
// }

function setupCalendarDiv(calendar) {
    'use strict';
    var output = '';
    var j;
    getCalendarJSON().then(function(returndata){
        var calData = returndata;
        for(j = 0; j < 7; j++){
            var k;
            output += '<div class=\'mat-cal-foot-day-element\'><div class=\'date\'>';
            output += calendar.week[j].date;
            output += '<div class=\'day\'>';
            output += calendar.week[j].day;
            output += '</div></div><div class=\'mat-cal-foot-day-journey\'>';
            for(k = 0; k < calData[j].length; k++){
                output += '<div class=\'mat-cal-foot-day-journey-element bg-' + calData[j][k].event + '\'><div class=\'title\'>';
                output += calData[j][k].name;
                output += '</div><div class=\'location\'><i class=\'fas fa-map-marker-alt\'></i> ' ;
                output += calData[j][k].postcode;
                output += '</div><div class=\'time\'><i class=\'fas fa-clock\'></i> ';
                output += calData[j][k].time;
                var icon;
                if(calData[j][k].event == 'danger'){
                    icon = 'fa-minus-circle';
                } else if(calData[j][k].event == 'evening'){
                    icon = 'fa-moon';
                } else {
                    icon = 'fa-sun';
                }
                output += '</div><div class=\'icon\'><i class=\'fas ' + icon + '\'></i></div></div>';
            }
            output += '</div></div></div></div>';
        }
        document.getElementById('calendarContainer').innerHTML = output;
    });
}

function setupCalendar() {
    'use strict';
    var today = new Date();
    setCalendarMonthTitle(today);
    var calendar = setCalendarArray(today);

    //testing
    // var date = new Date;
    // date.setHours(0);
    // date.setMinutes(0);
    // date.setSeconds(0);
    // date.setMilliseconds(0);
    // console.log(date.toISOString());
    setCalendarWeekTitle(calendar);
    processJourneys(calendar);
    // setupCalendarDiv(calendar);
}

setupCalendar();

// console.log(today.);

// var output;
// output += "<div class='mat-cal-foot-day-element'><div class='date'>";
// output += "08"
// output += "<div class='day'>";
// output += "Mon"
// output += "</div></div><div class='mat-cal-foot-day-journey'><div class='mat-cal-foot-day-journey-element bg-morn'><div class='title'>To Work</div><div class='location'><i class='fa fa-map-marker'></i> UB7 9HF</div><div class='time'><i class='fa fa-clock-o'></i> 07:40</div><div class='icon'><i class='fa fa-sun-o'></i></div></div><div class='mat-cal-foot-day-journey-element bg-aft'><div class='title'>To Home</div><div class='location'><i class='fa fa-map-marker'></i> RG2 6GF</div><div class='time'><i class='fa fa-clock-o'></i> 16:00</div><div class='icon'><i class='fa fa-moon-o'></i></div></div></div></div>";
