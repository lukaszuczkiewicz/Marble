import {cvs} from './game.js'
import { beta, gamma } from './control.js';
import Circle from './circle.js';

export default class Ball extends Circle{
    constructor(posX, posY, radius, color) {
        super(posX, posY, radius, color)
        this.velocityX = 0;
        this.velocityY = 0;
    }
    move() {        
        // acceleration x is the gamma and y is the beta value
        this.velocityX += gamma * 0.08;
        this.velocityY += beta * 0.08;
        this.posX += this.velocityX/2;
        this.posY += this.velocityY/2;
    }
    detectCollision() {
        //prevent rolling off the screen
        if (this.posX < this.radius) {
            this.posX = this.radius;
            //bounce the ball from a wall
            this.velocityX = -0.2* this.velocityX;
        } else if (this.posX + this.radius > cvs.width) {
            this.posX = cvs.width - this.radius;
            this.velocityX = -0.2* this.velocityX;
        }
        if (this.posY < this.radius) {
            this.posY = this.radius;
            this.velocityY = -0.2* this.velocityY;
        } else if (this.posY + this.radius > cvs.height) {
            this.posY = cvs.height - this.radius;
            this.velocityY = -0.2* this.velocityY;
        }
    }
}