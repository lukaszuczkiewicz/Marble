// LOCAL STORAGE
import {
    timer,
    currentLvl
} from './game.js';
export {
    loadLocalStorage,
    saveRecord,
    unblockLevel
};

function loadLocalStorage() {
    // check if there are any records in local storage
    if (localStorage.length !== 0) {
        // display local storage values in record-menu (html file)
        for (let key in localStorage) { //won't work if there not only recods saved in local storage
            if (localStorage.hasOwnProperty(key)) {
                // display a record saved in local storage
                displayRecord(Number(key));
                // unblock the next level
                unblockLevel(Number(key)+1);
            }
        }
    }
}
function displayRecord(lvlNum) {
    document.querySelector(`.record-lvl-${lvlNum}`).textContent = localStorage.getItem(lvlNum);
}

function unblockLevel(lvlNum) {
    // unblock the next level in level-selector-menu
    if (lvlNum <= 9) {
        document.querySelector(`.lvl-${lvlNum}`).classList.remove('blocked');
    }
}

function saveRecord() {
    let newTime = timer.end - timer.start;
    //convert from milliseconds to seconds
    newTime = (newTime / 1000).toFixed(1);
    if (localStorage.getItem(`${currentLvl}`) === null || //check if there is no previous record for this lvl
        newTime < Number(localStorage.getItem(`${currentLvl}`))) {
        // save a new time to local storage
        localStorage.setItem(`${currentLvl}`, `${newTime}`);
        // update the value in record-menu (html file)
        displayRecord(currentLvl);
    }
}