(function(exports) {
  function WeatherReader() {
    this.cityId = '';
  };

WeatherReader.prototype._getCityId = function(name) {
  return new Promise((resolve, reject) => {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == XMLHttpRequest.DONE) {
        return resolve(xhttp.response);
      }
    }
    let url = 'https://raw.githubusercontent.com/irbekrm/thermostat/master/cities.json';
    xhttp.open('GET', url);
    xhttp.send();
  });
}
WeatherReader.prototype.updateData = async function(name) {
  let cityJson = await this._getCityId(name);
  let cityData = JSON.parse(cityJson);
  let element = cityData.find(e => e['name'] == name);
  this.cityId = element['id'];
  let tempJson = await this._findTemperature();
  let tempData = JSON.parse(tempJson)
  return tempData['main']['temp']
}

WeatherReader.prototype._findTemperature = function() {
  return new Promise((resolve, reject) => {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState == XMLHttpRequest.DONE) {
        return resolve(xhttp.response);
      }
    }
  let url = `http://api.openweathermap.org/data/2.5/weather?id=${this.cityId}&APPID=e69c1c89d6504818fca4b0e0afa494c1&units=metric`;
  xhttp.open('GET', url);
  xhttp.send();
  });
}
exports.WeatherReader = WeatherReader;
})(this)
