import {
    createLevel,
    currentLvl,
    update,
    updateStop,
} from "./game.js";

export let alpha = 0,
    beta = 0,
    gamma = 0;
export {
    displayYouWinWindow
};

// gyroscope
window.addEventListener('deviceorientation', getOrientation);

function getOrientation(event) {
    beta = event.beta;
    gamma = event.gamma;
}

// DOM elements
let canvas = document.querySelector('.canvas');
let mainMenu = document.querySelector('.main-menu');
let userInterface = document.querySelector('.user-interface');
let newGameBtn = document.querySelector('#new-game');
let selectLvlBtn = document.querySelector('#select-level');
let menuLevels = document.querySelector('.menu-levels');
let yourRecordsBtn = document.querySelector('#your-records');
let menuRecords = document.querySelector('.menu-records');
let returnBtn = document.querySelector('.return-btn');
let youWinWindow = document.querySelector('.you-win--window');

//TOUCH EVENTS
canvas.addEventListener('click', displayMainMenu);
newGameBtn.addEventListener('click', newGame);
returnBtn.addEventListener('click', returnToGame);
selectLvlBtn.addEventListener('click', goToLevelMenu);
youWinWindow.addEventListener('click', hideYouWinWindow);

function displayMainMenu() {
    updateStop(); //stop game loop (pause game)
    console.log('aaaaa');
    userInterface.classList.remove('hide'); //show UI
    mainMenu.classList.remove('hide'); //display main menu buttons
    returnBtn.classList.remove('hide'); //display return to game button
}

function displayYouWinWindow() {
    userInterface.classList.remove('hide'); //show UI
    mainMenu.classList.add('hide'); //hide main menu
    youWinWindow.classList.remove('hide'); //display 
}

function goToLevelMenu() {
    mainMenu.classList.add('hide'); //hide main menu
    menuLevels.classList.remove('hide'); //display level-selection-menu
}

function hideYouWinWindow() {
    userInterface.classList.add('hide');
    youWinWindow.classList.add('hide');
    if (currentLvl < 9) { //check if there is next level
        //go to next level
        createLevel(currentLvl + 1);
        update();
    } else {
        //go to main menu
        displayMainMenu();
    }
}

function newGame() {
    userInterface.classList.add('hide'); //hide UI
    createLevel(1); // load level 1
    update(); // start game loop
}

function returnToGame() {
    userInterface.classList.add('hide'); //hide UI
    update(); //continue game loop
}
menuLevels.addEventListener('click', () => {
    menuLevels.classList.add('hide');
    mainMenu.classList.remove('hide');
});
yourRecordsBtn.addEventListener('click', () => {
    mainMenu.classList.add('hide');
    menuRecords.classList.remove('hide');
});
menuRecords.addEventListener('click', () => {
    menuRecords.classList.add('hide');
    mainMenu.classList.remove('hide');
});

//choose levels (level-selection-menu)

document.addEventListener('click', (e) => {
    // check if an unblocked digit (in lvl-selection-menu) is clicked
    if (e.target.classList.contains('goto-lvl') && !e.target.classList.contains('blocked')) {

        createLevel(Number(e.target.dataset.num));
        update();
        //hide menu
        userInterface.classList.add('hide');
    }
});



//turn on fullscreen mode
userInterface.addEventListener('click', () => {
    document.querySelector('.body').requestFullscreen(); //there is an error in a desktop browser
});