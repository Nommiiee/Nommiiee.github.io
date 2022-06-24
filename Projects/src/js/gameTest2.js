let player = document.getElementById("player");
let boundary = document.getElementById("body");

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
  alert("Game Over");
  location.reload();
  document.onmousemove = null;
};

function playerMove(e) {
  console.log(typeof e);
  let x = e.clientX - player.offsetWidth / 2;
  let y = e.clientY - player.offsetHeight / 2;
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
  let x = e.touches[0].clientX - player.offsetWidth / 2;
  let y = e.touches[0].clientY - player.offsetHeight / 2;
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
document.addEventListener("click", gameFunc, { once: true });
let speed = 2;

function gameFunc() {
  Array.from(enemy).forEach((enemy) => {
    let hFlag = true;
    let vFlag = true;
    function movement() {
      let playerPos = player.getBoundingClientRect();
      let enemyPos = enemy.getBoundingClientRect();
      let x = enemy.offsetLeft;
      let y = enemy.offsetTop;
      console.log(x, y);

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
    setInterval(function () {
      movement();
    }, 10);
  });
}
