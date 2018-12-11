import {cvs, ctx} from './game.js'

export default class Map {
    constructor(wood) {
        this.bgImage = new Image();
        this.bgImage.src = `img/${wood}.jpg`;
    }
    draw() {
        ctx.drawImage(this.bgImage, 0, 0);
    }
}