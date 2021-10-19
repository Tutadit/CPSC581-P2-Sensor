class OrientationSensor {
  constructor(hanldeDirection) {
    this.handleDirection = hanldeDirection;
    this.initial_orientation = {
      alpha: 0,
      gamma: 0,
      beta: 0,
    };
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
          event.alpha +
          "\n" +
          "Beta:" +
          event.beta +
          "\n" +
          "Gamma:" +
          event.gamma
      );
      this.reset = false;
    }

    $("#current").text(
      "Alpha:" +
        event.alpha +
        "\n" +
        "Beta:" +
        event.beta +
        "\n" +
        "Gamma:" +
        event.gamma
    );
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
