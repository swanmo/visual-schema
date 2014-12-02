define(['validators/util'], function (util) {

    return {
        getValidationErrors: function(element) {
          console.log('parsererror', element);
            return [element.childNodes[1].innerHTML];
        }
    };
});
