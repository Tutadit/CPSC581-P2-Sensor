import { getSimon } from "./simonSays.js";
import { getOrientationSensor } from "./sensors.js";
import { Direction } from "./utiltities.js";


const sensitivity_to_active = 17;
const sensitivity_from_active = 6;

function handleDirection(direction, orientationSensor) {
  let currentActive = this.getActive();
  if (currentActive) {
    if (currentActive === Direction.opposite(direction)) {
      this.deactivate();      
      orientationSensor.setSensitivity(sensitivity_to_active)
    } else {
      this.wrongPattern()
    }
    return;
  }

  this.activate(direction);
  orientationSensor.setSensitivity(sensitivity_from_active)
}

$(document).ready(function () {
  let simon = getSimon();
  let directionHandler = handleDirection.bind(simon);
  let orientationSensor = getOrientationSensor(
    directionHandler,
    sensitivity_to_active
  );

  simon.playPattern();
  
  $("#getPermision").click(function () {
    if (!$(this).hasClass("hidden")) {
      orientationSensor.start();
      $(this).addClass("hidden");
    } else {
      simon.playPattern()
    }
  });
});
