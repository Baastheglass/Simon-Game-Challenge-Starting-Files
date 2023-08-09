var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currlevel = 0;
function playSound(color)
{
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}
function animatePress(color)
{
    $("." + color).addClass("pressed");
    setTimeout(function()
    {
        $("." + color).removeClass("pressed");
    }, 100);
}
function newSequence(pattern, lvl)
{
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour;
    switch(randomNumber)
    {
        case 0:
            randomChosenColour = buttonColours[0];
            $("#" + buttonColours[0]).fadeIn().fadeOut().fadeIn();
            playSound(buttonColours[0]);
            break;
        case 1:
            randomChosenColour = buttonColours[1];
            $("#" + buttonColours[1]).fadeIn().fadeOut().fadeIn();
            playSound(buttonColours[1]);
            break;
        case 2:
            randomChosenColour = buttonColours[2];
            $("#" + buttonColours[2]).fadeIn().fadeOut().fadeIn();
            playSound(buttonColours[2]);
            break;
        case 3:
            randomChosenColour = buttonColours[3];
            $("#" + buttonColours[3]).fadeIn().fadeOut().fadeIn();
            playSound(buttonColours[3]);
            break;
    }
    pattern.push(randomChosenColour); 
}
function ClickHandler()
{
    var correct = true;
    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(userChosenColour === gamePattern[currlevel])
    {
        console.log("Success");
        currlevel++;
        console.log("Current checking level:" + currlevel);
        console.log("Current level: " + level);
    }
    else if(userChosenColour !== gamePattern[currlevel])
    {
        currlevel = 0;
        correct = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(".btn").off("click");
        $(document).click(function()
        {
            $(".btn").click(ClickHandler);
            newSequence(gamePattern, level);
            level++;
            $("#level-title").text("Level " + level);
            $(document).off("click");
        })
    }
    if(currlevel === level && correct === true)
    {
        setTimeout(function()
        {
            newSequence(gamePattern, level);
            level++;
            $("#level-title").text("Level " + level);
        }, 1000)
        currlevel = 0;
    }
}
function main()
{
    $(".btn").click(ClickHandler);
    $(document).click(function()
    {
        newSequence(gamePattern, level);
        level++;
        $("#level-title").text("Level " + level);
        $(document).off("click");
    })    
}    
main();
