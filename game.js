import Ball from './ball.js';
import Map from './map.js';
import Hole from './hole.js';
import Start from './start.js';
import Exit from './exit.js';
import {loadLocalStorage, isItARecord, saveInLocalStorage, updateRecordInBestRuns} from './localStorage.js'
import {goToYouWinWindow, updateYouWinWindow} from './control.js';

// GENERAL
export const cvs = document.getElementById("canvas");
export const ctx = cvs.getContext("2d");
export {
    calculateTime,
    createLevel,
    currentLvl,
    unblockLevel,
    update,
    updateStop,
    win
};

//enable user's unblocked levels and display saved records
loadLocalStorage();

// LOAD LEVELS
let player, map, currentLvl, start, exit, timeStart, holes = [];

//create a background for all levels
map = new Map('wood');


function createLevel(lvlNum) {
    currentLvl = lvlNum;
    timeStart = Date.now(); //save starting time
    switch (lvlNum) {
        case 1:
            //create the start
            start = new Start(60, 60);
            //create the exit
            exit = new Exit(380, 580);
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
            start = new Start(40, 40, 20);
            //create the exit
            exit = new Exit(360, 40);
            //create holes
            holes = [];
            for (let i = 0; i < 8; i++) { //first column
                holes.push(new Hole(100, i * 60 + 30));
            }
            for (let i = 0; i < 8; i++) { //second column
                holes.push(new Hole(200, i * 60 + 150));
            }
            for (let i = 0; i < 8; i++) { //third column
                holes.push(new Hole(300, i * 60 + 30));
            }
            // create the player
            player = new Ball(start.posX, start.posY, 20, "white");
            break;

        case 3:
            start = new Start(40, 40);
            exit = new Exit(360, 40);
            holes = [];
            for (let i = 0; i < 8; i++) { //first column
                holes.push(new Hole(100, i * 60 + 30));
            }
            player = new Ball(start.posX, start.posY, 20, "white");
            break;
    }
}
function game() {
    player.move();
    exit.detectCollision(player);
    player.detectCollision();
    holes.forEach((hole) => {
        hole.isBallOver(player);
    });
    map.draw();
    start.draw();
    exit.draw();
    holes.forEach((el) => {
        el.draw()
    });
    player.draw();
}

// NEW FRAME CREATOR
let gameLoop;
let timeCounter = 0;
let lastTime = 0
function update(time = 0) {
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
function updateStop() {
    cancelAnimationFrame(gameLoop);
}

//timer
function calculateTime() {
    //calculate and convert from milliseconds to seconds
    return ((Date.now() - timeStart) / 1000).toFixed(2);
}

function unblockLevel(lvlNum) {
    // unblock the next level in level-selector-menu
    if (lvlNum <= 9) {
        document.querySelector(`.lvl-${lvlNum}`).classList.remove('blocked');
    }
}
function win() {
    updateStop();
    const time = calculateTime();
    unblockLevel(currentLvl+1);
    if (isItARecord(currentLvl, time)) {
        // save a new time to local storage
        saveInLocalStorage(currentLvl, time);
        // update the value in record-menu (html file)
        updateRecordInBestRuns(currentLvl);
    }
    updateYouWinWindow(currentLvl, time);
    goToYouWinWindow();
}