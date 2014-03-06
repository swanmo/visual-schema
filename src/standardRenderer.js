define(['jquery'], function($) {
	var arrOfColors = ["#efefef", "#e7e7e7", "#dfdfdf", "#d7d7d7", "#d0d0d0", "#c7c7c7"];
	var colorPos = 0;
	return {
		render: function(roots) {
			var rootElem = $('<div>');
			rootElem.addClass('xsd');

			for(var i = 0; i < roots.length; i++) {
				this.renderElem(roots[i], rootElem);
			}
			return rootElem;
		},
		markupForNode: function(entry, parent) {
			var entries = [];
			
			var $childContainer;
			if (entry.name=="complexType") {
				$childContainer = $('<div>').addClass('xsd');
				$childContainer.appendTo(parent);
				var $div1 = $('<div>');
				$div1.append($('<span>').text(entry.attrs.name + ' (complexType)'));
				$div1.appendTo($childContainer);
			} else if (entry.name=="element") {
				var $div1 = $('<div>').text('E ' + entry.attrs.name).addClass('optional');
				// $div1.append($('<span>'));
				$div1.appendTo(parent);
			} else if (entry.name=="sequence") {
				

				var $div1 = $('<div>').text('...').css('display', 'inline-block');
				$div1.appendTo(parent);

				$childContainer = $('<div>').addClass('marker').css('display', 'inline-block');
				$childContainer.appendTo(parent);

			} else {
				var $div1 = $('<div>').text(entry.name);
				// $div1.append($('<span>'));
				$div1.appendTo(parent);				
			}

			/*else if (entry.name=="element") {
				var $div = $('<div>');
				$div.append($('<span>').text(entry.attrs.name + " (" + entry.attrs.type + ")"));
				entries.push($div);
			} else if (entry.name=="sequence") {
				var $div = $('<div>');
				$div.text('...'));
				entries.push($div);
			} else if (entry.name=="complexContent") {
				var $div1 = $('<div>');
				$div1.append($('<span>').text('CC'));
				entries.push($div1);
			} else if (entry.name=="extension") {
				listEntry.addClass("eSequence");
				listEntry.append($('<span title="extension">').text("X").addClass("icon"));
			}*/

			return $childContainer;
		},
		renderElem: function(entry, domParent) {
			// ToDo

			var container = this.markupForNode(entry, domParent);
			if (!container) {
				container = domParent;
			}

			if (entry.children && entry.children.length > 0) {
				for(var i = 0; i < entry.children.length; i++) {
					this.renderElem(entry.children[i], container);
				}

			} 
		}
	};
});