export const Direction = {
  Left: "left",
  Right: "right",
  Down: "down",
  Up: "up",
  opposite: function (direction) {
    let opposite = null;
    switch (direction) {
      case this.Left:
        opposite = this.Right;
        break;
      case this.Right:
        opposite = this.Left;
        break;
      case this.Down:
        opposite = this.Up;
        break;
      case this.Up:
        opposite = this.Down;
    }
    return opposite
  },
};
