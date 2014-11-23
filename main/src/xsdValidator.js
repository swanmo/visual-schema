define(['validatorFactory'], function (validatorFactory) {
    var validators = validatorFactory('xs');
    console.log('validators', validators);

    return {
        getValidationErrors:function(xmlStr) {
          var oParser = new DOMParser();
          var oDOM = oParser.parseFromString(xmlStr, "text/xml");
          console.log('validators', validators);
          var validator = validators.get(oDOM.documentElement);

          return validator.getValidationErrors(oDOM.documentElement);
        }
    };
});