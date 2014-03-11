define(['root', 'model'], function (root, model) {
	return {
		counter: 0,
		nsPrefix: "xmlns:",
		nsQualifier: "http://www.w3.org/2001/XMLSchema",
		targetNamespace: "targetNamespace",

		findNs: function(elem) {
			var attributes = elem.attributes;
			var nsMap = {};
			for (var key in attributes) {
				var val = attributes[key].name;
				if (val && val.hasOwnProperty(key)) {
					if (val.substring(0, this.nsPrefix.length) === this.nsPrefix) {
						var nsQualifier = attributes[key].value;
						nsMap[val.substring(this.nsPrefix.length)] = nsQualifier;
					} else if (this.targetNamespace == val){
						console.log("adding NS: " + val + " (" + nsQualifier + ")");
						nsMap[val] = nsQualifier;
						nsMap["tns"] = nsQualifier;
					}
				}
			}
			return nsMap;
		},
		elements: function(elem, parentEntry) {
			var nsMap = this.findNs(elem);
			
			var $elem = $(elem);

			var me = this;

			var entry = model.add(elem, parentEntry, nsMap);

			$elem.contents()
				.filter(function() {
			      return this.nodeType != 3;
			    })
				.each(function() {
					me.elements(this, entry);
				});
		},
		parse: function(xml) {
			var xmlDoc = $.parseXML(xml);
			var $xml = $(xmlDoc);
			var me = this;

			$xml.find("xs\\:schema > *").each( function(){
				if (this.nodeType != 3) {
					me.elements(this, null);
				}
		    });
		}
	};
})