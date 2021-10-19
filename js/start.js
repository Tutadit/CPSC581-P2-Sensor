import { getSimon, Direction } from "./simonSays.js";

function handleOrientation(event) {
  console.log("yes");
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

function startSensor() {
  // Request permission for iOS 13+ devices
  
}

$(document).ready(function () {
  let simon = getSimon();
  \if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    console.log("here");
    DeviceMotionEvent.requestPermission();
  }
  window.addEventListener("deviceorientation", handleOrientation);
  simon.activate(Direction.Left);
});
