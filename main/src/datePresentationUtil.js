define([], function() {
	var mothNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	
	function nameOfMonth(monthIndex) {
		return mothNames[monthIndex];
	}

	function approx(_date) {
		var now = new Date();
	}

	return {
		month: function(_date) {
			return nameOfMonth(_date.getUTCMonth());
		},
		since: function (_date) {
			console.dir(_date);
			// console.log('since', date);
			return 'a while ago';
		}
	};
});
