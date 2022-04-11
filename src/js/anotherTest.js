let player = document.getElementById("player");
let body = document.getElementById("body");

let startTime = 0;

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

document.onmouseup = function () {
  document.removeEventListener("mousemove", touchPlayerMove);
};

// ------------------------------

function touchPlayerMove(e) {
  e.preventDefault();
  let x = 0;
  let y = 0;
  // check whether it's a touch or a mouse
  if (e.touches) {
    x = e.touches[0].clientX - player.offsetWidth / 2;
    y = e.touches[0].clientY - player.offsetHeight / 2;
  } else if (!e.touches) {
    x = e.clientX - player.offsetWidth / 2;
    y = e.clientY - player.offsetHeight / 2;
  }
  let zero = 0;

  // setting the player position
  player.style.transform = `translate(${zero}px, ${zero}px)`;

  let playWidth = getComputedStyle(body)
    .getPropertyValue("width")
    .split("p")[0];
  let playHeight = getComputedStyle(body)
    .getPropertyValue("height")
    .split("p")[0];

  let playableAreaX = playWidth - player.offsetWidth;
  let playableAreaY = playHeight - player.offsetHeight;

  player.style.left = `${x}px`;
  player.style.top = `${y}px`;

  if (x >= playableAreaX) {
    player.style.left = `${playableAreaX}px`;
    changeGameState();
  } else if (x <= zero) {
    player.style.left = `${zero}px`;
    changeGameState();
  }

  if (y >= playableAreaY) {
    player.style.top = `${playableAreaY}px`;
    changeGameState();
  } else if (y <= zero) {
    player.style.top = `${zero}px`;
    changeGameState();
  }
}

// Enemy Element And Movement
let enemy = document.getElementsByClassName(`enemy`);
let gameState = true;

function changeGameState() {
  gameState = false;
  // location.reload();
  let playedTime =
    endTime().toString().slice(0, -3) + "." + endTime().toString().slice(-3);
  alert(`You played for ${playedTime} seconds.`);
}

let speed = 2;

function gameStart() {
  let speedChange = setInterval(function () {
    speed++;
  }, 3000);
  speedChange;

  let hFlag = [true, true, true, true];
  let vFlag = [true, true, true, true];
  let enemies = Array.from(enemy);
  let x = [
    enemies[0].offsetLeft,
    enemies[1].offsetLeft,
    enemies[2].offsetLeft,
    enemies[3].offsetLeft,
  ];
  let y = [
    enemies[0].offsetTop,
    enemies[1].offsetTop,
    enemies[2].offsetTop,
    enemies[3].offsetTop,
  ];

  console.log(x, y);

  if (gameState) {
    function loopOverEnemies() {
      for (let i = 0; i < enemies.length; i++) {
        enemyMovement(i);
      }
    }

    function enemyMovement(i) {
      let enemyPos = enemies[i].getBoundingClientRect();
      let playerPos = player.getBoundingClientRect();

      if (
        playerPos.left <= enemyPos.right &&
        playerPos.right >= enemyPos.left &&
        playerPos.top <= enemyPos.bottom &&
        playerPos.bottom >= enemyPos.top
      ) {
        changeGameState();
        clearInterval(speedChange);
        clearInterval(movementRepeat);
      }
      // horizontal Movement
      if (i === 0 || i === 2) {
        if (hFlag[i]) {
          x[i] += speed;
          enemies[i].style.left = `${x[i]}px`;
          if (x[i] >= body.offsetWidth - enemy[i].offsetWidth) {
            hFlag[i] = false;
          }
        }

        if (!hFlag[i]) {
          x[i] -= speed;
          enemies[i].style.left = `${x[i]}px`;
          if (x[i] <= -32) {
            // 32 is the width of the border
            hFlag[i] = true;
          }
        }
      }
      if (i === 1 || i === 3) {
        if (hFlag[i]) {
          x[i] -= speed;
          enemies[i].style.left = `${x[i]}px`;
          if (x[i] <= -32) {
            console.log("x");
            hFlag[i] = false;
          }
        }
        if (!hFlag[i]) {
          x[i] += speed;
          enemies[i].style.left = `${x[i]}px`;
          if (x[i] >= body.offsetWidth - enemies[i].offsetWidth) {
            hFlag[i] = true;
          }
        }
      }

      // vertical movement
      if (i === 0 || i === 1) {
        if (vFlag[i]) {
          y[i] += speed;
          enemies[i].style.top = `${y[i]}px`;
          if (y[i] >= body.offsetHeight - enemies[i].offsetHeight) {
            vFlag[i] = false;
          }
        }
        if (!vFlag[i]) {
          y[i] -= speed;
          enemies[i].style.top = `${y[i]}px`;
          if (y[i] <= -32) {
            vFlag[i] = true;
          }
        }
      }

      if (i === 2 || i === 3) {
        if (vFlag[i]) {
          y[i] -= speed;
          enemies[i].style.top = `${y[i]}px`;
          if (y[i] <= -32) {
            vFlag[i] = false;
          }
        }
        if (!vFlag[i]) {
          y[i] += speed;
          enemies[i].style.top = `${y[i]}px`;
          if (y[i] >= body.offsetHeight - enemies[i].offsetHeight) {
            vFlag[i] = true;
          }
        }
      }
    }
    let movementRepeat = setInterval(loopOverEnemies, 10);
    movementRepeat;
  }

  // Array.from(enemy).forEach((enemy, idx, Array) => {
  //   let hFlag = true;
  //   let vFlag = true;

  //   // set the interval for enemy movement
  //   let repeat = setInterval(movement, 20);
  //   if (gameState) {
  //     repeat;
  //   } else {
  //     clearInterval(repeat);
  //   }

  //   // moving the enemy
  //   function movement() {
  //     let enemyMovementWidth = window.innerWidth - enemy.offsetWidth;
  //     let enemyMovementHeight = window.innerHeight - enemy.offsetHeight;
  //     let enemyPos = enemy.getBoundingClientRect();
  //     let playerPos = player.getBoundingClientRect();
  //     let x = enemy.offsetLeft;
  //     let y = enemy.offsetTop;
  //     // if the gamestate is true, the enemy will move
  //     if (gameState) {
  //       // horizontal movement
  //       if (hFlag) {
  //         x += speed;
  //         enemy.style.left = `${x}px`;
  //         if (x >= enemyMovementWidth) {
  //           hFlag = false;
  //         }
  //       } else if (!hFlag) {
  //         x -= speed;
  //         enemy.style.left = `${x}px`;
  //         if (x <= -32) {
  //           // we are using 32 because the border is 32px wide
  //           hFlag = true;
  //         }
  //       }

  //       // vertical movement
  //       if (vFlag) {
  //         y += speed;
  //         enemy.style.top = `${y}px`;
  //         if (y >= enemyMovementHeight) {
  //           vFlag = false;
  //         }
  //       } else if (!vFlag) {
  //         y -= speed;
  //         enemy.style.top = `${y}px`;
  //         if (y <= -32) {
  //           vFlag = true;
  //         }
  //       }

  //       // check for collision
  //       if (
  //         playerPos.left <= enemyPos.right &&
  //         playerPos.right >= enemyPos.left &&
  //         playerPos.top <= enemyPos.bottom &&
  //         playerPos.bottom >= enemyPos.top
  //       ) {
  //         changeGameState();
  //         clearInterval(repeat);
  //         clearInterval(speedChange);
  //       }
  //     }
  //   }
  // });
}
