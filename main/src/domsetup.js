define(['jquery', 'xsd', 'init', 'root', 'parser', 'store', 'saved'],
		function($, xsd, init, $root, parser, store, saved) {
	'use strict';
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
			saved.setup();
			
			$('#saveXsd').on('click', function() {
				console.log('save clicked!!!');

				store.addItem('Unnamed', $('#xsdContent').val(), 'me');

				store.findAll(function(items) {
					console.log('all', items);
				});
			});


			$('#optMenu').on('click', function() {
				hideMenu(100);
			});
			$('html').click(function() {
				hideMenu();
			});

			var hideMenu = function() {
				if (!$('#optMenu').hasClass('hidden')) {
					$('#optMenu').addClass('hidden');
				}
			};

			$('#showOptions').on('click', function(e) {
				e.stopPropagation();
				$('#optMenu').toggleClass('hidden');
			});
			$('#showXsd').on('click', function() {

				$('#headRow').addClass('closed').removeClass('semi-open');


				$('#inputRow').slideUp(function() {
					$('#leftie').slideToggle('fast');
				});

				$(this).hide();
				$('#showOptions').hide();

				$root.show();
				xsd.show($('#xsdContent').val());
			});
			var timer = null;
			var killMessages = function() {
				$('#footer .x-messages').removeClass('act');
			};

			var killHard = function() {
				$('#aMsg').addClass('nomessages');
			};

			$('#iller').on('click', killHard);

			$('#footer .x-messages').on('mouseover', function() {
				
				clearTimeout(timer);
				$(this).addClass('act');
			}).on('mouseout', function() {
				clearTimeout(timer);
				timer = setTimeout(killMessages, 2000);
			});

			$('#undo').on('click', function() {
				$root.hide();
				$('#leftie').slideToggle('fast');
				$('#headRow').addClass('semi-open').removeClass('closed');
				$('#inputRow').slideDown(resizeBox);
				$('#showXsd').show();
				$('#showOptions').show();
			});

			var resizeBox = function() {
				var proposedHeight = $(window).height() - 200;
				if ($('#headRow').hasClass('semi-open')) {
					proposedHeight += 30;
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
