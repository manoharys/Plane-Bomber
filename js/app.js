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
    speed: 12
}

//keyBoard events
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

//click event to start the Game.
document.addEventListener('click', start);
setInterval(() =>{
    banner()
},1000);
  
function banner(){
    setTimeout(() =>{
        message.classList.add("bigger");
    },1000);
    message.classList.remove('bigger');
    banner();
}
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
        if (keys.ArrowUp && player.y>0) {
            player.y -= player.speed
        }
        if (keys.ArrowDown && player.y<300) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (gameArea.offsetWidth - 100)) {
            player.x += player.speed;
        }
        player.plane.style.top = player.y + 'px';
        player.plane.style.left = player.x + 'px';
        
        window.requestAnimationFrame(playGame);
       
    }
}