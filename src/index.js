$(document).ready(function() {
  let thermostat = new Thermostat();
  let x = thermostat.describe();
  
  showTemperature();
  displayPS();
  requestData();

  
  
  $("#increase").on("click", increase);
  $("#decrease").on("click", decrease);
  $("#reset").on("click", reset);
  $("#togglePS").on("click", togglePS);

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

  function requestData() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = showWeather;
    xmlhttp.open('GET',"http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=e69c1c89d6504818fca4b0e0afa494c1&q=London&units=metric");
    xmlhttp.send();
  }

  function showWeather() {
    if(xmlhttp.readyState == XMLHttpRequest.DONE) {
      let text = xmlhttp.responseText;
      jsonText = JSON.parse(text);
      for(let i in jsonText) { console.log(i); }
      console.log("Main is ", jsonText['main']['temp']);
    }
  }
});


