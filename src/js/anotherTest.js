let player = document.getElementById("player");
let boundary = document.getElementById("body");

// alert(`The game time will start on the first click or touch.`);

let startTime = 0;

let endTime = function () {
  return new Date().getTime() - startTime;
};

document.addEventListener(
  "click",
  () => {
    gameStart();
    startTime = new Date().getTime();
    console.log(startTime);
    return startTime;
  },
  { once: true }
);

document.addEventListener(
  "touchstart",
  () => {
    gameStart();
    startTime = new Date().getTime();
    console.log(startTime);
    return startTime;
  },
  { once: true }
);

document.addEventListener(
  "touchstart",
  function (e) {
    e.preventDefault();
    touchPlayerMove(e);
    document.addEventListener("touchmove", touchPlayerMove, { passive: false });
  },
  { passive: false }
);

document.addEventListener(
  "mousedown",
  function (e) {
    e.preventDefault();
    touchPlayerMove(e);
    document.addEventListener("mousemove", touchPlayerMove, { passive: false });
  },
  { passive: false }
);

document.addEventListener(
  "onmouseup",
  () => {
    touchPlayerMove = null;
  },
  { passive: false }
);
// ------------------------------

function touchPlayerMove(e) {
  e.preventDefault();
  let x = 0;
  let y = 0;
  if (e.touches) {
    x = e.touches[0].clientX - player.offsetWidth / 2;
    y = e.touches[0].clientY - player.offsetHeight / 2;
    console.log(x, y + " touch");
  } else if (!e.touches) {
    x = e.pageX - player.offsetWidth / 2;
    y = e.pageY - player.offsetHeight / 2;
    console.log(x, y + " mouse");
  }
  let zero = 0;

  // setting the player position
  player.style.transform = `translate(${x}px, ${y}px)`;

  // horizontal boundary
  if (x >= window.innerWidth - player.offsetWidth) {
    player.style.transform = `translate(${
      window.innerWidth - player.offsetWidth
    }px, ${y}px)`;
  } else if (x <= 0) {
    player.style.transform = `translate(${zero}px, ${y}px)`;
  }
  // vertical boundary

  if (y >= window.innerHeight - player.offsetHeight) {
    player.style.transform = `translate(${x}px, ${
      window.innerHeight - player.offsetHeight
    }px`;
  } else if (y <= 0) {
    player.style.transform = `translate(${x}px, ${zero}px)`;
  }
}

// Enemy Element And Movement
let enemy = document.getElementsByClassName(`enemy`);
let gameState = true;

let speed = 2;

function gameStart() {
  let speedChange = setInterval(function () {
    speed++;
  }, 3000);
  speedChange;

  Array.from(enemy).forEach((enemy) => {
    let hFlag = true;
    let vFlag = true;
    function movement() {
      let enemyPos = enemy.getBoundingClientRect();
      let playerPos = player.getBoundingClientRect();
      let x = enemy.offsetLeft;
      let y = enemy.offsetTop;
      if (gameState) {
        if (hFlag) {
          x += speed;
          enemy.style.left = `${x}px`;
          if (x >= window.innerWidth - enemy.offsetWidth) {
            hFlag = false;
          }
        } else if (!hFlag) {
          x -= speed;
          enemy.style.left = `${x}px`;
          if (x <= 0) {
            hFlag = true;
          }
        }

        if (vFlag) {
          y += speed;
          enemy.style.top = `${y}px`;
          if (y >= window.innerHeight - enemy.offsetHeight) {
            vFlag = false;
          }
        } else if (!vFlag) {
          y -= speed;
          enemy.style.top = `${y}px`;
          if (y <= 0) {
            vFlag = true;
          }
        }

        if (
          playerPos.left <= enemyPos.right &&
          playerPos.right >= enemyPos.left &&
          playerPos.top <= enemyPos.bottom &&
          playerPos.bottom >= enemyPos.top
        ) {
          gameState = false;
          clearInterval(repeat);
          clearInterval(speedChange);
          location.reload();
          startTime = 0;
          return null;
        }
      } else if (!gameState) {
        alert("Game Over");
        return;
      }
    }
    let repeat = setInterval(movement, 25);
  });
}
