define(['jquery', 'simpleNodeRenderer'], function($, renderer) {
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
			console.log(entry);

			if (entry.children && entry.children.length > 0) {

				listEntry.append(childrenContainer);
				for(var i = 0; i < entry.children.length; i++) {
					this.renderElem(entry.children[i], childrenContainer);
				}	
			}

			if (entry.linkedEntry) {
				
				listEntry.append(childrenContainer);
				console.log("linked");

				this.renderElem(entry.linkedEntry, childrenContainer);	
			}
		}
	};
});