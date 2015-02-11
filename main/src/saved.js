define(['jquery', 'store', 'datePresentationUtil'], function($, store, datePresentationUtil) {
	var baseAttachment = $('#s');

	function renderAll(items) {
		for (var p = 0; p < items.length; p++) {
			create(items[p].value).appendTo(baseAttachment);
		}
	}

	function create(storedItem) {
		var d = new Date(storedItem.saved);

		return createElem(
			d.getUTCDate(),
			datePresentationUtil.month(d),
			storedItem.title,
			datePresentationUtil.since(d),
			storedItem.id);
	}

	function nameChanged() {
		var $input = $(this);
		console.log('nameChanged, id', $input.attr('data-id'));
		store.updateTitle($input.attr('data-id'), $input.val());
	}


	function createElem(day, month, title, age, id) {
		return $('<div>').addClass('line').append(
			$('<div>').addClass('cal').append(
				$('<span class="month">' + month + '</span>')
			).append(
				$('<span class="day">' + day + '</span>')
			)
		).append(
			$('<div>').addClass('head old unnamed').append(
				$('<span>').append(
					$('<input type="text" data-id="' + id + '" value="' + title + '">').on('change', nameChanged)
				)
			)
		).append(
			$('<div>').addClass('body').append(
				$('<span>' + age + '</span>'))
		);
	}

	function whenChanged(action, item) {
		if (action === 'new') {
			create(item).prependTo(baseAttachment);
		}
	}

	return {
		setup: function() {
			store.findAll(renderAll);
			store.subscribe(whenChanged);
		}
	};
});
