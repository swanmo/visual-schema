define([], function () {

    return {
        getValidationErrors: function(element) {
          console.log('parsererror', element);
            return [element.childNodes[1].innerHTML];
        }
    };
});
