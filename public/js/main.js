import { loadMarioSprite, loadBackgroundSprites } from "./sprites.js"
import { loadLevel } from "./loaders.js"
import Compositor from "./compositor.js"
import { createBackgroundLayer } from "./layers.js"

const canvas = document.getElementById("screen")
const context = canvas.getContext("2d")

function createSpriteLayer(sprite, pos) {
    /**
     * This higher order functions is called in the Compositor class 
     * 
     * this.layer.forEach(layer => {
     *   layer(context)
     * })
     */
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y)
    }
}

/** Starts the game once all assets are loaded */
Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1.1'),
])
    .then(([marioSprite, sprites, level]) => {

        const comp = new Compositor()

        const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
        comp.layers.push(backgroundLayer)

        const pos = {
            x: 64,
            y: 64,
        }

        const spriteLayer = createSpriteLayer(marioSprite, pos)
        comp.layers.push(spriteLayer)

        function update() {
            comp.draw(context)

            pos.x += 2
            pos.y += 2
            requestAnimationFrame(update)
        }

        update()
    })

