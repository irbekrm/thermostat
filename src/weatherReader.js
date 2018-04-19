(function(exports) {
  function WeatherReader() {
    this.temperature = '';
    this.city = 'Alaska';
  };

WeatherReader.prototype.setCity = function(city) {
  this.city = city
}

WeatherReader.prototype
WeatherReader.prototype._setTemperature = function() {
  if(xmlhttp.readyState == XMLHttpRequest.DONE) {
    let data = JSON.parse(xmlhttp.responseText);
    self.temperature = data['main']['temp']; 
  };
}

WeatherReader.prototype.requestData = function() {
  self = this;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = this._setTemperature;
  let url = `http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=e69c1c89d6504818fca4b0e0afa494c1&q=${this.city}&units=metric`;
  xmlhttp.open('GET', url);
  xmlhttp.send();
}

WeatherReader.prototype.test = function() {
  var json = $.getJSON({'url': "./cities.json", 'async': false});
  json = JSON.parse(json.responseText);
  console.log(json);
}
exports.WeatherReader = WeatherReader;
})(this)
