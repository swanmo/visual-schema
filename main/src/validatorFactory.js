define(['validators/schema',
		'validators/group',
		'validators/sequence',
		'validators/choice',
		'validators/element',
		'validators/localElement',
		'validators/annotation',
		'validators/empty'],
function (
		schema,
		group,
		sequence,
		choice,
		element,
		localElement,
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
    			} else if (elementName.tagName === xsPrefix + ':element' && parentElementName && parentElementName.tagName === xsPrefix + ':schema') {
    				return element;
    			} else if (elementName.tagName === xsPrefix + ':element') {
    				return localElement;
    			} else if (elementName.tagName === xsPrefix + ':choice') {
	    			return choice;
    			} else if (elementName.tagName === xsPrefix + ':annotation') {
	    			return annotation;
	    		} else {
	    			return empty;
	    		}
	    	}
	    };	

	}

});