import { Direction } from "./utiltities.js"

class SimonSays {
    constructor() {
        this.blocks = {
            all:$(".simon-option"),
            [Direction.Left]:$(".simon-option.left"),
            [Direction.Right]:$(".simon-option.right"),
            [Direction.Down]:$(".simon-option.down"),
            [Direction.Up]:$(".simon-option.up"),
        }
        this.active = null;
    }

    activate(direction) {
        this.active = direction;
        let block = this.blocks[direction]
        if (!block) return
        block.addClass("active")
    }

    deactivate() {
        this.active = null;
        this.blocks.all.removeClass("active")
    }

    getActive() {
        return this.active
    }
}

export function getSimon() {
    return new SimonSays()
}