define(['jquery', 'xsd', 'init', 'root', 'parser'], function($, xsd, init, $root, parser) {
	var lastValidation = 0;
	var closestTimeBetween = 1500;
	var validatonInProcess = false;
	var validatonTimer;
	var getFatalMessages = function(arrMessages) {
		return arrMessages.filter(function(item) {
			return item.level === 'F';
		});
	};
	var runValidation = function() {
		var messages;
		try {
			messages = parser.getValidationError($('#xsdContent').val());
		} catch(err) {
		    messages = [{
		    	message:'Invalid XSD document',
		    	level:'F'
		    }];
		}
		var $list = $('#validationList');
		$list.empty();

		if (messages) {
			var fatal = getFatalMessages(messages);
			var isLogFatal = false;
			if (fatal.length > 0) {
				messages = fatal;
				isLogFatal = true;
			}

			if (isLogFatal) {
				$('.x-messages').addClass('fatal');
			} else {
				$('.x-messages').removeClass('fatal');
			}
			$('.x-messages').removeClass('nomessages');
			
			$('#validationPrefix').text(messages.length);

			for (var i = 0; i < messages.length; i++) {
				var valMessage = $('<li></li>').text(messages[i].message);
				$list.append(valMessage);
			}
		} else {
			$('.x-messages').addClass('nomessages');
		}
	};

	var triggerValidation = function() {
		var now = (new Date()).getTime();
		var sinceLastRun = (now - lastValidation);

		if (sinceLastRun < closestTimeBetween) {
			if(!validatonTimer) {
				validatonTimer = setTimeout(triggerValidation, ((closestTimeBetween - sinceLastRun) + 100));
			}
			return;
		}
		if (validatonInProcess) {
			if(!validatonTimer) {
				validatonTimer = setTimeout(triggerValidation, closestTimeBetween);
			}
			return;
		}
		if (validatonTimer) {
			clearTimeout(validatonTimer);
			validatonTimer = undefined;
		}
		validatonInProcess = true;
		runValidation();
		lastValidation = now;
		validatonInProcess = false;
	};

	return {
		setupValidation:function() {
			$('#xsdContent').keyup(function() {
				
				triggerValidation();
			});
		},
		setup:function() {
			this.setupValidation();
			init.setDefaults();

			$('#showXsd').on('click', function() {

				$('#headRow').addClass('closed').removeClass('semi-open');


				$('#inputRow').slideUp(function() {
					$('#leftie').slideToggle('fast');
				});

				$(this).hide();

				$root.show();
				xsd.show($('#xsdContent').val());
			});
			var timer = null;
			var killMessages = function() {
				$('#footer .x-messages').removeClass('act');
				d.html(d.html() + 'k');
			};

			var suppressShow = false;
			var unsuppress = function() {
				suppressShow = false;
			};
			var killHard = function() {
				suppressShow = true;
				setTimeout(unsuppress, 700);
				killMessages();
			};

			var d = $('#debug');
			$('#iller').on('click', killHard);

			$('#footer .x-messages').on('mouseover', function() {
				if (suppressShow) {
					return;
				}
				clearTimeout(timer);
				$(this).addClass('act');
				d.html(d.html() + 'o');
			}).on('mouseout', function() {
				if (suppressShow) {
					return;
				}
				d.html(d.html() + '.');
				clearTimeout(timer);
				timer = setTimeout(killMessages, 2000);
			});

			$('#undo').on('click', function() {
				$root.hide();
				$('#leftie').slideToggle('fast');
				$('#headRow').addClass('semi-open').removeClass('closed');
				$('#inputRow').slideDown(resizeBox);
				$('#showXsd').show();
			});

			var resizeBox = function() {
				var proposedHeight = $(window).height() - 250;
				if ($('#headRow').hasClass('semi-open')) {
					proposedHeight += 60;
				}

				if (proposedHeight < 250) {
					proposedHeight = 250;
				}
			  	$('#xsdContent').height(proposedHeight);
			};
			resizeBox();
			$(window).resize(resizeBox);
		}
	};
});
