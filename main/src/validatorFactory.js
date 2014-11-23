define(['validators/schema'], function (schema) {

	return function(xsPrefix) {

		return {
	    	get: function(elementName, parentElementName) {
	    		if (elementName.tagName === xsPrefix + ':schema') {
	    			return schema;
	    		}
	    	}
	    };	

	}

});