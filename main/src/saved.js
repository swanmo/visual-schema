define(['jquery', 'store', 'datePresentationUtil'], function($, store, datePresentationUtil) {
	var baseAttachment = $('#s');

	function sortByAge(items) {
		items.sort(function(a, b){
			var dA = new Date(a.value.accessed);
			var dB = new Date(b.value.accessed);
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
		console.log('a', items);
		sortByAge(items);
		console.log('b', items);
		if (items && items.length > 0) {
			console.log('rendering a few');
			$('#no').html(items.length);
			$('#saved-items').removeClass('no-items');
		} else {
			console.log('rendering none');
			$('#saved-items').addClass('no-items');
		}
		var firstItem = undefined;
		for (var p = 0; p < items.length; p++) {
			if (!firstItem) {
				firstItem = items[p];
			}
			create(items[p].value).appendTo(baseAttachment);
		}

		whenDoneCallee.call(this, firstItem.value.xsdData);
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

		store.updateTitle($input.attr('data-id'), $input.val());
	}

	function op() {
		var $input = $(this);
		var $root = $(this).parent().parent().parent();
		$root.addClass('reveal')
		$('#s').prepend($root);
		$root.removeClass('reveal');
		store.findAndUpdate($input.attr('data-id'),
			function (storedData) {
				$('#xsdContent').val(storedData.xsdData);
			}, 'me'
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

	function whenChanged(action, item) {

		if (action === 'created') {
			showBaseAttachment();
			create(item).prependTo(baseAttachment);
		} else if (action === 'deleted') {
			baseAttachment.empty();
			store.findAll(renderAll);
		}
	}

	function initAll() {
		store.findAll(renderAll);
		store.subscribe(whenChanged);
	}
	var whenDoneCallee;
	return {
		setup: function(callee) {
			whenDoneCallee = callee;
			setTimeout(initAll, 800);
		}
	};
});
