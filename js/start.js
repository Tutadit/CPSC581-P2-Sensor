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

function handleMotion(event) {
  console.log(event)
}

function startSensor() {
  // Request permission for iOS 13+ devices
  
}

$(document).ready(function () {
  let simon = getSimon();
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    console.log("here");
    DeviceMotionEvent.requestPermission();
  }
  window.removeEventListener("devicemotion", handleMotion);
  window.addEventListener("deviceorientation", handleOrientation);
  simon.activate(Direction.Left);
});
