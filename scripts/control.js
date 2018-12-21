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
document.addEventListener('deviceorientation', getOrientation);

function getOrientation(event) {
    console.log("function triggered")
    beta = event.beta;
    gamma = event.gamma;
}

// DOM elements
const canvas = document.querySelector('.canvas');
const userInterface = document.querySelector('.user-interface');
const mainMenu = document.querySelector('.main-menu');
const newGameBtn = document.querySelector('#new-game');
const selectLvlBtn = document.querySelector('#select-level');
const menuLevels = document.querySelector('.menu-levels');
const yourRecordsBtn = document.querySelector('#your-records');
const menuRecords = document.querySelector('.menu-records');
const returnBtn = document.querySelector('.return-btn');
const youWinWindow = document.querySelector('.you-win--window');
const youWinLvlNum = document.querySelector('.you-win--lvl-num');
const youWinTime = document.querySelector('.you-win--time');
const youWinBestTime = document.querySelector('.you-win--best-run');

//TOUCH EVENTS
document.addEventListener('click', (e)=> {
    if (e.target === canvas) { //game screen
        displayMainMenu(); //pause game
    } else if (e.target === newGameBtn) {
        newGame();
    } else if (e.target === selectLvlBtn){
        goToLevelMenu();
    } else if (e.target === yourRecordsBtn) {
        goToRecordsMenu();
    } else if (e.target === returnBtn) {
        returnToGame();
    } else {
        if (!youWinWindow.classList.contains('hide')) { //if you win window is displayed
            hideYouWinWindow();
        } else if (!menuLevels.classList.contains('hide')) { //if level selection menu is displayed
            returnToMainMenu();
        } else if (!menuRecords.classList.contains('hide')) { //if records menu is displayed
            returnToMainMenu();            
        }
    }
});

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
    youWinWindow.classList.remove('hide'); //display you win window
}

function hideYouWinWindow() {
    userInterface.classList.add('hide');
    youWinWindow.classList.add('hide');
    if (currentLvl < 9) { //check if there is next level
        //go to next level
        createLevel(currentLvl + 1);
        update();
    } else {
        displayMainMenu(); //go to main menu
        returnBtn.classList.add('hide'); //hide a return button
    }
}

function updateYouWinWindow(currentLvl, time, isItBestRun) {
    youWinLvlNum.textContent = currentLvl.toString();
    youWinTime.textContent = time.toString();
    if (isItBestRun) {
        youWinBestTime.textContent = "This is your new record!";
    } else {
        youWinBestTime.textContent = `Your best run was:
        ${document.querySelector(`.record-lvl-${currentLvl}`).textContent} s.`;
    }
}

function goToLevelMenu() {
    mainMenu.classList.add('hide'); //hide main menu
    menuLevels.classList.remove('hide'); //display level-selection-menu
}
function goToRecordsMenu() {
    mainMenu.classList.add('hide');
    menuRecords.classList.remove('hide');
}

function returnToGame() {
    userInterface.classList.add('hide'); //hide UI
    update(); //continue game loop
}
function returnToMainMenu() {
    menuRecords.classList.add('hide');
    menuLevels.classList.add('hide');
    mainMenu.classList.remove('hide');
}

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