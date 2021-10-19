export const Direction = {
  Left: "left",
  Right: "right",
  Down: "down",
  Up: "up",
  oposite: function (direction) {
    let oposite = null;
    switch (direction) {
      case Direction.Left:
        oposite = Direction.Right;
        break;
      case Direction.Right:
        oposite = Direction.Left;
        break;
      case Direction.Down:
        oposite = Direction.Up;
        break;
      case Direction.Up:
        oposite = Direction.Down;
    }
    return opposite
  },
};
