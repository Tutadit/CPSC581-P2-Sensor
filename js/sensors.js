import { Direction } from "./utiltities.js"

class OrientationSensor {
  constructor(hanldeDirection) {
    this.handleDirection = hanldeDirection;
    this.initial_orientation = {
      alpha: 0,
      gamma: 0,
      beta: 0,
    };
    this.sensitivity = 5;
  }

  reset_orientation(new_orientation) {
    this.initial_orientation = {
      alpha: new_orientation.alpha,
      beta: new_orientation.beta,
      gamma: new_orientation.gamma,
    };
    this.reset = false;
  }

  handleOrientation(event) {
    if (this.reset) {
      this.reset_orientation();
    }

    if (this.initial_orientation.gamma + this.sensitivity <= event.gamma) {
      this.handleDirection(Direction.Right);
      reset_orientation();
      return;
    }

    if (this.initial_orientation.gamma - this.sensitivity >= event.gamma) {
      this.handleDirection(Direction.Left);
      reset_orientation();
      return;
    }

    if (this.initial_orientation.beta + this.sensitivity <= event.beta) {
      this.handleDirection(Direction.Down);
      reset_orientation();
      return;
    }
  }

  start() {
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    )
      DeviceMotionEvent.requestPermission();
    this.reset = true;
    this.orientationHandler = this.handleOrientation.bind(this);
    window.addEventListener("deviceorientation", this.orientationHandler);
  }

  stop() {
    window.removeEventListener("deviceorientation", this.orientationHandler);
  }
}

export function getOrientationSensor(handleDirection) {
  return new OrientationSensor(handleDirection);
}
