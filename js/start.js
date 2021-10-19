import { getSimon } from "./simonSays.js";
import { getOrientationSensor } from "./sensors.js";
import { Direction } from "./utiltities.js";

function handleDirection(direction) {
  let currentActive = this.getActive();
  if (currentActive === Direction.oposite(direction)) {
    this.deactivate();
    return;
  }

  this.activate(direction);
}

$(document).ready(function () {
  let simon = getSimon();

  let directionHandler = handleDirection.bind(simon);
  let orientationSensitivity = 10;
  let orientationSensor = getOrientationSensor(
    directionHandler,
    orientationSensitivity
  );
  $("#getPermision").click(function () {
    if (!$(this).hasClass("hidden")) {
      orientationSensor.start();
      $(this).addClass("hidden");
    }
  });
});
