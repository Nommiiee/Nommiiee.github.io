let player = document.getElementById("player");
let boundary = document.getElementById("body");

// alert(`The game time will start on the first click or touch.`);

let startTime = 0;
alert("The Will Start Once You Click or Touch");
// function to calculate the time

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

function endTime() {
  let endTime = new Date().getTime();
  let time = endTime - startTime;
  console.log(time);
  return time;
}

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
  // check whether it's a touch or a mouse
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

  let playWidth = window.innerWidth - player.offsetWidth;
  let playHeight = window.innerHeight - player.offsetHeight;

  // horizontal boundary
  if (x >= playWidth) {
    player.style.transform = `translate(${playWidth}px, ${y}px)`;
  } else if (x <= 0) {
    player.style.transform = `translate(${zero}px, ${y}px)`;
  }
  // vertical boundary

  if (y >= playHeight) {
    player.style.transform = `translate(${x}px, ${playHeight}px`;
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
    // set the interval for enemy movement
    let repeat = setInterval(movement, 25);
    if (gameState) {
      repeat;
    } else {
      clearInterval(repeat);
    }

    // moving the enemy
    function movement() {
      let enemyPos = enemy.getBoundingClientRect();
      let playerPos = player.getBoundingClientRect();
      let x = enemy.offsetLeft;
      let y = enemy.offsetTop;
      // if the gamestate is true, the enemy will move
      if (gameState) {
        // horizontal movement
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

        // vertical movement
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

        // check for collision
        if (
          playerPos.left <= enemyPos.right &&
          playerPos.right >= enemyPos.left &&
          playerPos.top <= enemyPos.bottom &&
          playerPos.bottom >= enemyPos.top
        ) {
          let playedTime =
            endTime().toString().slice(0, -3) +
            "." +
            endTime().toString().slice(-3);

          alert(`You lost! Your time was ${playedTime} seconds.`);
          gameState = false;
          clearInterval(repeat);
          clearInterval(speedChange);
          location.reload();
        }
      }
    }
  });
}
