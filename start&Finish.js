import {
    ctx,
    createLevel,
    currentLvl,
    timer
} from './game.js';
import {
    saveRecord, unblockLevel
} from './localStorage.js';

export default class StartAndFinish {
    constructor(posX, posY, radius, type) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.type = type;
    }
    draw() {
        if (this.type === 'start') {
            ctx.fillStyle = 'green';
        } else { //if it's the exit
            ctx.fillStyle = '#00bfff';
        }
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
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