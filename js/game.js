var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png"
bg.src = "img/bg.png"
fg.src = "img/fg.png"
pipeUp.src = "img/pipeUp.png"
pipeBottom.src = "img/pipeBottom.png"

var gap = 90;

document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -=25;	
}

var pipe = [];
pipe[0] = {
  x : canvas.width,
  y : 0	
}
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
    if (xPos + bird.width >= pipe[i].x
    	&& xPos <= pipe[i].x + pipeUp.width
    	&& (yPos <=pipe[i].y + pipeUp.height
    		|| yPos + bird.height >= pipe[i].y + pipeUp.height +
    		gap) || yPos + bird.height >= canvas.height - fg.height) {
              location.reload(); // Reload page
            }
  }
  
  context.drawImage(fg, 0, canvas.height - fg.height);
  context.drawImage(bird, xPos, yPos);

  yPos += grav;
  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;