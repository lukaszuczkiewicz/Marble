import Ball from './ball.js';
import Map from './map.js';
import Hole from './hole.js';
import Start from './start.js';
import Exit from './exit.js';
import { Gem, gemColors } from './gem.js';
import {
    loadLocalStorage,
    isItARecord,
    saveInLocalStorage,
    updateRecordInBestRuns
} from './localStorage.js'
import {
    goToYouWinWindow,
    updateYouWinWindow
} from './control.js';

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

// canvas
const cvsWidth = cvs.width;
const cvsHeight = cvs.height;

//enable user's unblocked levels and display saved records
loadLocalStorage();

// LOAD LEVELS
let player, map, currentLvl, start, exit, timeStart;
let holes = [], gems=[], collectedGems;

//create a background for all levels
map = new Map('wood');

function game() {
    player.move();
    if (collectedGems === gems.length) {
        exit.detectCollision(player);
    }
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
    gems.forEach((el) => {
        el.draw()
    });
    player.draw();
}

// NEW FRAME CREATOR
let gameLoop;
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

//pause game loop
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
    setTimeout(() => { //setTimeot used as a hack (I could't get f. updateStop in next line to work)
        updateStop();
        const time = calculateTime();
        unblockLevel(currentLvl + 1);
        let isItBestRun = isItARecord(currentLvl, time);
        if (isItBestRun) {
            // save a new time to local storage
            saveInLocalStorage(currentLvl, time);
            // update the value in record-menu (html file)
            updateRecordInBestRuns(currentLvl);
        }
        updateYouWinWindow(currentLvl, time, isItBestRun);
        goToYouWinWindow();
    }, 0);
}


// LEVEL DATA
function createLevel(lvlNum) {
    currentLvl = lvlNum;
    timeStart = Date.now(); //save starting time
    switch (lvlNum) {
        case 1:
            start = new Start(60, 60); //create the start
            exit = new Exit(cvsWidth-60, cvsHeight-60); //create the exit
            //create holes
            holes = []; //clear holes from previous levels
            for (let i = 0; i < 5; i++) { //first row
                holes.push(new Hole(i * 100 + 60, 400));
            }
            for (let i = 0; i < 5; i++) { //second row
                holes.push(new Hole(i * 100 + 250, cvsHeight-400));
            }
            gems = [];
            collectedGems = 0;
            player = new Ball(start.posX, start.posY); // create the player
            break;

        case 2:
            start = new Start(60, 60); //create the start            
            exit = new Exit(cvsWidth-60, 60); //create the exit            
            holes = []; //create holes
            for (let i = 0; i < 10; i++) { //first column
                holes.push(new Hole(180, i * 100 + 60));
            }
            for (let i = 0; i < 10; i++) { //second column
                holes.push(new Hole(360, i * 100 + 320));
            }
            for (let i = 0; i < 10; i++) { //third column
                holes.push(new Hole(540, i * 100 + 60));
            }
            gems = [];
            collectedGems = 0;
            player = new Ball(start.posX, start.posY); //create the player
            break;

        case 3:
            start = new Start(300, 60);
            exit = new Exit(420, 60);
            holes = [];
            holes.push(new Hole(cvsWidth-50, 150));
            holes.push(new Hole(360, 185));
            holes.push(new Hole(120, 260));
            holes.push(new Hole(555, 375));
            holes.push(new Hole(400, 400));
            holes.push(new Hole(250, 505));
            holes.push(new Hole(400, 540));
            holes.push(new Hole(45, 610));
            holes.push(new Hole(225, 715));
            holes.push(new Hole(600, 810));
            holes.push(new Hole(430, 850));
            holes.push(new Hole(cvsWidth-50, 934));
            holes.push(new Hole(240, 1000));
            holes.push(new Hole(100, 1100));
            holes.push(new Hole(595, 1135));
            holes.push(new Hole(355, 1165));
            holes.push(new Hole(130, cvsHeight-50));

            collectedGems = 0;
            gems = [];
            gems.push(new Gem(70,60, gemColors.yellow));
            player = new Ball(start.posX, start.posY);
            break;

        default:
            holes = [];
            gems = [];
            collectedGems = 0;
            player = new Ball(100, 100);
    }
}