define(['validators/schema',
		'validators/group',
		'validators/sequence',
		'validators/annotation',
		'validators/empty'],
function (
		schema,
		group,
		sequence,
		annotation,
		empty) {

	return function(xsPrefix) {
		return {
	    	get: function(elementName, parentElementName) {
	    		if (elementName.tagName === xsPrefix + ':schema') {
	    			return schema;
	    		} else if (elementName.tagName === xsPrefix + ':group') {
	    			return group;
    			} else if (elementName.tagName === xsPrefix + ':sequence') {
	    			return sequence;
    			} else if (elementName.tagName === xsPrefix + ':annotation') {
	    			return annotation;
	    		} else {
	    			return empty;
	    		}
	    	}
	    };	

	}

});