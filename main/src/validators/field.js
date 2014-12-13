define(['validators/util'], function (util) {
  var u = util.getInstance();
    var contentElements = ['annotation'];

    var attrs = [
      {n:'id', t:'ID'},
      {n:'xpath', t:'token', u:'r'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
        }
    };
});
