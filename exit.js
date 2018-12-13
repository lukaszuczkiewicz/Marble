import Circle from './circle.js';
import {createLevel, currentLvl, timer, updateStop} from './game.js';
import {saveRecord, unblockLevel} from './localStorage.js';
import { displayYouWinWindow } from './control.js';

export default class Exit extends Circle{
    constructor(posX, posY, radius=20, color='orange') {
        super(posX, posY, radius, color)
    }

    detectCollision(player) {
        if (player.radius > Math.sqrt(Math.abs(player.posX - this.posX) * Math.abs(player.posX - this.posX) +
                Math.abs(player.posY - this.posY) * Math.abs(player.posY - this.posY))) {
            // save time
            timer.end = Date.now();
            saveRecord();
            unblockLevel(currentLvl+1)
            //display you win btn
            updateStop();
            displayYouWinWindow();
        }
    }
}
