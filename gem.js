import {ctx} from './game.js';
// import Rectangle from './rectangle.js';


export {Gem, gemColors, gemToDelete};

class Gem{
    constructor(posX, posY, color, size = 52) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.size = size;
    }
    draw() {
        ctx.drawImage(this.color, this.posX, this.posY);
    }
    detectCollecting(ballX, ballY) {

        if (ballX > this.posX && ballX < this.posX+this.size && ballY > this.posY && ballY < this.posY+this.size) {

            gemToDelete = this;
        }
    }
}

let gemToDelete = null;

const gemColors = {
    black: new Image(),
    blue: new Image(),
    green: new Image(),
    purple: new Image(),
    red: new Image(),
    yellow: new Image()
};

gemColors.black.src = 'img/Gem-Black.png';
gemColors.blue.src = 'img/Gem-Blue.png';
gemColors.green.src = 'img/Gem-Green.png';
gemColors.purple.src = 'img/Gem-Purple.png';
gemColors.red.src = 'img/Gem-Red.png';
gemColors.yellow.src = 'img/Gem-Yellow.png';