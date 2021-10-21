import { getSimon } from "./simonSays.js";
import { Direction } from "./utiltities.js";

function handleIPhonePermission(callback) {
  if (
    !DeviceMotionEvent ||
    !typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    callback();
    return;
  }

  $("<button id='getPermision'>Tap to grant permision</button>").appendTo(
    document.body
  );

  $("#getPermision").click(function () {
    if (!$(this).hasClass("hidden")) {
      $(this).addClass("hidden");
      DeviceMotionEvent.requestPermission();
      callback();
    }
  });
}

var time = new Date();
time.getHours();
time.getMinutes();
time.getSeconds();

$(document).ready(function () {
  let simon = getSimon();
  handleIPhonePermission(
    function () {
      this.start();
    }.bind(simon)
  );
});
