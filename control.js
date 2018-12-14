import {
    createLevel,
    currentLvl,
    update,
    updateStop
} from "./game.js";

export let beta = 0,
    gamma = 0;
export {
    goToYouWinWindow,
    updateYouWinWindow
};

// gyroscope
window.addEventListener('deviceorientation', getOrientation);

function getOrientation(event) {
    beta = event.beta;
    gamma = event.gamma;
}

// DOM elements
const canvas = document.querySelector('.canvas');
const mainMenu = document.querySelector('.main-menu');
const userInterface = document.querySelector('.user-interface');
const newGameBtn = document.querySelector('#new-game');
const selectLvlBtn = document.querySelector('#select-level');
const menuLevels = document.querySelector('.menu-levels');
const yourRecordsBtn = document.querySelector('#your-records');
const menuRecords = document.querySelector('.menu-records');
const returnBtn = document.querySelector('.return-btn');
const youWinWindow = document.querySelector('.you-win--window');
const youWinLvlNum = document.querySelector('.you-win--lvl-num');
const youWinTime = document.querySelector('.you-win--time');


//TOUCH EVENTS
canvas.addEventListener('click', displayMainMenu);
newGameBtn.addEventListener('click', newGame);
returnBtn.addEventListener('click', returnToGame);
selectLvlBtn.addEventListener('click', goToLevelMenu);
youWinWindow.addEventListener('click', hideYouWinWindow);

//main menu
function displayMainMenu() {
    updateStop(); //stop game loop (pause game)
    userInterface.classList.remove('hide'); //show UI
    mainMenu.classList.remove('hide'); //display main menu buttons
    returnBtn.classList.remove('hide'); //display return to game button
}

// main menu options
function newGame() {
    userInterface.classList.add('hide'); //hide UI
    createLevel(1); // load level 1
    update(); // start game loop
}
//you win window
function goToYouWinWindow() {
    updateStop(); //stop game loop (pause game)
    userInterface.classList.remove('hide'); //show UI
    mainMenu.classList.add('hide'); //hide main menu
    youWinWindow.classList.remove('hide'); //display 
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

function updateYouWinWindow(currentLvl, time) {
    youWinLvlNum.textContent = currentLvl.toString();
    youWinTime.textContent = time.toString();
}

function goToLevelMenu() {
    mainMenu.classList.add('hide'); //hide main menu
    menuLevels.classList.remove('hide'); //display level-selection-menu
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