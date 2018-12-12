import {
    createLevel,
    update,
    updateStop,
} from "./game.js";

export let alpha = 0,
    beta = 0,
    gamma = 0;

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

//turn on fullscreen mode
userInterface.addEventListener('click', () => {
    document.querySelector('.body').requestFullscreen(); //there is an error in a desktop browser
});

//display menu
canvas.addEventListener('click', () => {
    userInterface.classList.remove('hide');
    //stop game loop (pause game)
    updateStop();
    //
    //display return to game button
    returnBtn.classList.remove('hide');
});

// main menu buttons
newGameBtn.addEventListener('click', () => {
    userInterface.classList.add('hide'); //hide menu
    // load level 1
    createLevel(1);
    // start game loop
    update();
});
selectLvlBtn.addEventListener('click', () => {
    // hide main menu and show level menu
    mainMenu.classList.add('hide');
    menuLevels.classList.remove('hide');
});
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
returnBtn.addEventListener('click', () => {
    //close menu
    userInterface.classList.add('hide');
    // continue game loop
    update();
});

//choose levels (level-selection-menu)

document.addEventListener('click', (e)=> {
    // check if an unblocked digit (in lvl-selection-menu) is clicked
    if (e.target.classList.contains('goto-lvl') && !e.target.classList.contains('blocked')) {

        createLevel(Number(e.target.dataset.num));
        update();
        //hide menu
        userInterface.classList.add('hide');
    }
});