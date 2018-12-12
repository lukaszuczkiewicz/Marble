import Circle from './circle.js';
import {createLevel, currentLvl, timer} from './game.js';
import {saveRecord, unblockLevel} from './localStorage.js';

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
    
            if (currentLvl < 9) {
                //go to next level (to improve)
                createLevel(currentLvl + 1);
            } else {
                // to do - go to main menu
            }
        }
    }
}
