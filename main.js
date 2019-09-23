const score = document.querySelector('.score'),
      start = document.querySelector('.start'),
      gameArea = document.querySelector('.gameArea'),
      car = document.createElement('div');

      car.classList.add('car')

const keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight :false
}

const settings = {
    start : false,
    score : 0,
    speed : 3
}

start.addEventListener('click',startGame);

document.addEventListener('keydown',startRun);
document.addEventListener('keyup',stopRun);




function startGame(){
    start.classList.add('hide')
    settings.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
};

function startRun(event){
    keys[event.key] = true;
};

function stopRun(event){
    keys[event.key] = false;
};

function playGame(){
    console.log('We\'re playing the game!');
    if(settings.start){
        requestAnimationFrame(playGame);
    }
   
}

console.dir(start);