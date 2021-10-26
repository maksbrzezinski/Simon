var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 1;


//Start Game "A" keydown listener

$(document).keydown(function(event) {
  var keyPressed = String.fromCharCode(event.keyCode);
  if (keyPressed == "A" && gamePattern.length == 0) {
    nextSequence(event.key);
  }
});

//Start again function

function startOver() {
  level = 1;
  gamePattern = [];
  $(document).one("keydown", function(event) {
    nextSequence(event.key);
  });
}

//Game pattern click listener

$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Check Answer function

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence(event);
      }, 800);
    }
  } else {
    $("#level-title").text("Game Over, press any key to restart");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

//Generate next level

function nextSequence(name) {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);
  level++;
  userClickedPattern = [];
}

//Button animation

function animatePress(currentColor) {
  var pressedButton = $("." + currentColor);
  pressedButton.addClass("pressed");
  var audio = new Audio("sounds/" + currentColor + ".mp3");
  audio.play();
  setTimeout(function() {
    pressedButton.removeClass("pressed");
  }, 80);
}
