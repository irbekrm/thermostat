(function(exports) {
  function Thermostat() {
    this.MINIMUM = 10;
    this.MAX_PS = 25;
    this.MAX = 32;
    this.DEFAULT = 20;
    this.temperature = 20;
    this.powerSaving = true;
  };

Thermostat.prototype.getTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.up = function() {
  if(!this.isMaximum()) { this.temperature += 1 }
  return this;
};

Thermostat.prototype.down = function() {
  if (!this.isMinimum()) { this.temperature -= 1; }
  return this;
};

Thermostat.prototype.isMinimum = function() {
  return this.getTemperature() <= this.MINIMUM;
};

Thermostat.prototype.isPowerSaving = function() {
  return this.powerSaving;
};

Thermostat.prototype.togglePowerSaving = function() {
  this.powerSaving = !this.powerSaving;
  this.adjustTemperature();
  return this;
}

Thermostat.prototype.isMaximum = function() {
  return this.isPowerSaving() ? this.getTemperature() >= this.MAX_PS : this.getTemperature() >= this.MAX;
}

Thermostat.prototype.reset = function() {
  this.temperature = this.DEFAULT;
  return this;
};

Thermostat.prototype.describe = function() {
  let t = this.getTemperature();
  return t < 18 ? 'low-usage' : t > this.MAX_PS ? 'high-usage' : 'medium-usage';
};

Thermostat.prototype.adjustTemperature = function() {
  this.powerSaving && this.temperature > 25 && (this.temperature = 25);
}

exports.Thermostat = Thermostat;
})(this);

