import { getSimon } from "./simonSays.js";
import { Direction } from "./utiltities.js";

function handleIPhonePermission(callback) {
  if (
    !DeviceMotionEvent ||
    typeof DeviceMotionEvent.requestPermission !== "function"
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



$(document).ready(function () {
  let simon = getSimon();
  function time(){
    let today = new Date();
    var time = today.getHours() + ":" + today.getMinutes()
    $(".clock").text(time);
  }
  setInterval(time, 1000);
  handleIPhonePermission(
    function () {
      this.start();
    }.bind(simon)
  );
});
