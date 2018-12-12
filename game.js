import Ball from './ball.js';
import Map from './map.js';
import Hole from './hole.js';
import StartAndFinish from './start&Finish.js';
import {displayRecords} from './records.js'

// GENERAL
export const cvs = document.getElementById("canvas");
export const ctx = cvs.getContext("2d");
export {
    createLevel,
    currentLvl,
    timer,
    update,
    updateStop
};

//display user's records from local storage
displayRecords();

// LOAD LEVELS
let player, map, currentLvl, start, finish, holes = [];
let timer = {start:0, end:0};
//create a background for all levels
map = new Map('wood');

function createLevel(lvlNum) {
    currentLvl = lvlNum;
    timer.start = Date.now(); //set timer
    switch (lvlNum) {
        case 1:
            //create the start
            start = new StartAndFinish(60, 60, 20, "start");
            //create the exit
            // finish = new StartAndFinish(340, 540, 20, "exit");
            finish = new StartAndFinish(380, 580, 20, "exit");
            //create holes
            holes = []; //clear holes from previous levels
            // for (let i = 0; i < 5; i++) { //first row
            //     holes.push(new Hole(i * 60 + 35, 180));
            // }
            // for (let i = 0; i < 5; i++) { //second row
            //     holes.push(new Hole(i * 60 + 125, 410));
            // }
            // create the player
            player = new Ball(start.posX, start.posY, 20, "white");
            break;

        case 2:
            //create the start
            start = new StartAndFinish(40, 40, 20, "start");
            //create the exit
            finish = new StartAndFinish(360, 40, 20, "exit");
            //create holes
            holes = []; //clear holes from previous levels
            // for (let i = 0; i < 8; i++) { //first column
            //     holes.push(new Hole(100, i * 60 + 30));
            // }
            // for (let i = 0; i < 8; i++) { //second column
            //     holes.push(new Hole(200, i * 60 + 150));
            // }
            for (let i = 0; i < 8; i++) { //third column
                holes.push(new Hole(300, i * 60 + 30));
            }
            // create the player
            player = new Ball(start.posX, start.posY, 20, "white");
            break;

        case 3:
            //create the start
            start = new StartAndFinish(40, 40, 20, "start");
            //create the exit
            finish = new StartAndFinish(360, 40, 20, "exit");
            //create holes
            holes = []; //clear holes from previous levels
            for (let i = 0; i < 8; i++) { //first column
                holes.push(new Hole(100, i * 60 + 30));
            }
            // create the player
            player = new Ball(start.posX, start.posY, 20, "white");
            break;
    }
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
    holes.forEach((el) => {
        el.draw()
    });
    player.draw();
}

// NEW FRAME CREATOR
let gameLoop; //testing
let timeCounter = 0;
let lastTime = 0
let update = (time = 0) => {
    const deltaTime = time - lastTime;
    lastTime = time;

    timeCounter += deltaTime;
    // check if enough time passed to display new frame
    if (timeCounter > 33) {
        game();
        timeCounter = 0;
    }
    gameLoop = requestAnimationFrame(update);
}
//pause game
let updateStop = ()=> {
    cancelAnimationFrame(gameLoop);
}

// function unblockLevel() {

// }