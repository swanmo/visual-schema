define(['validatorFactory'], function (validatorFactory) {
    var validators = validatorFactory('xs');
    
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

    	for(var i = 0; i < elem.children; i++) {
    		all(elem.children[i], errormessages);
    	}
    };

    return {
        getValidationErrors:function(xmlStr) {
          var oParser = new DOMParser();
          var oDOM = oParser.parseFromString(xmlStr, "text/xml");
          var errorMessages = [];
		  all(oDOM.documentElement, errorMessages);
          return (errorMessages.length > 0) ? errorMessages : undefined;
        }
    };
});