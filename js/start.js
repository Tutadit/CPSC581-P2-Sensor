import { getSimon, Direction } from "./simonSays.js"
import { startSensor } from "./sensors.js"

$(document).ready(function () {
   let simon = getSimon()

   if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      console.log("here")
      DeviceMotionEvent.requestPermission();
    }

   startSensor()
   simon.activate(Direction.Left)
});