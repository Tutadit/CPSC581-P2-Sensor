import { Direction } from "./simonSays.js";

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

  handleOrientation(event) {
    if (this.reset) {
      this.initial_orientation = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      };
      $("#initial").text(
        "Alpha:" +
          Math.round(event.alpha) +
          "\n" +
          "Beta:" +
          Math.round(event.beta) +
          "\n" +
          "Gamma:" +
          Math.round(event.gamma)
      );
      this.reset = false;
    }

    $("#current").text(
      "Alpha:" +
        Math.round(event.alpha) +
        "\n" +
        "Beta:" +
        Math.round(event.beta) +
        "\n" +
        "Gamma:" +
        Math.round(event.gamma)
    );

    if ( this.initial.gamma + this.sensitivity <= event.gamma) {
      this.handleDirection(Direction.Left)
      return
    }

    if ( this.initial.gamma - this.sensitivity >= event.gamma) {
      this.handleDirection(Direction.Right)
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
