function createCalendar(daysMonth, monthInNumber, month) {


  $(' header h1').html(month)
  for (var i = 1; i <= daysMonth; i++) {
     var target = $("#calendar-list");
     var data = "<li data-day='" + i + "' data-month='" + monthInNumber + "'>" + i + "</li>"

    target.append(data);
     };
}

function appendHolidays (year,monthInNumber) {
  $.ajax ({
     url : 'https://flynn.boolean.careers/exercises/api/holidays',
     method : 'GET',
     data : {
       'year': year,
       'month': (monthInNumber - 1)
            },
     success : function(data, state) {
       var success = data['success'];
       var holidays = data['response'];
       if (success) {
         for (var i = 0; i < holidays.length; i++) {

            var holiday = holidays[i];
            var date  = holiday["date"];
            var name = holiday["name"];
            var date = moment(date);
            date = date.format ("YYYY-M-D");

            $( "li" ).each(function() {
              var currentDay = $(this);
              var day = currentDay.data("day");
              var month = currentDay.data("month");
              var currentDate = "2018-" + month + "-" + day;
                if (currentDate == date) {
                  $(this).append("<span>" + name + "</span>");
                  $(this).addClass("active");
                }
              })
             }
         }
        else {
         console.log(error);
       }
     },
     error: function(request, state, error) {
       console.log('request' , request);
       console.log('state' , state);
       console.log('error' , error);
     }
    });
}


function init() {
  // SITUAZIONE INIZIALE
 var selectedMonth = 1;
 var calendar = moment("2018-"+ selectedMonth +"-01", "YYYY-M-DD");
 var month = calendar.format("MMMM");
 var year = calendar.format("YYYY");
 var daysMonth = moment(year + "-" + selectedMonth, "YYYY-M").daysInMonth();
  createCalendar(daysMonth, selectedMonth, month);
  appendHolidays(year,selectedMonth);

 // CLICK AVANTI
$('#arrowRight').click(function() {
$("#calendar-list").empty();
selectedMonth = selectedMonth + 1;
$('#arrowLeft').show();

if (selectedMonth == 12) {
  $('#arrowRight').hide();
}

var calendar = moment("2018-"+ selectedMonth +"-01", "YYYY-M-DD");
var month = calendar.format("MMMM");
var daysMonth = moment(year + "-" + selectedMonth, "YYYY-M").daysInMonth();
  createCalendar(daysMonth, selectedMonth, month);
  appendHolidays(year,selectedMonth);
});

// CLICK INDIETRO
$('#arrowLeft').click(function() {
$("#calendar-list").empty();
selectedMonth = selectedMonth - 1;
$('#arrowRight').show();

if (selectedMonth == 1) {
  $('#arrowLeft').hide();
}

var calendar = moment("2018-"+ selectedMonth +"-01", "YYYY-M-DD");
var month = calendar.format("MMMM");
var daysMonth = moment(year + "-" + selectedMonth, "YYYY-M").daysInMonth();
  createCalendar(daysMonth, selectedMonth, month);
  appendHolidays(year,selectedMonth);
});

  };

$( document ).ready(init);
