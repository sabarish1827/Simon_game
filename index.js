
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// start game
var started = false;

var level = 0;

// game initiator
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// button click
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); // getting the id of the clicked button
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// creating sequence
function nextSequence() {
    userClickedPattern = []; // reseting user pattern in every level
  level++; //incrementing levels

  $("#level-title").text("Level " + level); //displaying levels in title

  var randomNumber = Math.floor(Math.random() * 4); //randomly genarating a color
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // storing the generated color in game pattern

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// game sound effects
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Button animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//function to check user inputs
function checkAnswer(currentLevel) {
    // correct inputs
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        // if wrong input
  playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();

    }

}

// Game restart
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}