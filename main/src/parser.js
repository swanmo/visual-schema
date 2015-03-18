define(['model', 'xsdValidator'], function (model, xsdValidator) {
	return {
		counter: 0,
		nsPrefix: "xmlns:",
		defaultSchemaNs: "xmlns",
		nsQualifier: "http://www.w3.org/2001/XMLSchema",
		targetNamespace: "targetNamespace",

		findNs: function(elem) {
			var attributes = elem.attributes;
			var nsMap = {};
			for (var key in attributes) {
				var val = attributes[key].name;
				if (val && val.hasOwnProperty(key)) {
					var nsQualifier = attributes[key].value;
					if (this.defaultSchemaNs == val) {
						nsMap[val] = nsQualifier;
					} else if (val.substring(0, this.nsPrefix.length) === this.nsPrefix) {
						nsMap[val.substring(this.nsPrefix.length)] = nsQualifier;
					} else if (this.targetNamespace == val){
						nsMap[val] = nsQualifier;
						nsMap["tns"] = nsQualifier;
					}
				}
			}
			return nsMap;
		},
		elements: function(elem, parentEntry) {
			var nsMap = this.findNs(elem);

			var me = this;
			// console.log('add', $elem.html());
			var entry = model.add(elem, parentEntry, nsMap);

			$(elem).contents()
				.filter(function() {
					return this.nodeType != 3;
				})
				.each(function() {
					me.elements(this, entry);
				});
		},
		getValidationError: function(xmlStr) {
			return xsdValidator.getValidationErrors(xmlStr);
		},
		evalu:function(item, level) {
			var offset = '';
			for (var i=0; i < level; i++) {
				offset += '  ';
			}
			for(var x in item) {
				console.log('*' + offset, x + '=', item[x]);
			}
		},
		parse: function(xml) {
			var xmlDoc = $.parseXML(xml);
			// console.log(xmlDoc);
			var $xml = $(xmlDoc);
			// console.log($xml);
			var me = this;
			var schemaElemTagName = "schema";

			$xml.children().each(function() {
				if (this.nodeType != 3 &&
					this.tagName.indexOf("schema") >= 0) {

					me.elements(this, null);

				}
			});
		}
	};
})