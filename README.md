# 고전 게임 🚀

유튜브에서 [코딩알려주는 누나](https://www.youtube.com/c/%EC%BD%94%EB%94%A9%EC%95%8C%EB%A0%A4%EC%A3%BC%EB%8A%94%EB%88%84%EB%82%98)를 보고 따라만든 고전게임입니다..!<br/>

## 이미지 만들기

```javascript
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
```

위와 같이 이미지를 저장하는 함수를 만든다.

### 배경 이미지 보여주기

```javascript
ctx = canvas.getContext("2d");
function render() {
  // ctx.drawImage(image, dx, dy, dWidth, dHeight)
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}
```

render 함수를 이용해 이미지를 불러온 뒤,

```javascript
function main() {
  render(); // 그려준다
  requestAnimationFrame(main); // Frame을 계속 호출해주는 함수
}
```

main 함수에서 `requestAnimationFrame()`을 사용해 계속해서 main 함수를 호출하면 이미지가 보인다.

### 우주선 보여주기

위의 배경 이미지 보여주는 것과 동일하게 만들어준다.

```javascript
function render() {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY, 64, 64);
}

function main() {
  render();
  requestAnimationFrame(main); // Frame을 계속 호출해주는 함수
}
```

여기까지 하면 이런 이미지가 나온다<br/>
![game](https://user-images.githubusercontent.com/71690561/190070716-a34b3e8a-ae42-4fae-bc6f-52ca62a4d43b.png)

## 우주선 움직이기

1. keysDown에 key가 눌리면 저장을 하고, 떼어지면 삭제를 한다.

```javascript
let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  });
  document.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  });
}
```

2. keysDown에 39(right), 37(left)가 있으면 3씩 증감시킨다.

```javascript
function update() {
  if (39 in keysDown) {
    //right
    spaceshipX += 3;
  } else if (37 in keysDown) {
    // left
    spaceshipX -= 3;
  }
}
```

3. 우주선이 canvas 밖으로 나가지 않게 한다.

```javascript
function update() {
  ...
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }
}
```

여기서 `canvas.width - 64`로 한 이유는 canvas의 가로폭 - 우주선의 크기이다.

4. 그리기

```javascript
function main() {
  update(); // 좌표값을 업데이트 하고
  render(); // 그려준다
  requestAnimationFrame(main); // Frame을 계속 호출해주는 함수
}
```

## 총알 만들기

1. 스페이스바를 누르면 총알 발사

```javascript
function setupKeyboardListener() {
  ...
  document.addEventListener("keyup", function (e) {
  ...
    if (e.keyCode == 32) {
      //spacebar
      createBullet(); // 총알 생성
    }
  });
}
```

2. 발사된 총알들은 총알 배열에 저장을 해둔다.

> class로 만들어도 되지만 JS에서는 function으로도 가능해서 일단 이렇게 만든다.

```javascript
// 총알들을 저장하는 리스트
let bulletLsit = [];
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    // 초기값
    this.x = spaceshipX + 17;
    this.y = spaceshipY;

    bulletLsit.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };
}
```

```javascript
function createBullet() {
  let b = new Bullet(); // 총알 하나 생성
  b.init();
  console.log("총알 리스트", bulletLsit);
}
```

3. 스페이스바를 누르면 총알 생성

```javascript
function render () {
  ...
for (let i = 0; i < bulletLsit.length; i++) {
    ctx.drawImage(bulletImg, bulletLsit[i].x, bulletLsit[i].y, 30, 30);
  }
}
```

4. 총알을 발사

```javascript
function update() {
  ...
for (let i = 0; i < bulletLsit.length; i++) {
    bulletLsit[i].update();
  }
}
```

총알을 발사하면 `bulletList.update()`를 실행해서 y를 -7씩 줄어들게 한다.
