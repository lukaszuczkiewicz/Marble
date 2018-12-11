import {
    createLevel1,
    createLevel2,
    update
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
let userInterface = document.querySelector('.user-interface'); //should i delete it?
let newGameBtn = document.querySelector('#new-game');
let selectLvlBtn = document.querySelector('#select-level');
let menuLevels = document.querySelector('.menu-levels');
let yourRecordsBtn = document.querySelector('#your-records');
let menuRecords = document.querySelector('.menu-records');

//turn on fullscreen mode
userInterface.addEventListener('click', () => {
    document.querySelector('.body').requestFullscreen(); //there is an error in a desktop browser
});

//display menu
canvas.addEventListener('click', () => {
    userInterface.classList.remove('hide');
});


// MENU RECORDS
newGameBtn.addEventListener('click', () => {
    userInterface.classList.add('hide'); //hide menu
    // start level 1
    createLevel1();
    update();
});
selectLvlBtn.addEventListener('click', () => {
    // hide main menu and show level menu
    mainMenu.classList.add('hide');
    menuLevels.classList.remove('hide');
});
        // menuLevels.addEventListener('click', () => {
        //     menuLevels.classList.add('hide');
        //     mainMenu.classList.remove('hide');
        // });
        menuLevels.addEventListener('click', () => { //TESTING
            userInterface.classList.add('hide'); //hide menu
            createLevel2();
            update();
        });
yourRecordsBtn.addEventListener('click', () => {
    mainMenu.classList.add('hide');
    menuRecords.classList.remove('hide');
});
        menuRecords.addEventListener('click', () => {
            menuRecords.classList.add('hide');
            mainMenu.classList.remove('hide');
        });

//choose levels
// let goToLvl1 = document.querySelector('.lvl-1');
// goToLvl1.addEventListener('click', createLevel2);