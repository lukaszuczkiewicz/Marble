export {Gem, gems};

class Gem {
    constructor(posX, posY, color) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
    }
}

const gems = {
    black = new Image(),
    blue = new Image(),
    green = new Image(),
    purple = new Image(),
    red = new Image(),
    yellow = new Image(),
};

gems.black = 'img/Gem-Black.png';
gems.blue = 'img/Gem-Blue.png';
gems.green = 'img/Gem-Green.png';
gems.purple = 'img/Gem-Purple.png';
gems.red = 'img/Gem-Red.png';
gems.yellow = 'img/Gem-Yellow.png';
