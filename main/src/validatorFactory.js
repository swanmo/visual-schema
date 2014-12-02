define(['validators/schema',
		'validators/attribute',
		'validators/attributeLocal',
		'validators/group',
		'validators/sequence',
		'validators/choice',
		'validators/element',
		'validators/localElement',
		'validators/annotation',
		'validators/complexType',
		'validators/complexContent',
		'validators/simpleType',
		'validators/simpleContent',
		'validators/restriction',
		'validators/extension',
		'validators/empty',
		'validators/parsererror'],
function (
		schema,
		attribute,
		attributeLocal,
		group,
		sequence,
		choice,
		element,
		localElement,
		annotation,
		complexType,
		complexContent,
		simpleType,
		simpleContent,
		restriction,
		extension,
		empty,
		parsererror) {

	return function(xsPrefix) {
		return {
	    	get: function(elementName, parentElementName) {
	    		if (elementName.tagName === xsPrefix + ':schema') {
	    			return schema;
	    		} else if (elementName.tagName === xsPrefix + ':group') {
	    			return group;
    			} else if (elementName.tagName === xsPrefix + ':sequence') {
	    			return sequence;
    			} else if (elementName.tagName === xsPrefix + ':element' && parentElementName &&
    					parentElementName.tagName === xsPrefix + ':schema') {
    				return element;
    			} else if (elementName.tagName === xsPrefix + ':element') {
    				return localElement;
				} else if (elementName.tagName === xsPrefix + ':attribute' && parentElementName &&
    					parentElementName.tagName === xsPrefix + ':schema') {
    				return attribute;
				} else if (elementName.tagName === xsPrefix + ':attribute') {
    				return attributeLocal;
				} else if (elementName.tagName === xsPrefix + ':complexType') {
    				return complexType;
    			} else if (elementName.tagName === xsPrefix + ':complexContent') {
    				return complexContent;
				} else if (elementName.tagName === xsPrefix + ':simpleType') {
    				return simpleType;
    			} else if (elementName.tagName === xsPrefix + ':simpleContent') {
    				return simpleContent;
    			} else if (elementName.tagName === xsPrefix + ':choice') {
	    			return choice;
    			} else if (elementName.tagName === xsPrefix + ':annotation') {
	    			return annotation;
	    		} else if (elementName.tagName === xsPrefix + ':restriction') {
	    			return restriction;
	    		} else if (elementName.tagName === xsPrefix + ':extension') {
	    			return extension;
				} else if (elementName.tagName === 'parsererror') {
	    			return parsererror;
	    		} else {
	    			return empty;
	    		}
	    	}
	    };	

	}

});