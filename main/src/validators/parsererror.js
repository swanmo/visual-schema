define([], function () {

    return {
        getValidationErrors: function(element) {

          var extractedMsg = element.childNodes[1].innerHTML;
          return [{message: extractedMsg, level:'F'}];
        }
    };
});
