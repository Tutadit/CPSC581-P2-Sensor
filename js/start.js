import { getSimon } from "./simonSays.js";
import { Direction } from "./utiltities.js";


var time = new Date();
time.getHours();
time.getMinutes();
time.getSeconds();

$(document).ready(function () {
  let simon = getSimon(); 
  simon.start(); 
});

