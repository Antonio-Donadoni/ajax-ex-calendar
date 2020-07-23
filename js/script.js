
function init() {
var calendar = moment("2018-12-01", "YYYY-MM-DD");
var month = calendar.format("MMMM");
var monthInNumber = calendar.format("M");
var year = calendar.format("YYYY");

console.log(monthInNumber);
var daysInMonth = moment().daysInMonth(year + "-" + month, "YYYY-MM");
var target = $("#calendar-list");
for (var i = 1; i <= daysInMonth; i++) {
   var data = "<li data-day='" + i + "' data-month='" + monthInNumber + "'>" + i + " " + month + " 2018</li>"

  target.append(data);
   };

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

     console.log(holidays);

      for (var i = 0; i < holidays.length; i++) {

        var holiday = holidays[i];
        var date  = holiday["date"];
        var name = holiday["name"];
        var date = moment(date);
        date = date.format ("YYYY-M-D");
        console.log(date);
        // console.log(name);
        // console.log(date);

        $( "li" ).each(function() {
          var currentDay = $(this);
          var day = currentDay.data("day");
          var month = currentDay.data("month");
          var currentDate = "2018-" + month + "-" + day;
          console.log(currentDate);
          if (currentDate == date) {
            $(this).append(" " + name);
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

  };

$( document ).ready(init);
