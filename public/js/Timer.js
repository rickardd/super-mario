export default class Timer {
    constructor(deltaTime = 1 / 60) {
        let accumulatedTime = 0
        let lastTime = 0

        this.updateProxy = (time) => {
            this.enqueue()

            accumulatedTime += (time - lastTime) / 1000 // in seconds

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime)
                accumulatedTime -= deltaTime
            }

            lastTime = time

        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy)
    }

    start() {
        this.enqueue()
    }
}