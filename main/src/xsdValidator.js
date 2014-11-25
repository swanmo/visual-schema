define(['validatorFactory', 'validators/util'], function (validatorFactory, validatorUtil) {
    var validators = validatorFactory('xs');

    var getTnsPrefix = function(element) {

        for (var i = 0; i < element.attributes.length; i++) {
            if (element.attributes.item(i).value === 'http://www.w3.org/2001/XMLSchema') {
                return validatorUtil.getInstance().withoutNs(element.attributes.item(i).name);
            }
        }
        throw 'Unable to find xsd namespace prefix';
        
    };

    var apply = function(e, errormessages) {
        var validator = validators.get(e);
        var errors = validator.getValidationErrors(e);
        if (errors) {
            for (var i = 0; i < errors.length; i++) {
                errormessages.push(errors[i]);
            }
        }
    };

    var all = function(elem, errormessages) {
        apply(elem, errormessages);

        for(var i = 0; i < elem.children.length; i++) {
            all(elem.children[i], errormessages);
        }
    };

    return {
        getValidationErrors:function(xmlStr) {
          var oParser = new DOMParser();
          var oDOM = oParser.parseFromString(xmlStr, "text/xml");
          var errorMessages = [];
          var tnsPrefix = getTnsPrefix(oDOM.documentElement);
          console.log('tnsPrefix', tnsPrefix);
          validators = validatorFactory(tnsPrefix);

          all(oDOM.documentElement, errorMessages);
          return (errorMessages.length > 0) ? errorMessages : undefined;
        }
    };
});