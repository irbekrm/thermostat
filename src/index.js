let thermostat = new Thermostat();
let x = thermostat.describe();

window.onload = function() {
  showTemperature();
  displayPS();
}
$("#increase").on("click", increase);
$("#decrease").on("click", decrease);
$("#reset").on("click", reset);
$("#togglePS").on("click", togglePS);

function reset() {
  thermostat.reset();
  showUsage();
  showTemperature();
}

function increase() {
  thermostat.up();
  showUsage();
  showTemperature();
}

function decrease() {
  thermostat.down();
  showUsage();
  showTemperature();
}

function showTemperature() {
  $('#temp').html(thermostat.temperature);
}

function showUsage() {
  let t = thermostat.describe();
  let color = t == 'low-usage' ? 'yellow' : t == 'medium-usage' ? 'green' : 'red';
  changeColor(color);
}

function changeColor(color) {
  let square = $("#temp");
  square.css("background-color", color);
}
function displayPS() {
  let value = thermostat.powerSaving ? "ON" : "OFF";
  $("#showPS").html(value);
}
function togglePS() {
  thermostat.togglePowerSaving();
  displayPS();
  showTemperature();
  showUsage();
}
