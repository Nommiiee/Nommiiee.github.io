let player = document.getElementById("player");
let boundary = document.getElementById("boundary");

// alert(`The game time will start on the first click or touch.`);

let startTime = 0;

let endTime = function () {
  return new Date().getTime() - startTime;
};
document.addEventListener(
  "click",
  function () {
    startTime = new Date().getTime();
    return startTime;
  },
  { once: true }
);

document.onmousedown = function (e) {
  playerMove(e);
  document.onmousemove = playerMove;
};

document.onmouseup = function () {
  // alert("Game Over");
  // location.reload();
  document.onmousemove = null;
};

function playerMove(e) {
  let x = e.clientX - player.offsetWidth / 2;
  let y = e.clientY - player.offsetHeight / 2;
  player.style.left = x + "px";
  player.style.top = y + "px";
  if (x >= window.innerWidth - player.offsetWidth) {
    player.style.left = window.innerWidth - player.offsetWidth + "px";
  }
  if (y >= window.innerHeight - player.offsetHeight) {
    player.style.top = window.innerHeight - player.offsetHeight + "px";
  }
}

// touch

document.ontouchstart = function (e) {
  touchPlayerMove(e);
  document.ontouchmove = touchPlayerMove;
};

document.ontouchend = function (e) {
  // alert("Game Over");
  // location.reload();
  document.ontouchmove = null;
};

function touchPlayerMove(e) {
  let x = e.targetTouches[0].clientX - player.offsetWidth / 2;
  let y = e.targetTouches[0].clientY - player.offsetHeight / 2;

  player.style.left = x + "px";
  player.style.top = y + "px";
  if (x >= window.innerWidth - player.offsetWidth) {
    player.style.left = window.innerWidth - player.offsetWidth + "px";
  }
  if (x <= 0) {
    player.style.left = 0 + "px";
  }
  if (y >= window.innerHeight - player.offsetHeight) {
    player.style.top = window.innerHeight - player.offsetHeight + "px";
  }
  if (y <= 0) {
    player.style.top = 0 + "px";
  }
}

// Enemy Element And Movement
let enemy = document.getElementsByClassName(`enemy`);

let gameState = true;
document.addEventListener("click", gameFunc, { once: true });
function gameFunc() {
  Array.from(enemy).forEach((element) => {
    let x = element.offsetLeft;
    let y = element.offsetTop;
    let vFlag = true;
    let hFlag = true;

    // player.style.left = 0 + "px";
    // player.style.top = 0 + "px";

    let gameMove = setInterval(movement, 10);

    let speed = 2;
    function movement() {
      if (gameState) {
        let playerPos = player.getBoundingClientRect();
        let enemyPos = element.getBoundingClientRect();
        if (vFlag) {
          x += speed;
          element.style.left = x + "px";
          if (x >= window.innerWidth - element.clientWidth) {
            vFlag = false;
          }
        } else if (!vFlag) {
          x -= speed;
          element.style.left = x + "px";
          if (x <= 0) {
            vFlag = true;
          }
        }

        if (hFlag) {
          y += speed;
          element.style.top = y + "px";
          if (y >= window.innerHeight - element.clientHeight) {
            hFlag = false;
          }
        } else if (!hFlag) {
          y -= speed;
          element.style.top = y + "px";
          if (y <= 0) {
            hFlag = true;
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
// tested different methods below this point, remove from the final version
// let enemies = document.getElementsByClassName(`enemy`);
// let enemiesArr = Array.from(enemies);

// let vFlags = [];
// let hFlags = [];
// let x = [];
// let y = [];

// for (let i = 0; i < enemiesArr.length; i++) {
//   let x0 = window.getComputedStyle(enemiesArr[i]).left.split("px")[0];
//   let y0 = window.getComputedStyle(enemiesArr[i]).top.split("px")[0];
//   let hFlag0 = true;
//   let vFlag0 = true;

//   vFlags.push(vFlag0);
//   hFlags.push(hFlag0);
//   x.push(Number(x0));
//   y.push(Number(y0));
// }

// console.log(hFlags);
// let speed = 1;
// function enemyMovement1() {
//   for (let i = 0; i < enemiesArr.length; i++) {
//     enemiesArr[i].style.left = x[i] + "px";
//     enemiesArr[i].style.top = y[i] + "px";

//     // horizontal movement
//     if (hFlags[i]) {
//       x[i] -= speed;
//       if (x[i] <= 0) {
//         hFlags[i] = false;
//       }
//     }

//     if (!hFlags[i]) {
//       x[i] += speed;
//       if (x[i] >= window.innerWidth - enemiesArr[i].clientWidth) {
//         hFlags[i] = true;
//       }
//     }

//     if (vFlags[i]) {
//       y[i] -= speed;
//       if (y[i] <= 0) {
//         vFlags[i] = false;
//       }
//     }

//     if (!vFlags[i]) {
//       y[i] += speed;
//       if (y[i] >= window.innerHeight - enemiesArr[i].clientHeight) {
//         vFlags[i] = true;
//       }
//     }
//   }
// }
// let speed = 1;
// let x0 = window.getComputedStyle(enemiesArr[0]).left.split("px")[0];
// let y0 = window.getComputedStyle(enemiesArr[0]).top.split("px")[0];
// let hFlag0 = true;
// let vFlag0 = true;
// function movement0() {
//   enemiesArr[0].style.left = x0 + "px";
//   enemiesArr[0].style.top = y0 + "px";

//   // horizontal movement
//   if (hFlag0) {
//     x0 -= speed;
//     if (x0 <= 0) {
//       hFlag0 = false;
//     }
//   }

//   if (!hFlag0) {
//     x0 += speed;
//     if (x0 >= window.innerWidth - enemiesArr[0].clientWidth) {
//       hFlag0 = true;
//     }
//   }

//   if (vFlag0) {
//     y0 -= speed;
//     if (y0 <= 0) {
//       vFlag0 = false;
//     }
//   }

//   if (!vFlag0) {
//     y0 += speed;
//     if (y0 >= window.innerHeight - enemiesArr[0].clientHeight) {
//       vFlag0 = true;
//     }
//   }
// }

// //movement for enemiesArr[1]
// let x1 = window.getComputedStyle(enemiesArr[1]).left.split("px")[0];
// let y1 = window.getComputedStyle(enemiesArr[1]).top.split("px")[0];
// let hFlag1 = true;
// let vFlag1 = true;
// function movement1() {
//   enemiesArr[1].style.left = x1 + "px";
//   enemiesArr[1].style.top = y1 + "px";

//   // horizontal movement
//   if (hFlag1) {
//     x1++;
//     enemiesArr[1].style.left = x1 + "px";
//     if (x1 >= window.innerWidth - enemiesArr[1].clientWidth) {
//       hFlag1 = false;
//     }
//   } else if (!hFlag1) {
//     x1--;
//     enemiesArr[1].style.left = x1 + "px";
//     if (x1 <= 0) {
//       hFlag1 = true;
//     }
//   }

//   if (vFlag1) {
//     y1++;
//     enemiesArr[1].style.left = x1 + "px";
//     if (y1 >= window.innerHeight - enemiesArr[1].clientHeight) {
//       vFlag1 = false;
//     }
//   } else if (!vFlag1) {
//     y1--;
//     enemiesArr[1].style.left = x1 + "px";
//     if (y1 <= 0) {
//       vFlag1 = true;
//     }
//   }
// }

// setInterval(movement0, 1);
// setInterval(movement1, 1);
