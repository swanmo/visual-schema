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
		childrenForNode: function(entry) {
			var kids = [];
			if (entry.children) {
				for (var i = 0; i < entry.children.length; i++) {
					kids.push(entry.children[i]);
				}
			}
			if (entry.linkedEntry) {
				kids.push(entry.linkedEntry);
			}
			return kids;
		},
		markupForNode: function(entry, parent, children) {
			var entries = [];
			var hasBranching = (children.length > 1);
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
					desc = "<div class='s'>...</div> ";
				} else if (entry.name=="complexContent") {
					return parent;
				} else if (entry.name=="complexType") {
					if (entry.attrs.name) {
						desc = "<span class='ctBadge'>" + entry.attrs.name + "</span> ";	
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
			// ToDo
			var entryChildren = entry.children; //this.childrenForNode(entry);
			console.log("kids: " + entryChildren.length);
			var container = this.markupForNode(entry, domParent, entryChildren);
			if (!container) {
				container = domParent;
			}

			
			for(var i = 0; i < entryChildren.length; i++) {
				this.renderElem(entryChildren[i], container);
			}
		}
	};
});