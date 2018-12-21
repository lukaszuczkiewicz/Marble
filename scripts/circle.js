import {ctx} from './game.js';

export default class Circle {
    constructor(posX, posY, radius=20, color='black') {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
        ctx.fill();
    }
}