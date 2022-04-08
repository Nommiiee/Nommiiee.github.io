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
    startTime = new Date().getTime();
    return startTime;
  },
  { once: true }
);

document.addEventListener(
  "click",
  function (e) {
    playerMove(e);
    document.onmousemove = playerMove;
  },
  { passive: false }
);

document.onmousedown = function (e) {
  e.preventDefault();
  playerMove(e);
  document.onmousemove = playerMove;
};

document.onmouseup = function () {
  document.onmousemove = null;
  // alert("Game Over");
  // location.reload();
};

function playerMove(e) {
  let x = e.clientX - player.offsetWidth / 2;
  let y = e.clientY - player.offsetHeight / 2;
  console.log(x, y);

  let zero = 0;
  player.style.transform = `translate(${x}px, ${y}px)`;

  // horizontal boundary
  if (x >= window.innerWidth - player.clientWidth) {
    player.style.transform = `translate(${
      window.innerWidth - player.clientWidth
    }px, ${y}px)`;
  } else if (x <= 0) {
    player.style.transform = `translate(${zero}px, ${y}px)`;
  }

  // VERITCAL BOUNDARY
  if (y >= window.innerHeight - player.clientHeight) {
    player.style.transform = `translate(${x}px, ${
      window.innerHeight - player.clientHeight
    }px`;
  } else if (y <= 0) {
    player.style.transform = `translate(${x}px, ${zero}px)`;
  }
}

// ------------------------------
// touch

// document.addEventListener("ontouchstart", function (e) {
//   e.preventDefault();
//   touchPlayerMove(e);
//   document.addEventListener("ontouchmove", touchPlayerMove);
// });

document.ontouchstart = function (e) {
  e.preventDefault();
  touchPlayerMove(e);
  document.ontouchmove = touchPlayerMove;
};

document.ontouchend = function (e) {
  // alert("Game Over");
  // location.reload();
  document.ontouchmove = null;
};

// ------------------------------

function touchPlayerMove(e) {
  let x = 0;
  let y = 0;
  if (e.touches) {
    x = e.touches[0].pageX - player.offsetWidth / 2;
    y = e.touches[0].pageY - player.offsetHeight / 2;
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
  } else if (x <= 10) {
    player.style.transform = `translate(${zero}px, ${y}px)`;
  }

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
document.addEventListener(
  "click",
  () => {
    gameStart(), (gameState = true);
  },
  { once: true }
);
let speed = 1;

function gameStart() {
  Array.from(enemy).forEach((enemy) => {
    let hFlag = true;
    let vFlag = true;
    function movement() {
      let enemyPos = enemy.getBoundingClientRect();
      let playerPos = player.getBoundingClientRect();
      let x = enemy.offsetLeft;
      let y = enemy.offsetTop;

      if (hFlag) {
        x += speed;
        enemy.style.left = `${x}px`;
        if (x >= window.innerWidth - enemy.offsetWidth) {
          speed += 0.4;
          hFlag = false;
        }
      } else if (!hFlag) {
        x -= speed;
        enemy.style.left = `${x}px`;
        if (x <= 0) {
          speed += 0.4;

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
        let playedTime =
          endTime().toString().slice(0, -3) +
          `.` +
          endTime().toString().slice(-3) +
          ` seconds, The page will now reload for the next game`;
        alert(playedTime);
        location.reload();
        gameState = false;
      }
    }
    // setInterval(movement, 25);
  });
}

/*
document.addEventListener("click", gameFunc, { once: true });

// game running function.
function gameFunc() {
  // creating array from enemies and running a method forEach element.
  Array.from(enemy).forEach((element) => {
    let x = element.offsetLeft;
    let y = element.offsetTop;
    let vFlag = true;
    let hFlag = true;
    function movement() {
      let gameMove = setInterval(movement, 25);
      let speed = 2;
      if (gameState) {
        // grabbing the information about the enemy and player for collisoin detection
        let playerPos = player.getBoundingClientRect();
        let enemyPos = element.getBoundingClientRect();
        // if the horizontal flag is true will move the enemy horizontally
        if (hFlag) {
          x += speed;
          element.style.left = x + "px";
          if (x >= window.innerWidth - element.clientWidth) {
            hFlag = false;
          }
        } else if (!hFlag) {
          x -= speed;
          element.style.left = x + "px";
          if (x <= 0) {
            hFlag = true;
          }
        }

        // if the vertical flag is true will move the enemy vertically
        if (vFlag) {
          y += speed;
          element.style.top = y + "px";
          if (y >= window.innerHeight - element.clientHeight) {
            vFlag = false;
          }
        } else if (!vFlag) {
          y -= speed;
          element.style.top = y + "px";
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
          let playedTime =
            endTime().toString().slice(0, -3) +
            `.` +
            endTime().toString().slice(-3) +
            ` seconds, The page will now reload for the next game`;
          alert(playedTime);
          location.reload();
          gameState = false;
          clearInterval(gameMove);
        }
      }
    }
    let changeSpeed = setInterval((change) => {
      speed++;
    }, 3000);
  });
}
*/
