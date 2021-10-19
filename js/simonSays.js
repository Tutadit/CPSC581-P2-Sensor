import { Direction } from "./utiltities.js"

class SimonSays {
    constructor() {
        this.blocks = {
            all:$(".simon-option"),
            [Direction.Left]:$(".simon-option.left"),
            [Direction.Right]:$(".simon-option.right"),
            [Direction.Down]:$(".simon-option.down")
        }
        this.active = false;
    }

    activate(direction) {
        this.active = true;
        let block = this.blocks[direction]
        if (!block) return
        block.addClass("active")
    }

    deactivate() {
        this.active = false;
        this.blocks.all.removeClass("active")
    }

    isActive() {
        return this.active
    }
}

export function getSimon() {
    return new SimonSays()
}