import {cvs, ctx} from './game.js'
import { beta, gamma } from './control.js';

export default class Ball {
    constructor(posX, posY, radius, color) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.velocityX = 0;
        this.velocityY = 0;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
        ctx.fill();
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