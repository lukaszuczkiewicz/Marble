import {
    createLevel,
    currentLvl
} from './game.js';
import Circle from './circle.js';

export default class Hole extends Circle {
    constructor(posX, posY, radius = 20, color = 'black') {
        super(posX, posY, radius, color)
    }

    isBallOver(player) {
        if (player.radius > Math.sqrt(Math.abs(player.posX - this.posX) * Math.abs(player.posX - this.posX) +
            Math.abs(player.posY - this.posY) * Math.abs(player.posY - this.posY))) {

                // game over
                createLevel(currentLvl); //restart the level
        }
    }

    // catchABall(player) {
    //     if (player.posX > this.posX) {
    //         player.posX -= 1;
    //     } else if (player.posX < this.posX) {
    //         player.posX += 1;
    //     }
    //     if (player.posY > this.posY) {
    //         player.posY -= 1;
    //     } else if (player.posY < this.posY) {
    //         player.posY += 1;
    //     }
    //     //make a ball smaller(dropping down effect)
    //     player.radius -= 1;

    //     if (Math.abs(player.posX - this.posX) < 5 && Math.abs(player.posY - this.posY) < 5) {
    //         // set current loop to main game loop
    //         createLevel(currentLvl);
    //     }
    // }

    // move() { //TO DO

    // };
}