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
		'validators/import',
		'validators/empty',
		'validators/parsererror'],
function (
		_schema,
		_attribute,
		_attributeLocal,
		_group,
		_sequence,
		_choice,
		_element,
		_localElement,
		_annotation,
		_complexType,
		_complexContent,
		_simpleType,
		_simpleContent,
		_restriction,
		_restrictionLocal,
		_extension,
		_key,
		_keyref,
		_enumeration,
		_all,
		_import,
		_empty,
		_parsererror) {

	return function(xsPrefix) {
		var is = function(element, tagName) {
			return (element && element.tagName === xsPrefix + ':' + tagName);
		};
		return {
	    	get: function(element, parent_Element_Xyz) {
	    		if (is(element, 'schema')) {
	    			return _schema;
	    		} else if (is(element, 'group')) {
	    			return _group;
    			} else if (is(element, 'sequence')) {
	    			return _sequence;
    			} else if (element.tagName === xsPrefix + ':element' && parent_Element_Xyz &&
    					parent_Element_Xyz.tagName === xsPrefix + ':schema') {
    				return _element;
    			} else if (element.tagName === xsPrefix + ':element') {
    				return _localElement;
				} else if (element.tagName === xsPrefix + ':attribute' && parent_Element_Xyz &&
    					parent_Element_Xyz.tagName === xsPrefix + ':schema') {
    				return _attribute;
				} else if (is(element, 'attribute')) {
    				return _attributeLocal;
				} else if (is(element, 'complexType')) {
    				return _complexType;
    			} else if (is(element, 'complexContent')) {
    				return _complexContent;
				} else if (is(element, 'simpleType')) {
    				return _simpleType;
    			} else if (is(element, 'simpleContent')) {
    				return _simpleContent;
    			} else if (is(element, 'choice')) {
	    			return _choice;
    			} else if (is(element, 'annotation')) {
	    			return _annotation;
	    		} else if (element.tagName === xsPrefix + ':restriction' && parent_Element_Xyz &&
    					parent_Element_Xyz.tagName === xsPrefix + ':simpleContent') {
	    			return _restrictionLocal;
	    		} else if (is(element, 'restriction')) {
	    			return _restriction;
	    		} else if (is(element, 'extension')) {
	    			return _extension;
    			} else if (is(element, 'key')) {
	    			return _key;
	    		} else if (	is(element, 'all')) {
	    			return _all;
    			} else if (is(element, 'keyref')) {
	    			return _keyref;
    			} else if (is(element, 'enumeration')) {
	    			return _enumeration;
	    		} else if (is(element, 'import')) {
	    			return _import;
				} else if (element.tagName === 'parsererror') {
	    			return _parsererror;
	    		} else {
	    			return _empty;
	    		}
	    	}
	    };	

	}

});