const score = document.querySelector('.score')
const gameArea = document.querySelector('.gameArea');
const message = document.querySelector('.gameMessage');

//Object which tracks down the keypress
keys = {
    space: false
}
//Object which tracks the player gameplay dynamically
player = {
    inplay: false,
    score: 0,
    speed: 2
}

//keyBoard events
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

//click event to start the Game.
document.addEventListener('click', start);

function banner() {
    setTimeout(() => {
        message.classList.add("bigger");
    }, 500);
    message.classList.remove('bigger')
}
banner();
//function which gives the key pressed info
function pressOn(e) {
    e.preventDefault();
    let tempKeys = (e.key == " ") ? "space" : e.key;
    keys[tempKeys] = true;
    console.log(keys);
}

function pressOff(e) {
    e.preventDefault();
    let tempKeys = (e.key == " ") ? "space" : e.key;
    keys[tempKeys] = false;
    console.log(keys)
}

//Function which starts the game
function start() {
    if (!player.inplay) {
        message.classList.add("hide");
        //creating the enemy base
         makeEnemy();
        player.score = 2000;
        player.inplay = true;
        player.plane = document.createElement('div');
        player.plane.classList.add('plane');
        gameArea.appendChild(player.plane);
        window.requestAnimationFrame(playGame);
        player.x = player.plane.offsetLeft;
        console.log(player.x);
        player.y = player.plane.offsetTop;
        console.log(player.y);
    }
}

//Function which loops continously to create animation while playing the player functionlities
function playGame() {
    if (player.inplay) {
        if (keys.ArrowUp && player.y > 0) {
            player.y -= player.speed
        }
        if (keys.ArrowDown && player.y < 300) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (gameArea.offsetWidth - 100)) {
            player.x += player.speed;
        }

        player.x += (player.speed * 2);

        if (player.x > (gameArea.offsetWidth - 20)) {
            player.x = 0;
            player.score -= 100;
        }
        player.score = player.score - 1;
        if (player.score < 0) {
            player.score = 0;
        }
        player.plane.style.top = player.y + 'px';
        player.plane.style.left = player.x + 'px';
        score.innerHTML = "score = " + player.score;
        window.requestAnimationFrame(playGame);


    }
}

//Functin which creats enemy divs
function makeEnemy() {
    player.base = document.createElement("div");
    player.base.setAttribute("class", "base");
    player.base.style.width = Math.floor(Math.random() * 200) + 10 + "px";
    player.base.style.height = Math.floor(Math.random() * 100) + 100 + "px";
    player.base.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 200)) + 100 + "px";
  
    gameArea.appendChild(player.base);
}