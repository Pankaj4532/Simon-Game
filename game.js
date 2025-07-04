
var buttonColors = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function (){
  if(!started){
    $("#level-title").text("Level " + level);
     nextSequence();
     started=0;
  }
 
});



function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function (){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    $("level-title").text("Game Over, Press any key to restart");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }

}






$(".btn").click(function (){
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);

  playSound(userChoosenColor);
  animatePress(userChoosenColor);

  checkAnswer(userClickedPattern.length-1); 

});


function nextSequence(){
  userClickedPattern =[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber =Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

 $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
}


function playSound(name){
  var audio =new Audio("/sounds/"+name+".mp3");
  audio.play();
}




function animatePress(currentColor){

  $("#"+currentColor).addClass("pressed");

  setTimeout(function (){
    $("#"+currentColor).removeClass("pressed");
  },100);

}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}