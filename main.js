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
    speed : 3,
    traffic : 3,
}

start.addEventListener('click',startGame);

document.addEventListener('keydown',startRun);
document.addEventListener('keyup',stopRun);


function getQuantityOfElements(elementHeight){
    return Math.floor(document.documentElement.clientHeight / elementHeight) + 1;
}

function startGame(){

    for(let i = 0; i < getQuantityOfElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for(let i = 0; i < getQuantityOfElements(100 * settings.traffic); i++){
        const enemy = document.createElement('div');
        
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);

        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.abs(
            Math.floor(
            Math.random() * gameArea.offsetWidth - 50
            )) + 'px'; 


        enemy.style.background = 'transparent url(./image/enemy.png) center / cover no-repeat';

        gameArea.appendChild(enemy);
    }

    start.classList.add('hide')
    settings.start = true;
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

function startRun(event){
    keys[event.key] = true;
};

function stopRun(event){
    keys[event.key] = false;
};

function playGame(){
    
    if(settings.start){
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && settings.x > 0){
            settings.x -= settings.speed;
        }
        if(keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)){
            settings.x += settings.speed;
        }
        if(keys.ArrowUp && settings.y > 0){
            settings.y -= settings.speed;
        }
        if(keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)){
            settings.y += settings.speed;
        }

        car.style.top = settings.y + 'px';
        car.style.left = settings.x + 'px';
        requestAnimationFrame(playGame);
    }
   
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(curLine){
        curLine.y += settings.speed
        curLine.style.top = curLine.y + 'px';

        if(curLine.y >= document.documentElement.clientHeight){
            curLine.y = -100;
        }
    });
}

function moveEnemy(){
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(enemyCar){
        enemyCar.y += settings.speed / 2;
        enemyCar.style.top = enemyCar.y + 'px';
        if(enemyCar.y > document.documentElement.clientHeight){
            enemyCar.y = -100 * settings.traffic;
            enemyCar.style.left = Math.abs(
                Math.floor(
                Math.random() * gameArea.offsetWidth - 50 + 'px'
                ));
        } 
    });

}


console.dir(start);