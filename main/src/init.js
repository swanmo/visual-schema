define(['jquery', 'xmlSource'], function($, xmlSource) {
	return {
		setDefaults: function() {
			$("#xsdContent").text(xmlSource.getXml());
		}
	}
});