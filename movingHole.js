import { cvsWidth, cvsHeight } from "./game.js";
import Hole from './hole.js';

export default class MovingHole extends Hole {
    constructor(posX, posY, speedX=0, speedY=0, minPosX = 0, maxPosX = cvsWidth, minPosY = 0, maxPosY = cvsHeight, radius = 40, color = 'black',) {
        super(posX, posY, radius, color)
        this.speedX = speedX;
        this.speedY = speedY;
        this.minPosX = minPosX;
        this.maxPosX = maxPosX;
        this.maxPosY = maxPosY;
        this.minPosY = minPosY;
    }

    move() {
        //change direction
        if (this.posX <= this.minPosX || this.posX >= this.maxPosX) {
            this.speedX = -this.speedX;
        }
        if (this.posY <= this.minPosY || this.posY >= this.maxPosY) {
            this.speedY = -this.speedY;
        }
        // move a hole
        this.posX += this.speedX;
        this.posY += this.speedY;
    }
}