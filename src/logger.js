define(function() {
	return {
		messages:[],
		info:function(msg) {
			this.messages.push({level:'INFO', message:msg});
		},
		error:function(msg) {
			this.messages.push({level:'ERROR', message:msg});
		}

	}


});