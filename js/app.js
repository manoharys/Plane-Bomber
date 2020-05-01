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
    message.classList.add('hide');
    if (!player.inplay) {
        gameArea.innerHTML = "";
        player.level = 10;
        //Enemy base
        makeEnemy();
        player.inplay = true;
        player.score = 2000;
        player.totalBombs = 6;
        player.ready = true;
        player.activeBomb = 0;
        player.bombScore = 0;
        player.plane = document.createElement("div");
        player.plane.setAttribute("class", "plane");
        gameArea.appendChild(player.plane);
        window.requestAnimationFrame(playGame);
        player.x = player.plane.offsetLeft;
        player.y = player.plane.offsetTop;
    }
}

//Function which loops continously to create animation while playing the player functionlities
function playGame() {

    if (player.inplay) {
        moveBomb();
        if (keys.space) {
            makeBomb();
        }
        if (keys.ArrowUp && player.y > 80) {
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
    player.level--;
    if (player.level < 0) {
        endGame();
    } else {
        player.base = document.createElement("div");
        player.base.setAttribute("class", "base");
        player.base.style.width = Math.floor(Math.random() * 200) + 10 + "px";
        player.base.style.height = Math.floor(Math.random() * 100) + 100 + "px";
        player.base.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 200)) + 100 + "px";
        gameArea.appendChild(player.base);
    }


}

//Function which makes bombs
function makeBomb() {

    if (player.ready && (player.activeBomb < player.totalBombs)) {
        player.score -= 300;
        player.bombScore++;
        player.activeBomb++;
        let bomb = document.createElement("div");
        bomb.classList.add("bomb");
        bomb.innerHTML = player.bombScore;
        bomb.innerHTML = "😈";
        bomb.y = player.y;
        bomb.x = player.x;
        bomb.style.left = bomb.x + "px";
        bomb.style.top = bomb.y + "px";
        gameArea.appendChild(bomb);
        player.ready = false;
        setTimeout(function () {
            player.ready = true;
        }, 500);
    }
}

//Function which move bombs automitically
function moveBomb() {
    let bombs = document.querySelectorAll(".bomb");
    bombs.forEach(function (item) {
        item.y += 5;
        item.style.top = item.y + "px";
        if (item.y > 1000) {
            player.activeBomb--;
            item.parentElement.removeChild(item);
        }
        if (isCollide(item, player.base)) {
            player.score += 2000;
            player.activeBomb--;
            player.base.parentElement.removeChild(player.base);
            item.parentElement.removeChild(item);
            makeEnemy();
        }
    })
}

function endGame() {
    player.inplay = false;
    gameMessage.classList.remove("hide");
}

//Checks coliistion......
function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}