import { getSimon, Direction } from "./simonSays.js";
import { getOrientationSensor } from "./sensors.js"


function handleDirection(direction) {
  simon.activate(direction)
}

$(document).ready(function () {
  let simon = getSimon();
  let orientationSensor = getOrientationSensor(handleDirection);
  $("#getPermision").click(function () {
      orientationSensor.start()
  });  
});
