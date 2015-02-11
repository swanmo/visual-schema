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

  function asText(_no) {
    switch(_no) {
        case 1:
            return 'One';
        case 2:
            return 'Two';
        case 3:
            return 'Three';
        case 4:
            return 'Four';
        case 5:
            return 'Five';
        case 6:
            return 'Six';
        case 7:
            return 'Seven';
        case 8:
            return 'Eight';
        case 9:
            return 'Nine';
        case 10:
            return 'Ten';
        default:
            return _no;
    }
  }

	return {
		month: function(_date) {
			return nameOfMonth(_date.getUTCMonth());
		},
		since: function (_date, now) {
			now = now || new Date();
			

      var seconds = Math.floor((now - _date) / 1000);
      var interval = Math.floor(seconds / 31536000);
      // console.log('since', seconds, Math.floor(seconds / 86400));
      
      if (interval === 1) {
        return "A year ago";
      } else if (interval > 1) {
        return asText(interval) + " years ago";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval === 1) {
        return "A month ago";
      } else if (interval > 1) {
        return asText(interval) + " months ago";
      }
      interval = Math.floor(seconds / 86400);
      if (interval === 1) {
        return "A day ago";
      } else if (interval > 6 && interval < 9) {
        return "A week ago";
      } else if (interval > 13 && interval < 17) {
        return "Two weeks ago";
      } else if (interval > 20 && interval < 23) {
        return "Three weeks ago";
      } else if (interval > 1) {
        return asText(interval) + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval === 1) {
        return "An hour ago";
      } else if (interval > 1) {
        return asText(interval) + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval === 1) {
        return "A minute ago";
      } else if (interval > 1) {
        return asText(interval) + " minutes ago";
      }
      interval = Math.floor(seconds);
      if (interval < 5) {
        return 'A second ago';
      } else if (interval < 30) {
        return 'A few seconds ago';
      } else {
        return interval + ' seconds';
      }
		}
	};
});