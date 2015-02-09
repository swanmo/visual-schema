define(['jquery', 'simpleNodeRenderer'], function($, renderer) {
	var arrOfColors = ["#efefef", "#e7e7e7", "#dfdfdf", "#d7d7d7", "#d0d0d0", "#c7c7c7"];
	var colorPos = 0;
	return {
		render: function(roots) {
			var rootElem = $('<ul>');
			for(var i = 0; i < roots.length; i++) {
				this.renderElem(roots[i], rootElem);
			}
			return rootElem;
		},
		renderElem: function(entry, domParent) {
			// var listEntry = $('<li>').text(entry.prefix + " " + entry.name);
			var listEntry = renderer.nodeFromEntry(entry);
			// console.log(listEntry);
			listEntry.appendTo(domParent);

			var childrenContainer = $('<ul>');

			if (entry.children && entry.children.length > 0) {

				listEntry.append(childrenContainer);
				for(var i = 0; i < entry.children.length; i++) {
					this.renderElem(entry.children[i], childrenContainer);
				}
			} else if (entry.linkedEntry) {
				childrenContainer.css("background-color", arrOfColors[(colorPos++) % arrOfColors.length]);

				listEntry.append(childrenContainer);
				this.renderElem(entry.linkedEntry, childrenContainer);
				// listEntry.append(childrenContainer);

				colorPos--;
				// this.renderElem(entry.linkedEntry, childrenContainer);	
			}
		}
	};
});