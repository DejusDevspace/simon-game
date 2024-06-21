var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on('keypress', function () {
    if (started !== true) {
        nextSequence();
        started = !started;
    };
    $('#level-title').text('Level ' + level);
});

function nextSequence () {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);
    var randomNumber = Math.floor((Math.random() * 3) + 1);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeOut(100);
    $('#' + randomChosenColor).fadeIn(100);
    playSound(randomChosenColor);
    
};


$('div .btn').on('click', function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length - 1)) 
} );    


function playSound (name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress (currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
};

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        };
    }

    else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
       startOver();
    };
};

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
};