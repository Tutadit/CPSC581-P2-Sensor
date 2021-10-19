export const Direction = {
    Left:"left",
    Right:"right",
    Down:"down",
}

class SimonSays {
    constructor() {
        this.blocks = {
            [Direction.Left]:$(".simon-option.left"),
            [Direction.Right]:$(".simon-option.right"),
            [Direction.Down]:$(".simon-option.down")
        }
    }

    activate(direction) {
        let block = this.blocks[direction]
        if (!block) return
        block.addClass("active")
    }
}

export function getSimon() {
    return new SimonSays()
}