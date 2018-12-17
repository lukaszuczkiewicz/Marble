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
        if (this.axis === 'x') {
            this.startX -= this.speed; //move image
        }
        if (this.speed < 0 && this.startX+this.width>=movingFloorImg.width) { //repeat image when moving to the left
            this.startX = 0;
        } else if (this.speed > 0 && this.startX <= 0) { //repeat image when moving to the right
            this.startX = movingFloorImg.width - this.width;
        }
        // else if (this.axis === 'y') {
        //     this.startY -= this.speed;
        // }
    }
    detectCollision(player) {
        if (player.posX > this.posX && player.posX < this.posX+this.width && player.posY > this.posY && player.posY < this.posY+this.height) {
            // player.posX += this.speed;
            // it shouldn't be a change of position but a change of velocity
            player.velocityX += 0.1*this.speed;

            // player.posY += this.speed; to fix later
        }
    }
    draw() {
        ctx.drawImage(movingFloorImg, this.startX, this.startY, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }
}



const movingFloorImg = new Image();
movingFloorImg.src = 'img/pattern3.gif';