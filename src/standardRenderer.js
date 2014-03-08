define(['jquery'], function($) {
	var arrOfColors = ["#efefef", "#e7e7e7", "#dfdfdf", "#d7d7d7", "#d0d0d0", "#c7c7c7"];
	var colorPos = 0;
	return {
		render: function(roots) {
			var rootElem = $('<div>');
			rootElem.addClass('hasBranch');

			for(var i = 0; i < roots.length; i++) {
				this.renderElem(roots[i], rootElem);
			}
			return rootElem;
		},
		markupForNode: function(entry, parent) {
			var entries = [];
			var hasBranching = (entry.children && entry.children.length > 1);
			
			var $childContainer;
			
				var desc;
				if (entry.name=="element") {
					desc = "E " + entry.attrs.name;
				} else {
					if (entry.attrs.name) {
						desc = entry.attrs.name + ' (' + entry.name + ')';
					} else {
						desc = entry.name;
					}

				}


				$childContainer = $('<div>');

				var $div1 = $('<div>');
				var $span = $('<span>');
				$div1.append($span);
				$div1.append($childContainer);
				if (hasBranching) {
					$span.text(desc + ":");
					$childContainer.addClass('hasBranch');
				} else {
					$span.text(desc);
				}
			
				$div1.appendTo(parent);
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