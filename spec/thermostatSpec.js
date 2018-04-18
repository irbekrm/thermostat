describe("Thermostat", function() {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getTemperature()).toEqual(20);
  })

  describe('changing temperature', function() {
		it('increases the temperature by 1 when turned "up"', function() {
			expect(thermostat.up().getTemperature()).toEqual(21);
		});

		it('decreases the temperature by 1 when turned "down"', function() {
			expect(thermostat.down().getTemperature()).toEqual(19);
		});

		it('has a minimum temperture of 10', function() {
			for(let i=0; i<10; i++) { thermostat.down(); }
			expect(thermostat.down().getTemperature()).toEqual(10);
		});

		it('is saving power by default', function() {
			expect(thermostat.isPowerSaving()).toBe(true);
		});

		it('allows to toggle off the power saving mode', function() {
			expect(thermostat.togglePowerSaving().isPowerSaving()).toBe(false);
		});
		
		it('allows to toggle on the power saving mode', function() {
			expect(thermostat.togglePowerSaving().togglePowerSaving().isPowerSaving()).toBe(true);
		});

		it('has a maximum temperature of 25 degrees in power saving mode', function() {
			for(let i=0; i<5; i++) { thermostat.up(); }
			expect(thermostat.up().getTemperature()).toEqual(25);
		});

		it('has a maximum temperature of 32 degrees when not in power saving mode', function() {
			thermostat.togglePowerSaving();
			for(let i=0; i<12;i++) { thermostat.up(); }
			expect(thermostat.up().getTemperature()).toEqual(32);
		});

		it('can be reset to the default temperture', function() {
			for(let i=0; i<5; i++) { thermostat.up(); }
			expect(thermostat.reset().getTemperature()).toEqual(20);
		});
  
  });
  describe('describe the temperature', function() {
		it('describes temperature below 18 degrees as "low-usage"', function() {
			for(let i=0; i<4; i++) { thermostat.down(); }
			expect(thermostat.describe()).toEqual('low-usage');
		});

		it('describes temperature above 25 degrees as "high-usage"', function() {
			thermostat.togglePowerSaving();
			for(let i=0; i<6; i++) { thermostat.up(); }
			expect(thermostat.describe()).toEqual('high-usage');
		});

		it('describes temperature between 18 and 25 degrees as "medium-usage"', function() {
			expect(thermostat.describe()).toEqual('medium-usage');
		});
	});
});
