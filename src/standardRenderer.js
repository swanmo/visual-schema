define(['jquery'], function($) {

	return {
		render: function(roots) {
			var rootElem = $('<div>');
			rootElem.addClass('hasBranch');

			for(var i = 0; i < roots.length; i++) {
				this.renderElem(roots[i], rootElem);
			}
			return rootElem;
		},
		isExtensionBase: function(entry, parentEntry) {
			return parentEntry && 
				(parentEntry.name == "extension") &&
				parentEntry.linkedEntry == entry;
		},
		hasBranching: function(entry) {
			var kids = [];
			if (entry.children) {
				for (var i = 0; i < entry.children.length; i++) {
					kids.push(entry.children[i]);
				}
			}

			if (entry.linkedEntry) {
				kids.push(entry.linkedEntry);
			}
			return kids.length > 1;
		},
		markupForNode: function(entry, parent, hasBranching, isExtensionBase) {
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
				if (isExtensionBase) {
					$wrapperDiv.addClass('xb');
				} else {
					$wrapperDiv.addClass('ctContainer')	;
				}
				
				$div1.appendTo($wrapperDiv);	
			} else {
				$div1.appendTo(parent);	
			}

			return $childContainer;
		},
		renderElem: function(entry, domParent, parentEntry) {
			var hasBranching = this.hasBranching(entry);
			var isExtensionBase = this.isExtensionBase(entry, parentEntry);

			var container = this.markupForNode(entry, domParent, hasBranching, isExtensionBase);
			if (!container) {
				container = domParent;
			}
			if (entry.linkedEntry) {
				this.renderElem(entry.linkedEntry, container, entry);
			}

			if (entry.children) {
				for (var i = 0; i < entry.children.length; i++) {
					this.renderElem(entry.children[i], container, entry);
				}
			}
		}
	};
});