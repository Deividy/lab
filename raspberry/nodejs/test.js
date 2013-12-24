var gpio = require('gpio');

var gpio24 = gpio.export(24, {
    direction: 'out',
	ready: function () {
		gpio24.set(1, function (err, res) {
			console.log(err);
			console.log(res);

            while (true) { }
		});
	}
});
