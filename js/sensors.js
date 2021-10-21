import { Direction } from "./utiltities.js";

class OrientationSensor {
  constructor(handleDirection, sensitivity) {
    this.handleIPhonePermission();
    this.handleDirection = handleDirection;
    this.initial_orientation = {
      gamma: 0,
      beta: 0,
    };
    this.sensitivity = sensitivity;
  }

  handleIPhonePermission() {
    if (
      !DeviceMotionEvent ||
      !typeof DeviceMotionEvent.requestPermission === "function"
    )
      return;

    $("<button id='getPermision'>Tap to grant permision</button>").appendTo(
      document.body
    );

    $("#getPermision").click(function () {
      if (!$(this).hasClass("hidden")) {
        $(this).addClass("hidden");
        DeviceMotionEvent.requestPermission();
      }
    });
  }

  reset_orientation(new_orientation) {
    this.initial_orientation = {
      alpha: new_orientation.alpha,
      beta: new_orientation.beta,
      gamma: new_orientation.gamma,
    };
    this.reset = false;
  }

  setSensitivity(new_sensitivity) {
    this.sensitivity = new_sensitivity;
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
    this.reset = true;
    this.orientationHandler = this.handleOrientation.bind(this);
    console.log("There")
    window.addEventListener("deviceorientation", this.orientationHandler);
  }

  stop() {
    window.removeEventListener("deviceorientation", this.orientationHandler);
  }
}

export function getOrientationSensor(handleDirection, orientationSensitivity) {
  return new OrientationSensor(handleDirection, orientationSensitivity);
}
