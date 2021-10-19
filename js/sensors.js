import { Direction } from "./utiltities.js";

class OrientationSensor {
  constructor(hanldeDirection, sensitivity) {
    this.handleDirection = hanldeDirection;
    this.initial_orientation = {
      alpha: 0,
      gamma: 0,
      beta: 0,
    };
    this.sensitivity = sensitivity;
  }

  reset_orientation(new_orientation) {
    this.initial_orientation = {
      alpha: new_orientation.alpha,
      beta: new_orientation.beta,
      gamma: new_orientation.gamma,
    };
    this.reset = false;
  }

  directionHandler(direction, orientation) {
    this.handleDirection(direction);
    this.reset_orientation(orientation);
  }

  handleOrientation(event) {
    if (this.reset) {
      this.reset_orientation(event);
    }

    if (this.initial_orientation.gamma + this.sensitivity <= event.gamma) {
      this.directionHandler(Direction.Right, event);
      return;
    }

    if (this.initial_orientation.gamma - this.sensitivity >= event.gamma) {
      this.directionHandler(Direction.Left, event);
      return;
    }

    if (this.initial_orientation.beta + this.sensitivity <= event.beta) {
      this.directionHandler(Direction.Down, event);
      return;
    }

    if (this.initial_orientation.beta - this.sensitivity >= event.beta) {
      this.directionHandler(Direction.Up, event);
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

export function getOrientationSensor(handleDirection, orientationSensitivity) {
  return new OrientationSensor(handleDirection, orientationSensitivity);
}
