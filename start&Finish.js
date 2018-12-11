import {cvs,ctx, createLevel2} from './game.js';

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
        } else { //if it's the finish
            ctx.fillStyle = '#00bfff';
        }
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    detectCollision(player) {
        if (player.radius > Math.sqrt(Math.abs(player.posX - this.posX)* Math.abs(player.posX - this.posX)
        + Math.abs(player.posY - this.posY) * Math.abs(player.posY - this.posY))) {
            //go to next level (to do)
            createLevel2();
        }
    }
}