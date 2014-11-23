define([], function () {
    var contentElements = [
      'annotation',
      'attribute',
      'attributeGroup',
      'complexType',
      'element',
      'group',
      'import',
      'include',
      'notation',
      'redefine',
      'simpleType',
     ];


    return {
        /*append: function(oldArray, newItems) {
            if (newItems !== undefined) {
                for (var n = 0; n < newItems.length; n++) {
                    if (oldArray === undefined) {
                        oldArray = [];
                    }
                    oldArray.push(newItems[n]);
                }
            }
            return oldArray;
        },*/
        withoutNs: function(elementTagName) {
            var colonPos = elementTagName.indexOf(':');
            if (colonPos > -1) {
                return elementTagName.substring(colonPos + 1);
            }
            return elementTagName;
        },
        getValidationErrors: function(schemaElement) {
            var results = undefined;
            if (schemaElement.children.length) {
                for (var i = 0; i < schemaElement.children.length; i++) {
                    var elemTagName = this.withoutNs(schemaElement.children[i].tagName);
                    if (contentElements.indexOf(elemTagName) < 0 ) {
                        results = results || [];
                        results.push('Unexpected element "' + elemTagName + '" as content of "' + schemaElement.tagName + '"')
                    }
                }
            }
            console.log('Schema validator returns', results);
            return results;
        }
    };
});
