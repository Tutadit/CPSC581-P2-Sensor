export const Direction = {
  Left: "left",
  Right: "right",
  Down: "down",
  Up: "up",
  opposite: function (direction) {
    let opposite = null;
    switch (direction) {
      case Direction.Left:
        opposite = Direction.Right;
        break;
      case Direction.Right:
        opposite = Direction.Left;
        break;
      case Direction.Down:
        opposite = Direction.Up;
        break;
      case Direction.Up:
        opposite = Direction.Down;
    }
    return opposite
  },
};
