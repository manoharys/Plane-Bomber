const score = document.querySelector('.score')
const gameArea = document.querySelector('.gameArea');
const message = document.querySelector('.gameMessage');

//Object which tracks down the keypress
keys = {
    space : false
}

//keyBoard events
document.addEventListener('keydown',pressOn);
document.addEventListener('keyup',pressOff);

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
