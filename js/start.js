import { getSimon, Direction } from "./simonSays.js";
import { getOrientationSensor } from "./sensors.js"




$(document).ready(function () {
  let simon = getSimon();
  function handleDirection(direction) {
    simon.activate(direction)
  }
  let orientationSensor = getOrientationSensor(handleDirection);
  $("#getPermision").click(function () {
      orientationSensor.start()
  });  
});
