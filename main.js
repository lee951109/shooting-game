// canvas setting
let canvas;
let ctx; // 이미지를 만드는걸 도와줌
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

// get images
let backgroundImg, spaceshipImg, overImg, enemyImg, bulletImg;

function getImages() {
  backgroundImg = new Image();
  backgroundImg.src = "images/background.gif";

  spaceshipImg = new Image();
  spaceshipImg.src = "images/spaceship.png";

  overImg = new Image();
  overImg.src = "images/gameover.png";

  enemyImg = new Image();
  enemyImg.src = "images/enemy.png";

  bulletImg = new Image();
  bulletImg.src = "images/bullet.png";
}

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  });
  document.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  });
}

function update() {
  if (39 in keysDown) {
    //right
    spaceshipX += 3;
  } else if (37 in keysDown) {
    // left
    spaceshipX -= 3;
  }

  // 우저선이 화면 밖으로 나가지 않게
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }
}

// image redner
function render() {
  // ctx.drawImage(image, dx, dy, dWidth, dHeight)
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY, 64, 64);
}

function main() {
  update(); // 좌표값을 업데이트 하고
  render(); // 그려준다
  // console.log("animation calls main");
  requestAnimationFrame(main); // Frame을 계속 호출해주는 함수
}

getImages();
setupKeyboardListener();
main();
