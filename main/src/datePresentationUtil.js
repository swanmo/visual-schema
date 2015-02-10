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
		since: function (_date, now) {
			now = now || new Date();
			

      var seconds = Math.floor((now - _date) / 1000);
      var interval = Math.floor(seconds / 31536000);
      console.log('since', seconds);


      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval === 1) {
        return "a day";
      } else if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval === 1) {
        return "en timme";
      } else if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval === 1) {
        return "a minute";
      } else if (interval > 1) {
        return interval + " minutes";
      }
      interval = Math.floor(seconds);
      if (interval < 5) {
        return 'a second ago';
      } else if (interval < 30) {
        return 'a few seconds ago';
      } else {
        return interval + ' seconds';
      }
		}
	};
});

/*
      this.timeSince = function(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
          return interval + " år";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + " månader";
        }
        interval = Math.floor(seconds / 86400);
        if (interval === 1) {
          return "en dag";
        } else if (interval > 1) {
          return interval + " dagar";
        }
        interval = Math.floor(seconds / 3600);
        if (interval === 1) {
          return "en timme";
        } else if (interval > 1) {
          return interval + " timmar";
        }
        interval = Math.floor(seconds / 60);
        if (interval === 1) {
          return "en minut";
        } else if (interval > 1) {
          return interval + " minuter";
        }
        interval = Math.floor(seconds);
        if (interval === 1) {
          return "en sekund";
        } else if (interval === 0) {
          return null;
        } else {
          return interval + " sekunder";
		    }
*/