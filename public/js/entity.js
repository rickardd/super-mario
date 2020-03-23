import { Vec2 } from "./math.js"

export class Trait {
    constructor() {
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
        this.traits.push(trait)
        this[trait.NAME] = trait
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime)
        });
    }
}