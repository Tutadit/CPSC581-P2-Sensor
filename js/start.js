import { getSimon } from "./simonSays.js";
import { getOrientationSensor } from "./sensors.js";

function handleDirection(direction) {
  if (this.isActive()) {
    this.deactivate()
    return;
  }

  this.activate(direction);
}

$(document).ready(function () {
  let simon = getSimon();

  let directionHandler = handleDirection.bind(simon);
  let orientationSensitivity = 10;
  let orientationSensor = getOrientationSensor(directionHandler, orientationSensitivity);
  $("#getPermision").click(function () {
    orientationSensor.start();
  });
});
