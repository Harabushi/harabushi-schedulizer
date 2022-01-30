let schedule = {};

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
    console.log(time, text)

    // arr.forEach(function(schedule) {
      $("#" + time + " .description").text(text);
    // });
  });
};

// localStorage save function array of objects
function saveSchedule() {
  console.log(schedule);
  localStorage.setItem("schedule", JSON.stringify(schedule));
};

// jquery target text info for clicked timeblock
$(".time-block").on("click", ".description", function() {
  //console.log($(this))

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

  // get parent div.time-block don't actually need this I think
  let status = $(this)
  .closest(".time-block")
  .attr("id");

  schedule[status][0] = text;
  saveSchedule();
  // console.log(schedule);

  let taskDiv = $("<div>")
  .addClass("col-8 description text-left")
  .text(text);

  // replace textarea with div element
  $(this).replaceWith(taskDiv);

  // empty out array instead of array of ""
  // if ( text == "" ) {
  // function () {
  //   let tempArr = [];
  //  }
  // }
});

// save button saves $(this) to page and calls localStorage save

// moment for current day and time, print time to screen

// color text areas for past, present, future

// check current time and adjust colors

// setInterval check for hour changeover

loadSchedule ();