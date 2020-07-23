function createCalendar() {
  for (var i = 1; i <= daysInMonth; i++) {
     var target = $("#calendar-list");
     var data = "<li data-day='" + i + "' data-month='" + monthInNumber + "'>" + i + " " + month + " 2018</li>"

    target.append(data);
     };
}

function appendHolidays () {
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
                  $(this).append("<span>- " + name + "</span>");
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

 calendar = moment("2018-04-01", "YYYY-MM-DD");
 month = calendar.format("MMMM");
 monthInNumber = calendar.format("M");
 year = calendar.format("YYYY");
 daysInMonth = moment().daysInMonth(year + "-" + month, "YYYY-MM");


createCalendar();

appendHolidays();

  };

$( document ).ready(init);
