const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let start = false;

// LISTENING FOR INITIAL KEYPRESS TO START THE GAME:

$(document).keydown(() => {
    if (!start) {
        nextSequence();
        $("h1").text("Level " + level);
        start = true;
    }
});

// HANDLING USER CHOICES:

$(".btn").click((event) => {
    const userChosenColour = event.target.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    const randomNumber = Math.floor((Math.random()*4));
    const randomColour = buttonColours[randomNumber]
    gamePattern.push(randomColour);
    $("#" + randomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);    
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        } 
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function startOver() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    start = false;
    $("h1").text("Press A Key to Start");
}


if (currentLevel === gamePattern[gamePattern.length - 1]) {
    setTimeout(nextSequence, 1000);
} else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
}