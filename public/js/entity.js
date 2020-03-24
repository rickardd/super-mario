import { Vec2 } from "./math.js"

export class Trait {
    constructor(name) {
        this.NAME = name
    }

    update() {
        console.warn("Unhandled update call in Trait")
    }
}


/**
 * For any object that can be displayed and animated on the screen. 
 */
export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0)
        this.vel = new Vec2(0, 0)

        this.traits = []
    }

    addTrait(trait) {
        this.traits.push(trait) // Adds the trait to the list. 
        this[trait.NAME] = trait // Assigns the trait to this instance. 
    }

    update(deltaTime) {
        this.traits.forEach(trait => { // loops all traits
            trait.update(this, deltaTime) // runs the update function for each trait. 
        });
    }
}