import { getSimon, Direction } from "./simonSays.js";
import { getOrientationSensor } from "./sensors.js";

function handleDirection(direction) {
  console.log(direction);
  this.activate(direction);
}

$(document).ready(function () {
  let simon = getSimon();

  let directionHandler = handleDirection.bind(simon);
  let orientationSensor = getOrientationSensor(directionHandler);
  $("#getPermision").click(function () {
    orientationSensor.start();
  });
});
