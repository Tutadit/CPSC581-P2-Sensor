// Request permission for iOS 13+ devices

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
}

export function getOrientationSensor(handleDirection) {
  return new OrientationSensor(handleDirection);
}

function handleOrientation(event) {
    console.log("yes")
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

export function startSensor() {
    console.log(handleOrientation)
  window.addEventListener("deviceorientation", handleOrientation, false);
  console.log(window);
}

function stopSensor() {
  window.removeEventListener("deviceorientation", handleOrientation, false);
}
