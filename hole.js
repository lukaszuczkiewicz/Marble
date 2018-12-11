import {cvs, ctx} from './game.js';
import {gameOver} from './game.js';

export default class Hole {
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
    
    isBallOver(player) {
        if (player.radius > Math.sqrt(Math.abs(player.posX - this.posX)* Math.abs(player.posX - this.posX)
        + Math.abs(player.posY - this.posY) * Math.abs(player.posY - this.posY))) {
            gameOver();
        }
    }
}