define(['root', 'model'], function (root, model) {
	return {
		counter: 0,

		elements: function(elem, parentEntry) {
			var me = this;

			var entry = model.add(elem, parentEntry);

			$(elem).contents()
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