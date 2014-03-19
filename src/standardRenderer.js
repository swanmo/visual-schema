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
		hasBranching: function(entry) {
			var kids = [];
			if (entry.children) {
				for (var i = 0; i < entry.children.length; i++) {
					kids.push(entry.children[i]);
				}
			}
			if (entry.attrs && entry.attrs.name == "delatgard") {
				console.log("asdfkj");
			}
			if (entry.linkedEntry) {
				kids.push(entry.linkedEntry);
			}
			return kids.length > 1;
		},
		markupForNode: function(entry, parent, hasBranching) {
			var entries = [];
			var addWrapperContainer = false;
			
			var $childContainer;
			var $div1 = $('<div>');

				var desc;
				var css;
				if (entry.name=="element") {
					desc = "<div class='e'>E</div> " + entry.attrs.name;
					css = "element";
					$div1.addClass("padded");
					if (entry.attrs.minOccurs == "0") {
						css += " optional";
					}
				} else if (entry.name=="sequence") {
					desc = "<div class='s' title='sequence'>...</div> ";
				} else if (entry.name=="complexContent") {
					return parent;
				} else if (entry.name=="extension") {
					desc = "<span class='ctBadge'>extension base " + entry.attrs.base + "</span>";
					addWrapperContainer = true;
				} else if (entry.name=="complexType") {
					if (entry.attrs.name) {
						desc = "<span class='ctBadge' title='complexType'>" + entry.attrs.name + "</span> ";	
					} else {
						desc = "<span class='ctBadge'>complexType</span> ";
					}

					addWrapperContainer = true;
				} else {
					if (!entry.attrs) {
						console.log("no attrs");
					}
					if (entry.attrs.name) {
						desc = entry.attrs.name + ' (' + entry.name + ')';
					} else {
						desc = entry.name;
					}
				}

				var title = "";
				if (entry.nsMap) {
 					for (var key in entry.nsMap) {
 						title += key + " = " + entry.nsMap[key] + "\n \n";
 					}
				}

				$childContainer = $('<div>');

				
				var $span = $('<span>');
				$div1.append($span);
				$span.attr("title", title);
				$div1.append($childContainer);

				if (hasBranching) {
					$span.html(desc);
					$childContainer.addClass('hasBranch');
				} else {
					$span.html(desc);
				}
				$span.addClass(css);

				if (addWrapperContainer) {
					$wrapperDiv = $('<div>');
					$wrapperDiv.appendTo(parent);
					$wrapperDiv.addClass('ctContainer')
					$div1.appendTo($wrapperDiv);	
				} else {
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
			var hasBranching = this.hasBranching(entry);
			var container = this.markupForNode(entry, domParent, hasBranching);
			if (!container) {
				container = domParent;
			}
			var protectedContainerRef = container;
			if (entry.linkedEntry) {
				this.renderElem(entry.linkedEntry, container);
			}

			if (entry.children) {
				for (var i = 0; i < entry.children.length; i++) {
					this.renderElem(entry.children[i], protectedContainerRef);
				}
			}
		}
	};
});