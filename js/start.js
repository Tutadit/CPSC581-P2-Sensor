import { getSimon, Direction } from "./simonSays.js";
import { getOrientationSensor } from "./sensors.js"




$(document).ready(function () {
  let simon = getSimon();
  function handleDirection(direction) {
    console.log(direction)
    this.activate(direction)
  }
  let directionHandler = handleDirection.bind(simon)
  let orientationSensor = getOrientationSensor(directionHandler);
  $("#getPermision").click(function () {
      orientationSensor.start()
  });  
});
