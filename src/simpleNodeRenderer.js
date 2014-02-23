define(['jquery'], function($) {
	return {
		nodeFromEntry: function(entry) {
			var listEntry = $('<li>');

			if (entry.name=="element") {
				listEntry.addClass("eElem");
				listEntry.append($('<span title="element">').text("E").addClass("icon"));
			} else if (entry.name=="complexType") {
				listEntry.addClass("eComplexType");
				listEntry.append($('<span title="complexType">').text("CT").addClass("icon"));
			} else if (entry.name=="sequence") {
				listEntry.addClass("eSequence");
				listEntry.append($('<span title="sequence">').text("...").addClass("icon"));
			} else if (entry.name=="complexContent") {
				listEntry.addClass("eSequence");
				listEntry.append($('<span title="complexContent">').text("CC").addClass("icon"));
			} else if (entry.name=="extension") {
				listEntry.addClass("eSequence");
				listEntry.append($('<span title="extension">').text("X").addClass("icon"));
			}

			if (entry.attrs && entry.attrs.name) {
				listEntry.append(entry.attrs.name);	
			} else {
				listEntry.append($('<span>').text(entry.prefix).addClass("prefix"));
				listEntry.append(" " + entry.name);	
				
			}
			if (entry.linkedEntry) {
				listEntry.append(" " + entry.linkedEntry + " (" + entry.linkedEntry.attrs.name + ")");	
			}

			return listEntry;
		}

	};
})