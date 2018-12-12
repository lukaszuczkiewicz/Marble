import {
    ctx,
    createLevel,
    currentLvl,
    timer
} from './game.js';
import {
    saveRecord
} from './records.js';

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

            if (currentLvl < 9) {
                //unlock next level in level-menu and make the icon looking as active

                        //to do tomorrow..............


                document.querySelector(`.lvl-${currentLvl+1}`).classList.remove('blocked');

                //show level ???what is it??? 

                //go to next level (to improve)
                createLevel(currentLvl + 1);
            } else {
                // to do - go to main menu
            }
        }
    }
}