import { Vec2 } from "./math.js"

/**
 * For any object that can be displayed and animated on the screen. 
 */
export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0)
        this.vel = new Vec2(0, 0)
    }
}