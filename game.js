import Ball from './ball.js';
import Exit from './exit.js';
import Hole from './hole.js';
import Map from './map.js';
import MovingHole from './movingHole.js';
import {
    MovingFloor,
    movingFloorPatterns
} from './movingFloor.js';
import {
    Gem,
    gemColors,
    gemToDelete
} from './gem.js';
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
    cvsWidth,
    cvsHeight,
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
let player, map, currentLvl, exit, timeStart;
let holes = [],
    gemsToCollect = [],
    movingFloors = [],
    movingHoles = [];

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
        exit.detectCollision(player); //detect only when you collected all gems
    }
    holes.forEach((hole) => {
        hole.isBallOver(player);
    });
    movingHoles.forEach((el) => { //test
        el.move();
        el.isBallOver(player);
    });
    gemsToCollect.forEach((gem) => { //to refractor
        gem.detectCollecting(player.posX, player.posY);
    });
    if (gemToDelete !== null) { //to refractor
        // console.log(gemToDelete) //it logs forever after collecting the first gem
        gemsToCollect = gemsToCollect.filter((el) => el !== gemToDelete);
    }
    // draw functions
    map.draw();
    movingFloors.forEach((floor) => {
        floor.draw();
    });
    // start.draw();
    exit.draw();
    holes.forEach((el) => {
        el.draw();
    });
    movingHoles.forEach((el) => {
        el.draw();
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
    movingHoles = []; //clear moving holes from previous levels
    gemsToCollect = []; //clear gems from previous levels
    switch (lvlNum) {
        case 1: //level 1
            exit = new Exit(cvsWidth - 60, cvsHeight - 60); //create the exit
            //create holes
            for (let i = 0; i < 5; i++) { //first row
                holes.push(new Hole(i * 100 + 60, 400));
            }
            for (let i = 0; i < 5; i++) { //second row
                holes.push(new Hole(i * 100 + 250, cvsHeight - 400));
            }
            player = new Ball(60, 60); //create the player

            break;

        case 2: //level 2          
            exit = new Exit(cvsWidth - 60, 60); //create the exit
            for (let i = 0; i < 10; i++) { //first column
                holes.push(new Hole(180, i * 100 + 60));
            }
            for (let i = 0; i < 10; i++) { //second column
                holes.push(new Hole(360, i * 100 + 320));
            }
            for (let i = 0; i < 10; i++) { //third column
                holes.push(new Hole(540, i * 100 + 60));
            }
            player = new Ball(60, 60); //create the player
            break;

        case 3: //level 3
            exit = new Exit(200, 60);
            holes.push(new Hole(cvsWidth - 50, 150));
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
            holes.push(new Hole(cvsWidth - 50, 934));
            holes.push(new Hole(240, 1000));
            holes.push(new Hole(100, 1100));
            holes.push(new Hole(595, 1135));
            holes.push(new Hole(355, 1165));
            holes.push(new Hole(130, cvsHeight - 50));

            gemsToCollect = [
                new Gem(646, 30, gemColors.green),
                new Gem(310, 440, gemColors.red),
                new Gem(115, 720, gemColors.purple),
                new Gem(540, 880, gemColors.blue),
                new Gem(210, 1100, gemColors.yellow),
                new Gem(cvsWidth - 100, cvsHeight - 100, gemColors.black)
            ];
            player = new Ball(60, 60); //create the player

            break;

        case 4: //level 4
            let speeds = [6, -10, 14, -18];
            for (let i = 1; i < 5; i++) {
                movingFloors.push(new MovingFloor(123, i * 230, 473, 120, movingFloorPatterns.pattern1, 'x', speeds[i - 1], 0, 0));
            }
            exit = new Exit(cvsWidth - 60, 980);
            holes.push(new Hole(cvsWidth - 60, 288));
            holes.push(new Hole(60, 521));
            for (let i = 0; i < 7; i++) {
                if (i !== 3) {
                    holes.push(new Hole(60 + i * 100, 638)); //midle row
                }
            }
            holes.push(new Hole(60, 890));
            holes.push(new Hole(60, 1070));
            holes.push(new Hole(cvsWidth - 60, 890));
            holes.push(new Hole(cvsWidth - 60, 1070));
            gemsToCollect = [
                new Gem(380, 270, gemColors.green),
                new Gem(130, 498, gemColors.purple),
                new Gem(336, 610, gemColors.black),
                new Gem(60, 690, gemColors.blue),
                new Gem(606, 760, gemColors.yellow),
                new Gem(36, 956, gemColors.red)
            ];
            player = new Ball(60, 60); //create the player

            break;

        case 5: //level 5
            exit = new Exit(cvsWidth - 50, cvsHeight - 50);
            for (let i = 0; i < 7; i++) {
                movingHoles.push(new MovingHole(60 + i * 100, 1050, 0, -10, 0, 720, 50, 1100));
            }
            gemsToCollect = [
                new Gem(500, 160, gemColors.black),
                new Gem(200, 180, gemColors.red),
                new Gem(300, 200, gemColors.yellow),
                new Gem(600, 220, gemColors.green),
                new Gem(100, 240, gemColors.purple),
                new Gem(400, 260, gemColors.blue)
            ];
            player = new Ball(50, cvsHeight - 50); //create the player    
            break;
        case 6: //level 6
            exit = new Exit(360, 690);
            movingFloors.push(new MovingFloor(100, 0, 200, 1300, movingFloorPatterns.pattern2, 'y', 10, 0, 0));
            movingFloors.push(new MovingFloor(420, 0, 200, 1300, movingFloorPatterns.pattern2, 'y', -10, 0, 0));
            movingHoles.push(new MovingHole(360, 250, -16, 0, 50, 670));
            movingHoles.push(new MovingHole(360, 340, 16, 0, 50, 670));
            movingHoles.push(new MovingHole(360, 940, -16, 0, 50, 670));
            movingHoles.push(new MovingHole(360, 1010, 16, 0, 50, 670));
            holes.push(new Hole(50, 130));
            holes.push(new Hole(50, 640));
            holes.push(new Hole(50, cvsHeight - 130));
            holes.push(new Hole(cvsHeight - 50, 130));
            holes.push(new Hole(cvsHeight - 50, 640));
            holes.push(new Hole(cvsHeight - 50, cvsHeight - 130));

            gemsToCollect = [
                new Gem(130, 100, gemColors.black),
                new Gem(130, 619, gemColors.red),
                new Gem(130, 1128, gemColors.yellow),
                new Gem(542, 100, gemColors.green),
                new Gem(542, 619, gemColors.purple),
                new Gem(542, 1128, gemColors.blue)
            ];
            player = new Ball(360, 590); //create the player

            break;

        case 7: //level 7
            exit = new Exit(360, 640);

            movingFloors.push(new MovingFloor(0, 0, cvsWidth, 600, movingFloorPatterns.pattern3, 'y', 16, 0, 0));
            movingFloors.push(new MovingFloor(0, 680, cvsWidth, 600, movingFloorPatterns.pattern3, 'y', -16, 0, 0));

            movingHoles.push(new MovingHole(60, 100, -6, 0, 50, 670));
            movingHoles.push(new MovingHole(560, 200, 9, 0, 50, 670));
            movingHoles.push(new MovingHole(260, 300, -13, 0, 50, 670));
            movingHoles.push(new MovingHole(360, 400, 16, 0, 50, 670));
            
            movingHoles.push(new MovingHole(360, 880, -16, 0, 50, 670));
            movingHoles.push(new MovingHole(460, 980, 13, 0, 50, 670));
            movingHoles.push(new MovingHole(160, 1080, -9, 0, 50, 670));
            movingHoles.push(new MovingHole(660, 1180, 6, 0, 50, 670));

            gemsToCollect = [
                new Gem(cvsWidth-52-100, 100, gemColors.yellow),
                new Gem(360-26, 300-26, gemColors.purple),
                new Gem(100, 600-52-100, gemColors.green),
                new Gem(cvsWidth-52-100, 780, gemColors.black),
                new Gem(360-26, 980-26, gemColors.blue),
                new Gem(100, cvsHeight-52-100, gemColors.red)
            ];

            player = new Ball(exit.posX, exit.posY);
            break;
            
        case 8: //level 8
            exit = new Exit(360, cvsHeight - 50);

            const breadth = 300;
            movingFloors.push(new MovingFloor(0, 0, cvsWidth-breadth, breadth, movingFloorPatterns.pattern4, 'x', 14, 0, 0));
            movingFloors.push(new MovingFloor(cvsWidth-breadth, 0, breadth, cvsHeight-breadth, movingFloorPatterns.pattern5, 'y', 10, 0, 0));
            movingFloors.push(new MovingFloor(breadth, cvsHeight-breadth, cvsWidth-breadth, breadth, movingFloorPatterns.pattern4, 'x', -14, 0, 0));
            movingFloors.push(new MovingFloor(0, breadth, breadth, cvsHeight-breadth, movingFloorPatterns.pattern5, 'y', -10, 0, 0));

            for (let i = 0; i < 6; i++) {
                holes.push(new Hole(360, 391 + i * 100));
            }
                //left
                movingHoles.push(new MovingHole(50, 200, 0, -4, 0, 720, 50, cvsHeight-50));
                movingHoles.push(new MovingHole(150, 1000, 0, 8, 0, 720, 50, cvsHeight-50));
                movingHoles.push(new MovingHole(250, 600, 0, -14, 0, 720, 50, cvsHeight-50));
                //right
                movingHoles.push(new MovingHole(cvsWidth-50, 500, 0, 12, 0, 720, 50, cvsHeight-50));
                movingHoles.push(new MovingHole(cvsWidth-150, 400, 0, -10, 0, 720, 50, cvsHeight-50));
                movingHoles.push(new MovingHole(cvsWidth-250, 800, 0, 6, 0, 720, 50, cvsHeight-50));

            gemsToCollect = [
                //x
                new Gem(360, 100, gemColors.green),
                new Gem(360, cvsHeight-200, gemColors.red),
                //y left
                new Gem(50, 300, gemColors.purple),
                new Gem(200, cvsHeight-352, gemColors.black),
                //y right
                new Gem(cvsWidth-102, 300, gemColors.blue),
                new Gem(cvsWidth-252, cvsHeight-352, gemColors.yellow)
            ];

            player = new Ball(360, 50);
            break;

        case 9: //level 9
            exit = new Exit(360, cvsHeight - 50);
            movingHoles.push(new MovingHole(150, 150, 5, 0, 50, 670));
            movingHoles.push(new MovingHole(111, 245, -6, 0, 50, 670));
            movingHoles.push(new MovingHole(90, 340, 7, 0, 50, 670));
            movingHoles.push(new MovingHole(444, 435, 13, 0, 50, 670));
            movingHoles.push(new MovingHole(500, 530, -10, 0, 50, 670));
            movingHoles.push(new MovingHole(222, 625, -6, 0, 50, 670));
            movingHoles.push(new MovingHole(457, 720, 9, 0, 50, 670));
            movingHoles.push(new MovingHole(333, 815, -12, 0, 50, 670));
            movingHoles.push(new MovingHole(179, 910, 10, 0, 50, 670));
            movingHoles.push(new MovingHole(360, 1005, 20, 0, 50, 670));
            movingHoles.push(new MovingHole(360, 1100, -20, 0, 50, 670));
            holes.push(new Hole(250, cvsHeight - 50));
            holes.push(new Hole(470, cvsHeight - 50));
            gemsToCollect = [
                new Gem(300, 160, gemColors.black),
                new Gem(444, 300, gemColors.red),
                new Gem(125, 513, gemColors.yellow),
                new Gem(315, 655, gemColors.green),
                new Gem(606, 760, gemColors.purple),
                new Gem(348, 1000, gemColors.blue)
            ];
            player = new Ball(360, 50);
            break;

        default:
            exit = new Exit(cvsWidth - 50, cvsHeight - 50);
            player = new Ball(50, 50);
    }
}