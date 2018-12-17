import Ball from './ball.js';
import Map from './map.js';
import Hole from './hole.js';
import Start from './start.js';
import Exit from './exit.js';
import MovingFloor from './movingFloor.js';
import { Gem, gemColors, gemToDelete } from './gem.js';
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
    gemsToCollect,
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
let holes = [], gemsToCollect=[], movingFloors = [];

//create a background for all levels
map = new Map('wood');

function game() {
    player.move();
    player.detectCollision();
    movingFloors.forEach((floor) => {
        floor.move();
    });
    movingFloors.forEach((floor) => {
        floor.detectCollision(player);
    });
    if (gemsToCollect.length === 0) {
        exit.detectCollision(player);
    }
    holes.forEach((hole) => {
        hole.isBallOver(player);
    });
    gemsToCollect.forEach((gem) => { //to refractor
        gem.detectCollecting(player.posX, player.posY);
    });
    if (gemToDelete !== null) { //to refractor
        // console.log(gemToDelete) //it logs forever after collecting the first gem
        gemsToCollect = gemsToCollect.filter((el)=>el !== gemToDelete);
    }
    // draw functions
    map.draw();
    movingFloors.forEach((floor) => {
        floor.draw();
    });
    start.draw();
    exit.draw();
    holes.forEach((el) => {
        el.draw()
    });
    gemsToCollect.forEach((el) => {
        el.draw();
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
    movingFloors = []; //clear moving floors from previous levels
    holes = []; //clear holes from previous levels
    gemsToCollect = []; //clear gems from previous levels
    switch (lvlNum) {
        case 1:
            start = new Start(60, 60); //create the start
            exit = new Exit(cvsWidth-60, cvsHeight-60); //create the exit
            //create holes
            for (let i = 0; i < 5; i++) { //first row
                holes.push(new Hole(i * 100 + 60, 400));
            }
            for (let i = 0; i < 5; i++) { //second row
                holes.push(new Hole(i * 100 + 250, cvsHeight-400));
            }
            break;

        case 2:
            start = new Start(60, 60); //create the start            
            exit = new Exit(cvsWidth-60, 60); //create the exit
            for (let i = 0; i < 10; i++) { //first column
                holes.push(new Hole(180, i * 100 + 60));
            }
            for (let i = 0; i < 10; i++) { //second column
                holes.push(new Hole(360, i * 100 + 320));
            }
            for (let i = 0; i < 10; i++) { //third column
                holes.push(new Hole(540, i * 100 + 60));
            }
            break;

        case 3:
            start = new Start(60, 60);
            exit = new Exit(200, 60);
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

            gemsToCollect = [
                new Gem(646,30, gemColors.green),
                new Gem(310,440, gemColors.red),
                new Gem(115,720, gemColors.purple),
                new Gem(540,880, gemColors.blue),
                new Gem(210,1100, gemColors.yellow),
                new Gem(cvsWidth-100,cvsHeight-100, gemColors.black)
            ];
            break;

        case 4:
        let speeds = [6, -10, 14, -18];
        for (let i = 1; i<5; i++) {
            movingFloors.push(new MovingFloor(123, i*230, 473, 120, 'x', speeds[i-1], 0, 0));
        }
            start = new Start(60, 60);
            exit = new Exit(cvsWidth-60, 980);
            holes.push(new Hole(cvsWidth-60, 288));
            holes.push(new Hole(60, 521));
            for (let i = 0; i < 7; i++) {
                if (i !== 3) {
                    holes.push(new Hole(60+ i*100, 638)); //midle row
                } 
            }
            holes.push(new Hole(60, 890));
            holes.push(new Hole(60, 1070));
            holes.push(new Hole(cvsWidth-60, 890));
            holes.push(new Hole(cvsWidth-60, 1070));
            gemsToCollect = [
                new Gem(380, 270, gemColors.green),
                new Gem(130, 498, gemColors.purple),
                new Gem(336, 610, gemColors.black),
                new Gem(60, 690, gemColors.blue),
                new Gem(606, 760, gemColors.yellow),
                new Gem(36, 956, gemColors.red)
            ];
            break;

            case 5:
                start = new Start(60, 60);
                exit = new Exit(cvsWidth-60, 980);

                break;
        default:
            // holes = [];
            // player = new Ball(100, 100);

    }
    player = new Ball(start.posX, start.posY); //create the player
}