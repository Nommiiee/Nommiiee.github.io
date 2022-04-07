let player = document.getElementById("player");

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
  let x = e.clientX;
  let y = e.clientY;
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

let enemy = document.getElementsByClassName(`enemy`);
Array.from(enemy).forEach((element) => {
  let x = Math.trunc(Math.random() * innerWidth - element.clientWidth);
  let y = Math.trunc(Math.random() * innerHeight - element.clientHeight);

  element.style.left = x + "px";
  element.style.top = y + "px";
  let vFlag = true;
  let hFlag = true;

  player.style.position = "absolute";
  player.style.left = "0px";
  player.style.top = "0px";

  function movement() {
    let enemyPos = element.getBoundingClientRect();
    let playerPos = player.getBoundingClientRect();

    if (vFlag) {
      x += 1;
      element.style.left = x + "px";
      if (x >= window.innerWidth - element.clientWidth) {
        vFlag = false;
      }
    } else if (!vFlag) {
      x -= 1;
      element.style.left = x + "px";
      if (x <= 0) {
        vFlag = true;
      }
    }

    if (hFlag) {
      y += 1;
      element.style.top = y + "px";
      if (y >= window.innerHeight - element.clientHeight) {
        hFlag = false;
      }
    } else if (!hFlag) {
      y -= 1;
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
    }
  }

  setInterval(movement, 1);
});
