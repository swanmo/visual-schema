define(['jquery', 'xmlSource'], function($, xmlSource) {
	return {
		setDefaults: function() {

			return function(contents) {
				if (contents) {
					$('#xsdContent').text(contents);
				} else {
					$('#xsdContent').text(xmlSource.getXml());
				}
			};
		}
	};
});