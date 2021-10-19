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

$(document).ready(function () {
  let simon = getSimon();

  $("#getPermision").click(function () {
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      console.log("here");
      DeviceMotionEvent.requestPermission();
    }
    window.addEventListener("deviceorientation", handleOrientation);
  });
  simon.activate(Direction.Left);
});
