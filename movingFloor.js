import Rectangle from "./rectangle.js";
import {ctx} from './game.js';

export {MovingFloor, movingFloorPatterns};

class MovingFloor extends Rectangle{
    constructor(posX, posY, width, height, pattern, axis, speed, startX=0, startY=0) {
        super(posX, posY, width, height)
        this.pattern = pattern;
        this.axis = axis;
        this.speed = speed;
        this.startX = startX;
        this.startY = startY;
    }
    move() {
        if (this.axis === 'x') {
            this.startX -= this.speed; //move image

            if (this.speed < 0 && this.startX+this.width >= this.pattern.width) { //repeat image when moving to the left
                this.startX = 0;
            } else if (this.speed > 0 && this.startX <= 0) { //repeat image when moving to the right
                this.startX = this.pattern.width - this.width;
            }
        }
        else if (this.axis === 'y') {
            this.startY -= this.speed;

            if (this.speed < 0 && this.startY+this.height >= this.pattern.height) { //repeat image when moving to the left
                this.startY = 0;
            } else if (this.speed > 0 && this.startY <= 0) { //repeat image when moving to the right
                this.startY = this.pattern.height - this.height;
            }
        }


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
        ctx.drawImage(this.pattern, this.startX, this.startY, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }
}

const movingFloorPatterns = {
    pattern1: new Image(),
    pattern2: new Image()
}

movingFloorPatterns.pattern1.src = 'img/pattern3.gif';
movingFloorPatterns.pattern2.src = 'img/pattern4.jpg';