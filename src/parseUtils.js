define(function() {
	return {
		parsePrefix: function(name) {
			var i = name.indexOf(':');
			if (i >= 0) {
				return name.substring(0, i);
			} else {
				return '';
			}
		},
		parseName: function(name) {
			var i = name.indexOf(':');
			if (i >= 0) {
				return name.substring(i + 1);
			} else {
				return name;
			}
		}
	}
})