define(['jquery', 'store', 'datePresentationUtil'], function($, store, datePresentationUtil) {
	var baseAttachment = $('#s');

	function renderAll(items) {
		for (var p = 0; p < items.length; p++) {
			append(items[p].value);
		}
	}

	function append(storedItem) {
		var d = new Date(storedItem.saved);

		render(
			d.getUTCDate(),
			datePresentationUtil.month(d),
			'unknown',
			datePresentationUtil.since(d));
	}

	/*
		<div class="line">
	        <div class="cal">
	            <span class="month">Feb</span>
	            <span class="day">22</span>
	        </div>
	        <div class="head old unnamed">
	            <span>Old version</span>
	        </div>
	        <div class="body">
	            <span>36 hours ago</span>
	        </div>
	    </div -->
	*/
	function render(day, month, title, age) {
		console.log('render', age);
		$('<div>').addClass('line').append(
			$('<div>').addClass('cal').append(
				$('<span class="month">' + month + '</span>')
			).append(
				$('<span class="day">' + day + '</span>')
			)
		).append(
			$('<div>').addClass('head old unnamed').append(
				$('<span>Old version</span>'))
		).append(
			$('<div>').addClass('body').append(
				$('<span>' + age + '</span>'))
		).appendTo(baseAttachment);
	}

	function whenChanged(action, item) {
		if (action === 'new') {
			append(item);
		}
	}

	return {
		setup: function() {
			store.findAll(renderAll);
			store.subscribe(whenChanged);
		}
	};
});
