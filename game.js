import Ball from './ball.js';
import Map from './map.js';
import Hole from './hole.js';
import StartAndFinish from './start&Finish.js';

// GENERAL
export const cvs = document.getElementById("canvas");
export const ctx = cvs.getContext("2d");
export {gameOver};
export {createLevel1, createLevel2, update};


// LOAD LEVELS
let player, map, start, finish, holes = [];
//create a background for all levels
map = new Map('wood');
const createLevel1 = ()=> {
    //create the start
    start = new StartAndFinish(60,60 ,20, "start");
    //create the exit
    finish = new StartAndFinish(340 ,540 ,20, "exit");
    //create holes
    holes = []; //clear holes from previous levels
    for (let i = 0; i< 5; i++){ //first row
        holes.push(new Hole(i*60+35, 180));
    }
    for (let i = 0; i< 5; i++){ //second row
        holes.push(new Hole(i*60+125, 410));
    }
    // create the player
    player = new Ball(start.posX, start.posY, 20, "white");
}
const createLevel2 = ()=> {
    //create the start
    start = new StartAndFinish(40, 40, 20, "start");
    //create the exit
    finish = new StartAndFinish(360, 40, 20, "exit");
    //create holes
    holes = []; //clear holes from previous levels
    for (let i = 0; i< 8; i++){ //first column
        holes.push(new Hole(100, i*60+30));
    }
    for (let i = 0; i< 8; i++){ //second column
        holes.push(new Hole(200, i*60+150));
    }
    for (let i = 0; i< 8; i++){ //third column
        holes.push(new Hole(300, i*60+30));
    }
    // create the player
    player = new Ball(start.posX, start.posY, 20, "white");
}

function game() {
    player.move();
    finish.detectCollision(player);
    player.detectCollision();
    holes.forEach((hole) => {
        hole.isBallOver(player);
    });
    map.draw();
    start.draw();
    finish.draw();
    holes.forEach((el)=> {el.draw()});
    player.draw();
}
function gameOver() {
    // player.posX = start.PosX;
    // player.posY = start.PosY;
    player.posX = 60;
    player.posY = 60;
    player.velocityX = 0;
    player.velocityY = 0;
}

// NEW FRAME CREATOR
let timeCounter = 0;
let lastTime = 0
let update = (time = 0)=> {
    const deltaTime = time - lastTime;
    lastTime = time;

    timeCounter += deltaTime;
    // check if enough time passed to display new frame
    if (timeCounter > 33) {
        game();
        timeCounter = 0;
    }
    requestAnimationFrame(update);
}