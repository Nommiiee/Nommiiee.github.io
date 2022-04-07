let player = document.getElementById("player");
let boundary = document.getElementById("boundary");

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
  let x = e.changedTouches[0].clientX - player.offsetWidth / 2;
  let y = e.changedTouches[0].clientY - player.offsetHeight / 2;

  player.style.left = x + "px";
  player.style.top = y + "px";
  if (x >= window.innerWidth - player.offsetWidth) {
    player.style.left = window.innerWidth - player.offsetWidth + "px";
  }
  if (y >= window.innerHeight - player.offsetHeight) {
    player.style.top = window.innerHeight - player.offsetHeight + "px";
  }
}

// Enemy Element And Movement
let enemy = document.getElementsByClassName(`enemy`);

Array.from(enemy).forEach((element) => {
  let gameState = true;
  let x = Math.trunc(Math.random() * innerWidth - element.clientWidth);
  let y = Math.trunc(Math.random() * innerHeight - element.clientHeight);

  let vFlag = true;
  let hFlag = true;

  player.style.left = "0px";
  player.style.top = "0px";

  let gameMove = setInterval(movement, 1);

  let speed = 1;

  function movement() {
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
      alert("Game Over");
      location.reload();
      gameState = false;
      clearInterval(gameMove);
    }
  }

  let changeSpeed = setInterval((change) => {
    speed += 1;
  }, 5000);
});
