const score = document.querySelector('.score')
const gameArea = document.querySelector('.gameArea');
const message = document.querySelector('.gameMessage');

//Object which tracks down the keypress
keys = {
    space : false
}
//Object which tracks the player gameplay dynamically
player = {
    inplay : false, 
    score : 0,
    speed :2
}

//keyBoard events
document.addEventListener('keydown',pressOn);
document.addEventListener('keyup',pressOff);

//click event to start the Game.
document.addEventListener('click',start);

//function which gives the key pressed info
function pressOn(e){
    e.preventDefault();
    let tempKeys = (e.key == " ")?"space":e.key;
    keys[tempKeys] = true;
    console.log(keys);
}
function pressOff(e){
    e.preventDefault();
    let tempKeys = (e.key == " ")?"space":e.key;
    keys[tempKeys] = false;
    console.log(keys)
}

//Function which starts the game
function start(){
   inplay = true;
   player.plane = document.createElement('div');
   player.plane.classList.add('plane');
   gameArea.appendChild(player.plane);
}