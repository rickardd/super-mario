import { loadBackgroundSprites } from "./sprites.js"
import Timer from "./Timer.js"
// import Entity from "./entity.js"
import { loadLevel } from "./loaders.js"
import Compositor from "./compositor.js"
import { createBackgroundLayer, createSpriteLayer } from "./layers.js"
import { createMario } from "./entities.js"
import Keyboard from "./KeyboardState.js"

const canvas = document.getElementById("screen")
const context = canvas.getContext("2d")

/** Starts the game once all assets are loaded */
Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1.1'),
])
    .then(([mario, sprites, level]) => {

        const comp = new Compositor()

        const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
        comp.layers.push(backgroundLayer)

        const gravity = 2000
        mario.pos.set(64, 180)
        mario.vel.set(200, -600)

        const SPACE = 32
        const input = new Keyboard()
        input.addMapping(SPACE, keyState => {
            if (keyState) {
                mario.jump.start()
            } else {
                mario.jump.cancel()
            }
        })
        input.listenTo(window)

        const spriteLayer = createSpriteLayer(mario)
        comp.layers.push(spriteLayer)

        const timer = new Timer(1 / 60)

        timer.update = function update(deltaTime) {
            mario.update(deltaTime)
            comp.draw(context)
            mario.vel.y += gravity * deltaTime
        }

        timer.start()
    })

