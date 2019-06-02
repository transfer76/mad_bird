var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Image files
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Sounds files
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 100;
var score = 0;

// While pressing any key
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -=25;
  fly.play();	
}

// Create new blocks
var pipe = [];
pipe[0] = {
  x : canvas.width,
  y : 0	
};

// Position the bird
var xPos = 10;
var yPos = 150;
var grav = 1;

function draw() {
  context.drawImage(bg, 0,0);

  for(var i = 0; i < pipe.length; i++) {
    context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + 
    pipeUp.height + gap);

    pipe[i].x--;

    if(pipe[i].x == 100) {
      pipe.push({
      	x : canvas.width,
      	y : Math.floor(Math.random() * pipeUp.height) -
      	pipeUp.height
      });
    }

    //collision bird with block
    if(xPos + bird.width >= pipe[i].x
      && xPos <= pipe[i].x + pipeUp.width
      && (yPos <= pipe[i].y + pipeUp.height
    	|| yPos + bird.height >= pipe[i].y + pipeUp.height +
    	gap) || yPos + bird.height >= canvas.height - fg.height) {
          location.reload(); // Reload page
        }

    if(pipe[i].x == 5) {
      score++;
      score_audio.play();
    }    
  }
  
  context.drawImage(fg, 0, canvas.height - fg.height);
  context.drawImage(bird, xPos, yPos);

  yPos += grav;

  context.fillStyle = "#000";
  context.font = "24px Verdana";
  context.fillText("Score: " + score, 10,canvas.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;