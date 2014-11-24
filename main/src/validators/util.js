define([], function () {
   var Util = (function () {
   
    // Instance stores a reference to the Singleton
    var instance;
   
    function init() {
   
      return {
        withoutNs: function (elementTagName) {
          var colonPos = elementTagName.indexOf(':');
          if (colonPos > -1) {
              return elementTagName.substring(colonPos + 1);
          }
          return elementTagName;
        },
        validateChildren: function(element, validContentElements) {
            var results = undefined;
            if (element.children.length) {
                for (var i = 0; i < element.children.length; i++) {
                    var elemTagName = this.withoutNs(element.children[i].tagName);
                    if (validContentElements.indexOf(elemTagName) < 0 ) {
                        results = results || [];
                        results.push('Unexpected element "' + elemTagName + '" as content of "' + element.tagName + '"')
                    }
                }
            }
            return results;
        }
      };
   
    };
   
    return {
      getInstance: function () {
        if (!instance) {
          instance = init();
        }
        return instance;
      }
   
    };
   
  })();
  return Util;
});

