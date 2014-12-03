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
		'validators/restrictionLocal',
		'validators/extension',
		'validators/key',
		'validators/keyref',
		'validators/enumeration',
		'validators/all',
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
		restrictionLocal,
		extension,
		key,
		keyref,
		enumeration,
		all,
		empty,
		parsererror) {

	return function(xsPrefix) {
		var is = function(element, elementName) {
			return (element && element.tagName === xsPrefix + ':' + elementName);
		};
		return {
	    	get: function(elementName, parentElementName) {
	    		if (is(elementName, 'schema')) {
	    			return schema;
	    		} else if (is(elementName, 'group')) {
	    			return group;
    			} else if (is(elementName, 'sequence')) {
	    			return sequence;
    			} else if (elementName.tagName === xsPrefix + ':element' && parentElementName &&
    					parentElementName.tagName === xsPrefix + ':schema') {
    				return element;
    			} else if (elementName.tagName === xsPrefix + ':element') {
    				return localElement;
				} else if (elementName.tagName === xsPrefix + ':attribute' && parentElementName &&
    					parentElementName.tagName === xsPrefix + ':schema') {
    				return attribute;
				} else if (is(elementName, 'attribute')) {
    				return attributeLocal;
				} else if (is(elementName, 'complexType')) {
    				return complexType;
    			} else if (is(elementName, 'complexContent')) {
    				return complexContent;
				} else if (is(elementName, 'simpleType')) {
    				return simpleType;
    			} else if (is(elementName, 'simpleContent')) {
    				return simpleContent;
    			} else if (is(elementName, 'choice')) {
	    			return choice;
    			} else if (is(elementName, 'annotation')) {
	    			return annotation;
	    		} else if (elementName.tagName === xsPrefix + ':restriction' && parentElementName &&
    					parentElementName.tagName === xsPrefix + ':simpleContent') {
	    			return restrictionLocal;
	    		} else if (is(elementName, 'restriction')) {
	    			return restriction;
	    		} else if (is(elementName, 'extension')) {
	    			return extension;
    			} else if (is(elementName, 'key')) {
	    			return key;
	    		} else if (	is(elementName, 'all')) {
	    			return all;
    			} else if (is(elementName, 'keyref')) {
	    			return keyref;
    			} else if (is(elementName, 'enumeration')) {
	    			return enumeration;
				} else if (elementName.tagName === 'parsererror') {
	    			return parsererror;
	    		} else {
	    			return empty;
	    		}
	    	}
	    };	

	}

});