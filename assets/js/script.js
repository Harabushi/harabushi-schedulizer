let tasks = {};

function loadTasks () {
  tasks = {
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
  }
}

function saveTasks () {
  
}
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
  var status = $(this)
  .closest(".time-block")
  .attr("id");

  tasks[status].text = text;
  console.log(tasks);

  let taskDiv = $("<div>")
  .addClass("col-8 description text-left")
  .text(text);

  // replace textarea with div element
  $(this).replaceWith(taskDiv);

  if ( text === "") {
    
  }
});

// save button saves $(this) to page and calls localStorage save

// localStorage save function array of objects

// localStorage load function JSON.parse array of objects

// moment for current day and time, print time to screen

// color text areas for past, present, future

// check current time and adjust colors

// setInterval check for hour changeover

loadTasks();