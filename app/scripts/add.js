// var checkbox = document.querySelector("input[name=is_return]");
//
// checkbox.addEventListener( 'change', function() {
//     console.log("1");
//     if(this.checked) {
//         console.log("1");
//         $('#destination-elements').hide();
//     } else {
//         console.log("1");
//         $('#destination-elements').show();
//     }
// });
$('#alert').hide();
$('#destination-elements').hide();
$('.week_select').hide();
var date = new Date();
$('input[name=journey_start_date]').val(date.toISOString().substr(0, 10));
// console.log(date.toISOString().substr(11, 5));
$('input[name=journey_origin_time]').val(date.toISOString().substr(11,5));
date.setHours(date.getHours() + 1);
$('input[name=journey_return_time]').val(date.toISOString().substr(11,5));

$('input[name=is_return]').change(function(){
    if($(this).is(':checked')) {
        $('#destination-elements').show(500);
        $("input[name=journey_return_time]").prop('required',true);
        $("input[name=journey_return_postcode]").prop('required',true);
        $("input[name=journey_return_name]").prop('required',true);
    } else {
        $('#destination-elements').hide(500);
        $("input[name=journey_return_time]").prop('required',false);
        $("input[name=journey_return_postcode]").prop('required',false);
        $("input[name=journey_return_name]").prop('required',false);
    }
});



$('input[name=is_recurring]').change(function(){
    if($(this).is(':checked')) {
        $('.week_select').show(250);

    } else {
        $('.week_select').hide(250);
    }
});


var days_of_week = [];
var is_recurring = false;
var is_return = false;
var is_journey = true;
var journey_title, journey_start_date, journey_end_date;
var journey_origin_name, journey_origin_time, journey_origin_postcode, journey_origin_latitude, journey_origin_longitude, journey_origin_incode, journey_origin_outcode;
var journey_destination_name, journey_destination_time, journey_destination_postcode, journey_destination_latitude, journey_destination_longitude, journey_destination_incode, journey_destination_outcode;

$('#addForm').submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    // var url = "https://api.journeys.io/user/login"; // the script where you handle the form input.
    //var url = 'https://p6flgqzkv2.execute-api.eu-west-1.amazonaws.com/stage1/user/login';
    var data = $('#addForm').serializeArray();


    for(var i = 0; i < data.length; i++){

        //check if_reccuring
        if(data[i].name === "is_recurring"){
            if(data[i].value) {
                is_recurring = true;
            } else {
                is_recurring = false;
            }
        }

        //check if return
        if(data[i].name === "is_return"){
            if(data[i].value) {
                is_return = true;
            } else {
                is_return = false;
            }
        }

        //sort days of week
        //probably resource intesive change at a later date
        for(var j = 0; j < 7; j++){
            var test = "sel_" + j;
            if(data[i].name === test){
                days_of_week.push(j);
            }
        }

        //set event title
        if(data[i].name === "journey_title"){
            journey_title = data[i].value;
        }

        //set start date
        if(data[i].name === "journey_start_date"){
            journey_start_date = data[i].value;
        }

        //set end date
        if(data[i].name === "journey_end_date"){
            journey_end_date = data[i].value;
        }

        //set origin name
        if(data[i].name === "journey_origin_name"){
            journey_origin_name = data[i].value;
        }

        //set origin time
        if(data[i].name === "journey_origin_time"){
            journey_origin_time = data[i].value;
        }

        //verify origin
        if(data[i].name === "journey_origin_postcode"){
            var returnData = $.ajax({
                dataType: "jsonp",
                async: false,
                url: "https://api.postcodes.io/postcodes/" + data[i].value,
                // success:function(data) {
                //     if(data.status === 200){
                //         $('#alert').hide();
                //         journey_origin_postcode = data.result.postcode;
                //         journey_origin_latitude = data.result.latitude;
                //         journey_origin_longitude = data.result.longitude;
                //         journey_origin_incode = data.result.incode;
                //         journey_origin_outcode = data.result.outcode;
                //         console.log(data.result);
                //     } else if (data.status === 404){
                //         console.log("bad postcode");
                //         $('#alert').html("bad postcode entered");
                //         $('#alert').show();
                //     } else {
                //         console.log("error");
                //         console.log(data.status);
                //     }
                // }
            });
            console.log(returnData);
            console.log(returnData.responseJSON);
        }

        //set destination name
        if(data[i].name === "journey_destination_name"){
            journey_destination_name = data[i].value;
        }

        //set destination time
        if(data[i].name === "journey_destination_time"){
            journey_destination_time = data[i].value;
        }

        //verify destination
        if(data[i].name === "journey_destination_postcode"){
            var returnData = $.ajax({
                dataType: "jsonp",
                async: false,
                url: "https://api.postcodes.io/postcodes/" + data[i].value,
                // success:function(data) {
                //     // if(data.status === 200){
                //     //     $('#alert').hide();
                //     //     journey_destination_postcode = data.result.postcode;
                //     //     journey_destination_latitude = data.result.latitude;
                //     //     journey_destination_longitude = data.result.longitude;
                //     //     journey_destination_incode = data.result.incode;
                //     //     journey_destination_outcode = data.result.outcode;
                //     // } else if (data.status === 404){
                //     //     console.log("bad postcode");
                //     //     $('#alert').html("bad postcode entered");
                //     //     $('#alert').show();
                //     // } else {
                //     //     console.log("error");
                //     //     console.log(data.status);
                //     // }
                // }
            });
            if(returnData.status === 200){
                $('#alert').hide();
                journey_destination_postcode = returnData.result.postcode;
                journey_destination_latitude = returnData.result.latitude;
                journey_destination_longitude = returnData.result.longitude;
                journey_destination_incode = returnData.result.incode;
                journey_destination_outcode = returnData.result.outcode;
            } else if (returnData.status === 404){
                console.log("bad postcode");
                $('#alert').html("bad postcode entered");
                $('#alert').show();
            } else {
                console.log("error");
                console.log(returnData.status);
            }
        }
    }

    console.log(days_of_week + ", " + is_recurring);

    //setup final postArray

    var output = {
        journey_title: journey_title,
        journey_start_date: journey_start_date,
        journey_end_date: journey_end_date,
        origin: {
            name: journey_origin_name,
            postcode: journey_origin_postcode,
            latitude: journey_origin_latitude,
            longitude: journey_origin_longitude,
            incode: journey_origin_incode,
            outcode: journey_origin_outcode,
            time: journey_origin_time
        },
        destination: {
            name: journey_destination_name,
            postcode: journey_destination_postcode,
            latitude: journey_destination_latitude,
            longitude: journey_destination_longitude,
            incode: journey_destination_incode,
            outcode: journey_destination_outcode,
            time: journey_destination_time
        },
        pattern: {
            is_journey: is_journey,
            is_recurring: is_recurring,
            is_return: is_return,
            days_of_week: days_of_week
        }
    }
    console.log(JSON.stringify(output));
        //
    // $.ajax({
    //        type: 'POST',
    //        url: url,
    //        data: JSON.stringify(output), // serializes the form's elements.
    //        success: function(data)
    //        {
    //            console.log(data);
    //            if(data.errorMessage){
    //                console.log('uh oh');
    //            } else if(data.id){
    //                var date = new Date();
    //                date.setTime(+ date + (1 * 86400000));
    //                //document.cookie = "Cookie=" + data.id + "; expires="+ date.toGMTString() + " domain='api.journeys.io' path=/";
    //                document.cookie = 'Cookie=' + data.id + '; expires='+ date.toGMTString() + ' path=/';
    //                window.location.replace('/calendar.html');
    //            } else {
    //                console.log('fail');
    //            }
    //        },
    //        error: function(data){
    //            console.log(data);
    //        }
    //      });


});
