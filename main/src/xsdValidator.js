define(['validatorFactory', 'validators/util'], function (validatorFactory, validatorUtil) {
    var validators = validatorFactory('xs');
    var util = validatorUtil.getInstance();

    var getTnsPrefix = function(element) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Attr

        for (var i = 0; i < element.attributes.length; i++) {
            if (element.attributes.item(i).value === 'http://www.w3.org/2001/XMLSchema') {
                return util.withoutNs(element.attributes.item(i).name);
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

        for(var i = 0; i < kids(elem).length; i++) {
            all(kids(elem)[i], elem, errormessages);
        }
    };
    var kids = function(elem) {
      return util.elementChildren(elem);
    }
    var findParseErrors = function(elem, errormessages) {
        if (elem.tagName === 'parsererror') {
          errormessages.push(kids(elem).innerHTML);
        }

        for(var i = 0; i < kids(elem).length; i++) {
            if (errormessages.length > 0) {
              return;
            }
            findParseErrors(kids(elem)[i], errormessages);
        }

    };

    return {
        getValidationErrors:function(xmlStr) {
          // https://developer.mozilla.org/en-US/docs/Web/API/document
           
          var oParser = new DOMParser();
          var oDOM = oParser.parseFromString(xmlStr, "text/xml");
          var errorMessages = [];
          var tnsPrefix = getTnsPrefix(oDOM.documentElement);

          findParseErrors(oDOM.documentElement, errorMessages);

          validators = validatorFactory(tnsPrefix);
          all(oDOM.documentElement, undefined, errorMessages);
          return (errorMessages.length > 0) ? errorMessages : undefined;
        }
    };
});