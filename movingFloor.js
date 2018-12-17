import Rectangle from "./rectangle.js";

import {ctx} from './game.js';

export default class MovingFloor extends Rectangle{
    constructor(posX, posY, width, height, axis, speed, startX, startY) {
        super(posX, posY, width, height)
        this.axis = axis;
        this.speed = speed;
        this.startX = startX;
        this.startY = startY;
    }
    move() {
        //move image
        if (this.axis === 'x') {
            this.startX -= this.speed;
        } else if (this.axis === 'y') {
            this.startY -= this.speed;
        }
    }
    detectCol(player) {
        if (player.posX > this.posX && player.posX < this.posX+this.width && player.posY > this.posY && player.posY < this.posY+this.height) {
            player.posX += this.speed;
            // player.posY += this.speed; to fix later
        }
    }
    draw() {
        ctx.drawImage(movingFloorImg, this.startX, this.startY, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }
}



const movingFloorImg = new Image();
movingFloorImg.src = 'img/pattern1.jpg';