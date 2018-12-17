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
    move(axis, speed) {

    }
    draw() {
        ctx.drawImage(movingFloorImg, this.startX, this.startY, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }
}



const movingFloorImg = new Image();
movingFloorImg.src = 'img/pattern1.jpg';