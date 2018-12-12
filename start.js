import Circle from './circle.js';

export default class Start extends Circle{
    constructor(posX, posY, radius=20, color='green') {
        super(posX, posY, radius, color)
    }
}