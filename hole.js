import {createLevel, currentLvl} from './game.js';
import Circle from './circle.js';

export default class Hole extends Circle {
    constructor(posX, posY, radius=20, color='black') {
        super(posX, posY, radius, color)
    }
    
    isBallOver(player) {
        if (player.radius > Math.sqrt(Math.abs(player.posX - this.posX)* Math.abs(player.posX - this.posX)
        + Math.abs(player.posY - this.posY) * Math.abs(player.posY - this.posY))) {
            createLevel(currentLvl);
        }
    }
}