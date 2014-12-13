define([], function () {
   var Util = (function () {
   
    // Instance stores a reference to the Singleton
    var instance;
    var getAttr = function(name, arr) {
      var hits = arr.filter(
          function(s) {
            return s.n === name;
          }
        );
      if (hits.length === 1) {
        return hits[0];
      }
      return undefined;
    };

    var getRequired = function(arr) {
      var requiredOnes = arr.filter(
          function(s) {
            return s.u === 'r';
          }
        );
      var results = {};
      for (var i = 0; i < requiredOnes.length; i++) {
        results[requiredOnes[i].n] = {isAbsent: true};
      }
      return results;
    };
    var err = function(msg) {
      return {
        level:'E',
        message:msg
      }
    };
    var inf = function(msg) {
      return {
        level:'I',
        message:msg
      }
    };

    var only = function(level, msgArr) {
      if (!msgArr) {
        return undefined;
      }
      return msgArr.filter(
        function(msg) {
          return (msg.level === level);
        }
        );
    };
   
    function init() {
      return {
        withoutNs: function (elementTagName) {
          var colonPos = elementTagName.indexOf(':');
          if (colonPos > -1) {
              return elementTagName.substring(colonPos + 1);
          }

        },
        errorsOnly: function(messagesArray) {
          return only('E', messagesArray);
        },
        validateAll: function(element, contentElements, validAttrs) {
          return this.concat(
              this.validateAttr(element, validAttrs),
              this.validateChildren(element, contentElements)
              );
        },
        validateAttr: function(element, attrs) {
          var requiredAttrs = getRequired(attrs);
          var results = undefined;
          for (var i = 0; i < element.attributes.length; i++) {
            var spec = getAttr(element.attributes.item(i).name, attrs);
            console.log('attr', element.attributes.item(i), spec);
            if (spec === undefined) {
              results = results || [];
              results.push(inf('Unknown attribute "' + element.attributes.item(i).name + '" of element "' + element.tagName));
            } else if (spec.u === 'p') {
              results = results || [];
              results.push(err('Attribute "' + element.attributes.item(i).name + '" of element "' + element.tagName + '" is prohibited'));
            } else if (spec.u === 'r') {
              requiredAttrs[element.attributes.item(i).name].isAbsent = false;
            }
          }
          for (var a in requiredAttrs) {
            if (requiredAttrs[a].isAbsent) {
              results = results || [];
              results.push(err('Attribute "' + a + '" of element "' + element.tagName + '" is required'));
            }
          }
          return results;
        },
        concat: function(arr1, arr2) {
          var results = [];
          if (arr1 !== undefined) {
            for (var i = 0; i < arr1.length; i++) {
              results.push(arr1[i]);
            }
          }
          if (arr2 !== undefined) {
            for (var j = 0; j < arr2.length; j++) {
              results.push(arr2[j]);
            }
          }
          if (results.length > 0) {
            return results;
          } else {
            return undefined;
          }
        },
        validateChildren: function(element, validContentElements) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Element
            var results = undefined;
            if (element.children.length) {
                for (var i = 0; i < element.children.length; i++) {
                    var elemTagName = this.withoutNs(element.children[i].tagName);
                    if (validContentElements.indexOf(elemTagName) < 0 ) {
                        results = results || [];
                        results.push(err('Unexpected element "' + elemTagName + '" as content of "' + element.tagName + '"'));
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

