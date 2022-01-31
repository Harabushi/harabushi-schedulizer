let schedule = {};
let date;

// localStorage load function JSON.parse array of objects
function loadSchedule () {

  schedule = JSON.parse(localStorage.getItem("schedule"));

  if (!schedule) {
    schedule = {
      "8am": [],
      "9am": [],
      "10am": [],
      "11am": [],
      "12pm": [],
      "1pm": [],
      "2pm": [],
      "3pm": [],
      "4pm": [],
      "5pm": [],
    };
  }

  // loop to fill in schedule
  $.each(schedule, function(time, text) {
      $("#" + time + " .description").text(text);
  });
};

// localStorage save function array of objects
function saveSchedule() {
  localStorage.setItem("schedule", JSON.stringify(schedule));
};

// jquery target text info for clicked timeblock
$(".time-block").on("click", ".description", function() {

  // select clicked entry
  let text = $(this)
  .text()
  .trim();

  // create text area
  let textInput = $("<textarea>")
  .addClass("col-8")
  .val(text);

  // place text area on task text
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
})

// blur event for task
$(".time-block").on("blur", "textarea", function() {

  // get changed text area text
  let text = $(this)
  .val()
  .trim();

  let taskDiv = $("<div>")
  .addClass("col-8 description text-light text-left")
  .text(text);

  // replace textarea with div element
  $(this).replaceWith(taskDiv);

  timeCheck();
});

// check current time and adjust colors for past, present, future
function auditSchedule (currentTime, scheduleEl) {
  
  let timeBlock = $(scheduleEl).find(" > div.description");
  let timeSlot = $(scheduleEl).attr("data-time");
  
  $(timeBlock).removeClass("bg-secondary bg-danger bg-success");

  if ( currentTime < timeSlot ) {
    $(timeBlock).addClass("bg-success");
  }
  else if ( currentTime === timeSlot ) {
    $(timeBlock).addClass("bg-danger");
  }
  else if ( currentTime > timeSlot ) {
    $(timeBlock).addClass("bg-secondary");
  }

}

// save button
$(".icon").click(function() {

  // get changed text area text
  let text = $(this).parent().siblings(".description").text();

  // get parent div.time-block
  let status = $(this)
  .closest(".time-block")
  .attr("id");

  // update schedule object
  if (!text) {
    schedule[status] = [];
  }
  else {
    schedule[status][0] = text;
  }
  
  saveSchedule();
});

// moment for current day and time
function timeCheck() {
  let currentDate = moment().format("dddd, MMMM Do");
  let currentTime = moment().format("H");

  $(".time-block").each(function() {
    auditSchedule(currentTime, $(this))
  });
  
  // check for date changeover
  if ( currentDate !== date ){
    setDate(currentDate);
  };
  // else {
  //   console.log("the date is the same")
  // };

  setTimeout(timeCheck, 5000);
};

function setDate(currentDate) {
  date = currentDate;
  $("#currentDay").text(date)
}

loadSchedule ();
timeCheck ();