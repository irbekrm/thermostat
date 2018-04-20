$(document).ready(function() {
  let thermostat = new Thermostat();
  let weatherReader = new WeatherReader();
  
  showTemperature();
  displayPS();
  getAndSetTemperature('Riga');
  
  $("#increase").on("click", increase);
  $("#decrease").on("click", decrease);
  $("#reset").on("click", reset);
  $("#togglePS").on("click", togglePS);
  $("#tempSelector").on("submit", updateCityTemperature);

  async function updateCityTemperature(event) {
    event.preventDefault();
    let name = $("#cityName").val();
    await getAndSetTemperature(name);
    event.preventDefault();
  }
  
  async function getAndSetTemperature(name) {
    let temp = await weatherReader.updateData(name);
    let description = `Temperature in ${name} is ${temp} degrees by Celsius`;
    $('#tempDisplay').html(description);
  }
    

  function reset() {
    thermostat.reset();
    updateDisplay();
  }

  function increase() {
    thermostat.up();
    updateDisplay();
  }

  function decrease() {
    thermostat.down();
    updateDisplay();
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
    $("#temp").css("background-color", color);
  }
  function displayPS() {
    let value = thermostat.powerSaving ? "ON" : "OFF";
    $("#showPS").html(value);
  }
  function togglePS() {
    thermostat.togglePowerSaving();
    displayPS();
    updateDisplay();
  }
  function updateDisplay() {
    showUsage();
    showTemperature();
  }
});
