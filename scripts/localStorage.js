// LOCAL STORAGE
import {
    unblockLevel
} from './game.js';
export {
    isItARecord,
    updateRecordInBestRuns,
    loadLocalStorage,
    saveInLocalStorage
};

function loadLocalStorage() {
    if (localStorage.length !== 0) { // check if there are any records in local storage
        for (let key in localStorage) { // won't work if there not only recods saved in local storage
            if (localStorage.hasOwnProperty(key)) {
                updateRecordInBestRuns(Number(key));
                unblockLevel(Number(key) + 1);
            }
        }
    }
}

function updateRecordInBestRuns(lvlNum) {
    document.querySelector(`.record-lvl-${lvlNum}`).textContent = localStorage.getItem(lvlNum);
}

function isItARecord(currentLvl, time) {
    if (localStorage.getItem(`${currentLvl}`) === null || //check if there is no previous record for this lvl
        time < Number(localStorage.getItem(`${currentLvl}`))) {
            return true;
        }
        return false;
}

function saveInLocalStorage(currentLvl, time) {
    localStorage.setItem(`${currentLvl}`, `${time}`);
}