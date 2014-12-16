define(['validators/schema',
		'validators/topLevelAttribute',
		'validators/attributeLocal',
		'validators/group',
		'validators/groupLocal',
		'validators/sequence',
		'validators/sequenceSimpleExplicitGroup',
		'validators/choiceLocal',
		'validators/choiceGlobal',
		'validators/topLevelElement',
		'validators/localElement',
		'validators/annotation',
		'validators/union',
		'validators/complexType',
		'validators/topLevelComplexType',
		'validators/complexContent',
		'validators/simpleType',
		'validators/topLevelSimpleType',
		'validators/simpleContent',
		'validators/complexRestrictionType',
		'validators/simpleRestrictionType',
		'validators/globalRestrictionType',
		'validators/extension',
		'validators/extensionSimple',
		'validators/key',
		'validators/keyref',
		'validators/enumeration',
		'validators/all',
		'validators/list',
		'validators/import',
		'validators/include',
		'validators/notation',
		'validators/redefine',
		'validators/field',
		'validators/attributeGroupLocal',
		'validators/attributeGroupGlobal',
		'validators/fractionDigits',
		'validators/length',
		'validators/restrictionImpl',
		'validators/pattern',
		'validators/selector',
		'validators/empty',
		'validators/parsererror'],
function (
		_schema,
		_topLevelAttribute,
		_attributeLocal,
		_group,
		_groupLocal,
		_sequence,
		_sequenceSimpleExplicitGroup,
		_choiceLocal,
		_choiceGlobal,
		_topLevelElement,
		_localElement,
		_annotation,
		_union,
		_complexType,
		_topLevelComplexType,
		_complexContent,
		_simpleType,
		_topLevelSimpleType,
		_simpleContent,
		_complexRestrictionType,
		_simpleRestrictionType,
		_globalRestrictionType,
		_extension,
		_extensionSimple,
		_key,
		_keyref,
		_enumeration,
		_all,
		_list,
		_import,
		_include,
		_notation,
		_redefine,
		_field,
		_attributeGroupLocal,
		_attributeGroupGlobal,
		_fractionDigits,
		_length,
		_restrictionImpl,
		_pattern,
		_selector,
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
	    			if (is(parent_Element_Xyz, 'redefine') || is(parent_Element_Xyz, 'schema')) {
						return _group;
					} else {
						return _groupLocal;
					}
    			} else if (is(element, 'sequence')) {
    				if (is(parent_Element_Xyz, 'group')) {
    					return _sequenceSimpleExplicitGroup;
    				} else {
    					return _sequence;
    				}
	    			
    			} else if (element.tagName === xsPrefix + ':element' && parent_Element_Xyz &&
    					parent_Element_Xyz.tagName === xsPrefix + ':schema') {
    				return _topLevelElement;
    			} else if (element.tagName === xsPrefix + ':element') {
    				return _localElement;
				} else if (element.tagName === xsPrefix + ':attribute' && parent_Element_Xyz &&
    					parent_Element_Xyz.tagName === xsPrefix + ':schema') {
    				return _topLevelAttribute;
				} else if (is(element, 'attribute')) {
    				return _attributeLocal;
				} else if (element.tagName === xsPrefix + ':complexType' && parent_Element_Xyz &&
    					parent_Element_Xyz.tagName === xsPrefix + ':schema') {
					return _topLevelComplexType;
				} else if (is(element, 'complexType')) {
    				return _complexType;
    			} else if (is(element, 'complexContent')) {
    				return _complexContent;
				} else if (is(element, 'simpleType')) {
					if (is(parent_Element_Xyz, 'schema') || is(parent_Element_Xyz, 'redefine')) {
    					return _topLevelSimpleType;
    				} else {
    					return _simpleType;
    				}
    			} else if (is(element, 'simpleContent')) {
    				return _simpleContent;
    			} else if (is(element, 'choice')) {
    				if (is(parent_Element_Xyz, 'group')) {
						return _choiceLocal;
					} else {
						return _choiceGlobal;
					}
    			} else if (is(element, 'annotation')) {
	    			return _annotation;
	    		} else if (is(element, 'restriction')) {
	    			if (is(parent_Element_Xyz, 'simpleContent')) {
	    				return _simpleRestrictionType;
	    			} else if (is(parent_Element_Xyz, 'complexContent')) {
	    				return _complexRestrictionType;
					} else if (is(parent_Element_Xyz, 'simpleType')) {
						return _globalRestrictionType;
					}
	    		} else if (is(element, 'extension')) {
	    			if (is(parent_Element_Xyz, 'simpleContent')) {
	    				return _extensionSimple;
	    			} else {
						return _extension;
	    			}
    			} else if (is(element, 'key')) {
	    			return _key;
	    		} else if (is(element, 'all')) {
	    			return _all;
    			} else if (is(element, 'list')) {
	    			return _list;
    			} else if (is(element, 'union')) {
	    			return _union;
    			} else if (is(element, 'keyref')) {
	    			return _keyref;
    			} else if (is(element, 'enumeration')) {
	    			return _enumeration;
	    		} else if (is(element, 'import')) {
	    			return _import;
    			} else if (is(element, 'notation')) {
	    			return _notation;
    			} else if (is(element, 'redefine')) {
	    			return _redefine;
    			} else if (is(element, 'field')) {
	    			return _field;
				} else if (is(element, 'attributeGroup')) {
					if (is(parent_Element_Xyz, 'schema') || is(parent_Element_Xyz, 'redefine')) {
						return _attributeGroupGlobal;
					} else {
						return _attributeGroupLocal;
					}
				} else if (is(element, 'include')) {
	    			return _include;
				} else if (is(element, 'fractionDigits')) {
	    			return _fractionDigits;
	    		} else if (is(element, 'pattern')) {
	    			return _pattern;
    			} else if (is(element, 'selector')) {
	    			return _selector;
	    		} else if (is(element, 'length') || is(element, 'maxLength')) {
	    			return _length;
	    		} else if (is(element, 'maxExclusive') || is(element, 'maxInclusive') ||
	    			is(element, 'minExclusive') || is(element, 'minInclusive') ||
	    			is(element, 'totalDigits')|| is(element, 'whiteSpace')) {
	    			return _restrictionImpl;
				} else if (element.tagName === 'parsererror') {
	    			return _parsererror;
	    		} else if (is(element, 'appinfo') ||
	    			is(element, 'documentation') ||
	    			is(element, 'import')) {
	    			return _empty;
	    		}
	    	}
	    };	

	}
});