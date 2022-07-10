let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const bg = new Image();
const bird = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bg.src = "./images/bg.png";
bird.src = "./images/bird.png";
fg.src = "./images/fg.png";
pipeNorth.src = "./images/pipeNorth.png";
pipeSouth.src = "./images/pipeSouth.png";

const fly = new Audio();
const scoreAudio = new Audio();
const hit = new Audio();

fly.src = "./sounds/fly.mp3";
scoreAudio.src = "./sounds/score.mp3";
hit.src = "./sounds/hit.mp3";

const gap = 85;
let bX = 10;
let bY = 150;
let gravety = 0;
let score = 0;


function keyHandler() {
  bY -= 20;
  gravety = 0;
  fly.play();
}
document.addEventListener("keydown", keyHandler);

let pipe = [];

pipe[0] = {
  x: canvas.width,
  y: -100,
};

function draw() {
  gravety += 0.2;
  let constant = pipeNorth.height + gap;
  ctx.drawImage(bg, 0, 0);
  for (pip of pipe) {
    ctx.drawImage(pipeNorth, pip.x, pip.y);
    ctx.drawImage(pipeSouth, pip.x, pip.y + constant);
    pip.x -= 1.5;
    if (pip.x == 90) {
      pipe.push({
        x: canvas.width,
        y: -Math.floor(Math.random() * pipeNorth.height),
      });
    }

    if (pip.x >= 5 && pip.x <= 7) {
      score++;
      scoreAudio.play();
    }

    // Detect collision
    if (( bX + bird.width >= pip.x && bX <= pip.x + pipeNorth.width && (bY <= pip.y + pipeNorth.height || bY + bird.height >= pip.y + constant )) || ( bY + bird.height >= canvas.height - fg.height )) {
      hit.play()
      for (pip of pipe) {
        ctx.drawImage(pipeNorth, pip.x, pip.y);
        ctx.drawImage(pipeSouth, pip.x, pip.y + constant);
      }
      ctx.drawImage(fg, 0, canvas.height - fg.height);
      ctx.drawImage(bird, bX, bY);
      ctx.fillStyle = "#000"
      ctx.font = "20px Tahoma"
      ctx.fillText(`Score: ${score}`, 10, canvas.height - 70)
      document.removeEventListener("keydown", keyHandler)
      return
    }
  }
  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, bX, bY);
  bY += gravety;
  ctx.fillStyle = "#000";
  ctx.font = "20px Tahoma";
  ctx.fillText(`Score: ${score}`, 10, canvas.height - 70);
  requestAnimationFrame(draw);
}

let myReq = requestAnimationFrame(draw);
