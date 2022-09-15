// canvas setting
let canvas;
let ctx; // 이미지를 만드는걸 도와줌
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

// get images
let backgroundImg, spaceshipImg, overImg, enemyImg, bulletImg;

let gameOver = false;
let score = 0;

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

// 총알들을 저장하는 리스트
let bulletLsit = [];
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    // 초기값
    this.x = spaceshipX + 17;
    this.y = spaceshipY;
    this.alive = true; // true 총알이 살아있음
    bulletLsit.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };

  this.checkHit = function () {
    // 총알.y <= 적군.y and
    // 총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 48
      ) {
        // 총알이 달으면 적군이 없어지고 점수 ++
        score++;
        this.alive = false;
        enemyList.splice(i, 1);
      }
    }
  };
}

// 적군
let enemyList = [];

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 48);
    enemyList.push(this);
  };
  this.update = function () {
    this.y += 2;

    if (this.y >= canvas.height - 48) {
      gameOver = true;
    }
  };
}

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

    if (e.keyCode == 32) {
      //spacebar
      createBullet(); // 총알 생성
    }
  });
}

function createBullet() {
  let b = new Bullet(); // 총알 하나 생성
  b.init();
}

function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1000);
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

  // 총알의 y좌표 업데이트 하는 함수 호출
  for (let i = 0; i < bulletLsit.length; i++) {
    if (bulletLsit[i].alive) {
      bulletLsit[i].update();
      bulletLsit[i].checkHit();
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

// image redner
function render() {
  // ctx.drawImage(image, dx, dy, dWidth, dHeight)
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY, 64, 64);

  ctx.fillText(`점수: ${score}`, 20, 20);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";

  for (let i = 0; i < bulletLsit.length; i++) {
    if (bulletLsit[i].alive) {
      ctx.drawImage(bulletImg, bulletLsit[i].x, bulletLsit[i].y, 30, 30);
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImg, enemyList[i].x, enemyList[i].y, 48, 48);
  }
}

function main() {
  if (!gameOver) {
    update(); // 좌표값을 업데이트 하고
    render(); // 그려준다
    // console.log("animation calls main");
    requestAnimationFrame(main); // Frame을 계속 호출해주는 함수
  } else {
    ctx.drawImage(overImg, 10, 100, 380, 380);
  }
}

getImages();
setupKeyboardListener();
createEnemy();
main();
