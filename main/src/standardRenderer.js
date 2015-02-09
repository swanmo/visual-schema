define(['jquery', 'parseUtils'], function($, parseUtils) {
	
	var toggleDisplay = function() {
		var element = $(this).next();
		var label = $(this).text();

		if (label === '-') {
			$(this).text('+');
		} else {
			$(this).text('-');
		}
		element.slideToggle();

	};
	var getUseCardinality = function(use) {
		if (use) {
			if (use !== 'optional') {
				return ' <span class="ec">[' + use + ']</span>';
			}
		}
		return '';
	};
	var getCardinality = function(minOccurs, maxOccurs) {
		var maxOccursTxt, minOccursTxt;
		if (maxOccurs && maxOccurs !== '1') {
			maxOccursTxt = maxOccurs;
		}
		if (minOccurs && minOccurs !== '1') {
			minOccursTxt = minOccurs;
		}
		if (maxOccursTxt || minOccursTxt) {
			var cardinality = [' <span class="ec" title="'];
			if (minOccursTxt) {
				cardinality.push('minOccurs=');
				cardinality.push(minOccursTxt);
			}
			if (maxOccursTxt) {
				if (minOccursTxt) {
					cardinality.push(', ');
				}
				cardinality.push('maxOccurs=');
				cardinality.push(maxOccursTxt);
			}
			cardinality.push('">[');
			if (minOccursTxt) {
				cardinality.push(minOccursTxt);
			} else {
				cardinality.push('1');
			}
			cardinality.push('..');
			if (maxOccursTxt) {
				if (maxOccursTxt === 'unbounded') {
					cardinality.push('*');
				} else {
					cardinality.push(maxOccursTxt);
				}
			} else {
				cardinality.push('1');
			}
			cardinality.push(']</span>');
			return cardinality.join('');
		}
		return '';	
	};


	return {
		isExpanded: function(entry) {
			return (entry.name === 'extension' || entry.name === 'restriction');
		},
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
				(parentEntry.name === 'extension') &&
				parentEntry.linkedEntry === entry;
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
			if (entry.name === 'element') {
				var isUnimportant = (entry.attrs.name === undefined && entry.linkedEntry);
				css = "element-e";
				var elementTitle = 'element';
				$div1.addClass("padded");
				if (entry.attrs.minOccurs === "0") {
					elementTitle = 'optional ' + elementTitle;
					css += " optional";
				}				

				if (isUnimportant) {
					css += " unimportant";
				}
				
				var name = entry.attrs.name || '<span style="color:#bbb">&lt;empty&gt;</span>'

				desc = "<div class='e' title='" +elementTitle+ "'>E</div> " + name;
				if (entry.attrs.type) {
					desc += " <span class='et' title=" + entry.attrs.type + ">: " + parseUtils.parseName(entry.attrs.type) + "</span>";
				} else if (entry.attrs.nodeMap.ref) {
					desc += " <span class='et'>: " + entry.attrs.nodeMap.ref + "</span>";
				}
				desc += getCardinality(entry.attrs.minOccurs, entry.attrs.maxOccurs);
				
			} else if (entry.name=="key" || entry.name=="keyref") {

				if (entry.attrs.type) {
					desc += " <span class='et'>: " + parseUtils.parseName(entry.attrs.type) + "</span>";
				}

				css = "element-e";
				$div1.addClass("padded");
				if (entry.attrs.minOccurs == "0") {
					css += " optional";
				}
				desc = "<div class='e' title='" + entry.name + "'><span class='icon-key2'></span></div> " + entry.attrs.name;
				if (entry.attrs.type) {
					desc += " <span class='et'>: " + parseUtils.parseName(entry.attrs.type) + "</span>";
				}

				css = "element-e";
				$div1.addClass("padded");
				if (entry.attrs.minOccurs == "0") {
					css += " optional";
				}

			} else if (entry.name === 'attribute') {
				desc = "<div class='a' title='attribute'>A</div> " + entry.attrs.name;

				if (entry.attrs.type) {
					desc += " <span class='et'>: " + parseUtils.parseName(entry.attrs.type) + "</span>";
					if (entry.attrs.nodeMap.use) {
						desc += getUseCardinality(entry.attrs.nodeMap.use);
					}
				}
				css = "element-a";
				$div1.addClass("padded");

				if (entry.attrs.nodeMap.use === 'optional') {
					css += " optional";
				}
			} else if (entry.name=="selector" || entry.name=="field") {
				var symbol = (entry.name=="field") ? "@" : "x";

				desc = "<div class='a'>" +symbol+ "</div> " + entry.name;
				desc += " <span class='et'>: " + entry.attrs.nodeMap.xpath + "</span>";
				css = "element-a";
				$div1.addClass("padded");
			} else if (entry.name=="sequence") {
				desc = "<div class='s' title='sequence'>...</div> ";
			} else if (entry.name=="complexContent") {
				return parent;
			} else if (entry.name=="extension") {
				desc = "<span class='ctBadge'>extension base " + entry.attrs.base + "</span>";
				addWrapperContainer = true;
			} else if (entry.name=="restriction") {
				desc = "<span class='rBadge'>restriction base " + entry.attrs.base + "</span>";
				addWrapperContainer = true;
			} else if (entry.name=="complexType") {
				if (entry.attrs.name) {
					desc = "<span class='ctBadge' title='complexType'>" + entry.attrs.name + "</span> ";	
				} else {
					desc = "<span class='ctBadge'>complexType</span> ";
				}
				addWrapperContainer = true;
			} else if (entry.name=="simpleType") {
				if (entry.attrs.name) {
					desc = "<span class='stBadge' title='simpleType'>" + entry.attrs.name + "</span> ";	
				} else {
					desc = "<span class='stBadge'>simpleType</span> ";
				}
				addWrapperContainer = true;
			} else if (entry.name==='enumeration' || entry.name==='fractionDigits' || entry.name==='length' ||
					entry.name==='maxExclusive' || entry.name==='maxInclusive' || entry.name==='maxLength' ||
					entry.name==='minExclusive' || entry.name==='minInclusive' || entry.name==='minLength' ||
					entry.name==='pattern' || entry.name==='totalDigits' || entry.name==='whiteSpace') {

				if (entry.name==='enumeration') {
					desc = "<div class='a' title='attribute'><span class='glyphicon glyphicon-th-list'></span></div> " + entry.name;
				} else {
					desc = "<div class='a' title='attribute'><span class='glyphicon glyphicon-ban-circle'></span></div> " + entry.name;
				}

				if (entry.attrs.nodeMap.value) {
					desc += " <span class='et'>: " + entry.attrs.nodeMap.value + "</span>";
				}
				css = "element-a";
				$div1.addClass("padded");
			} else if (entry.name!=="schema" && entry.name!=="#comment") {
				desc = '<span class="icon-file-xml" style="font-size:160%"></span>';
				if (entry.attrs.name) {
					desc += entry.attrs.name + ' (' + entry.name + ')';
				} else {
					desc += entry.name;
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

			if (entry.linkedEntry) {
				var isExpanded = this.isExpanded(entry);
				var $mini = $('<div>');
				$mini.addClass('expander');
				if (isExpanded) {
					$mini.html('-');
				} else {
					$mini.html('+');
					$childContainer.css('display', 'none');
				}
				
				$mini.on('click', toggleDisplay);
				$div1.append($mini);
				
			}
			
			//Flytta denna innanför if-sats och ta bort kommentar nedanför för att återställa.
			$div1.append($childContainer);


			if (hasBranching) {
				$span.html(desc);
				$childContainer.addClass('hasBranch');

			} else {
				$span.html(desc);	
			}
			// $div1.append($childContainer);
			$span.addClass(css);

			if (addWrapperContainer) {
				$wrapperDiv = $('<div>');
				if (isExtensionBase) {
					$wrapperDiv.addClass('xb');
				} else {
					$wrapperDiv.addClass('ctContainer');
				}
				$div1.appendTo($wrapperDiv);
				if (isExtensionBase) {
					var $extDiv = $('<div>');
					var $expansionDiv = $('<div>');
					$expansionDiv.addClass('expander');
					$expansionDiv.html('-');
					$expansionDiv.on('click', toggleDisplay);
					// $wrapperDiv.css('display', 'none');

					$extDiv.append($expansionDiv);
					$extDiv.append($wrapperDiv);
					$extDiv.appendTo(parent);
				} else {
					$wrapperDiv.appendTo(parent);	
				}
				
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