import Circle from './circle.js';
import {win} from './game.js';

export default class Exit extends Circle{
    constructor(posX, posY, radius=20, color='orange') {
        super(posX, posY, radius, color)
    }

    detectCollision(player) {
        if (player.radius > Math.sqrt(Math.abs(player.posX - this.posX) * Math.abs(player.posX - this.posX) +
                Math.abs(player.posY - this.posY) * Math.abs(player.posY - this.posY))) {

            win();
        }
    }
}
