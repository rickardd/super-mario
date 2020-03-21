export default class Compositor {
    constructor() {
        this.layers = []
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer(context) // is a draw function e.g drawSpriteLayer(context)
        })
    }
}