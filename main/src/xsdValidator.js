define(['validatorFactory', 'validators/util'], function (validatorFactory, validatorUtil) {
    var validators = validatorFactory('xs');

    var getTnsPrefix = function(element) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Attr
        for (var i = 0; i < element.attributes.length; i++) {
            if (element.attributes.item(i).value === 'http://www.w3.org/2001/XMLSchema') {
                return validatorUtil.getInstance().withoutNs(element.attributes.item(i).name);
            }
        }
        throw 'Unable to find xsd namespace prefix';
        
    };

    var apply = function(element, parent, errormessages) {
        var validator = validators.get(element, parent);
        var errors = validator.getValidationErrors(element);
        if (errors) {
            for (var i = 0; i < errors.length; i++) {
                errormessages.push(errors[i]);
            }
        }
    };

    var all = function(elem, parentElem, errormessages) {
        apply(elem, parentElem, errormessages);

        for(var i = 0; i < elem.children.length; i++) {
            all(elem.children[i], elem, errormessages);
        }
    };

    return {
        getValidationErrors:function(xmlStr) {
          // https://developer.mozilla.org/en-US/docs/Web/API/document
          var oParser = new DOMParser();
          var oDOM = oParser.parseFromString(xmlStr, "text/xml");
          var errorMessages = [];
          var tnsPrefix = getTnsPrefix(oDOM.documentElement);

          validators = validatorFactory(tnsPrefix);

          all(oDOM.documentElement, undefined, errorMessages);
          return (errorMessages.length > 0) ? errorMessages : undefined;
        }
    };
});