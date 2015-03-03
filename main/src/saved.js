define(['jquery', 'store', 'datePresentationUtil'], function($, store, datePresentationUtil) {
	var baseAttachment = $('#s');

	function sortByAge(items) {
		items.sort(function(a, b){
			var dA = new Date(a.value.saved);
			var dB = new Date(b.value.saved);
			return dB.getTime() - dA.getTime();
		});
	}

	function showBaseAttachment() {
		var o = $('#saved-items');
		if (o.hasClass('no-items')) {
			$('#no').html('1');	
		}
		$('#saved-items').removeClass('no-items');
		
	}

	function renderAll(items) {
		sortByAge(items);
		if (items && items.length > 0) {
			console.log('rendering a few');
			$('#no').html(items.length);
			$('#saved-items').removeClass('no-items');
		} else {
			console.log('rendering none');
			$('#saved-items').addClass('no-items');
		}

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

	function op() {
		var $input = $(this);

		store.find($input.attr('data-id'),
			function (storedData) {
				$('#xsdContent').val(storedData.xsdData);
			}
		);
	}

	function del() {
		var $input = $(this);

		store.delete($input.attr('data-id'),
			function () {
				console.log('delete done');
			}
		);
	}

	function createElem(day, month, title, age, id) {
		return $('<div>').addClass('w').append(
			$('<div>').addClass('l1').
				append(
					$('<input type="text" value="' + title + '" data-id="' + id + '"/>').on('change', nameChanged)
				).append(
					$('<span class="icon-bin" data-id="' + id + '"></span>').on('click', del)
				)
		).append(
			$('<div class="l2" title="' + month + ', ' + day + '"></div>')
				.append(
					$('<span class="a">' + age + '</span>')
				).append(
					$('<span class="o"></span>')
						.append($('<a href="#" data-id="' + id + '">Open</a>').on('click', op))
				)

			);
	}

	function createElemOld(day, month, title, age, id) {
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
		console.log('whenChanged', action, item);
		if (action === 'created') {
			console.log('whenChanged created');
			showBaseAttachment();
			create(item).prependTo(baseAttachment);
		} else if (action === 'deleted') {
			console.log('deleted notified!!!!');
			baseAttachment.empty();
			store.findAll(renderAll);
		}
	}

	function initAll() {
		store.findAll(renderAll);
		store.subscribe(whenChanged);
	}

	return {
		setup: function() {
			initAll();
		}
	};
});
