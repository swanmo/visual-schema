define(['parser', 'model', 'standardRenderer', 'root', 'linker'],
function (p,	   model,   renderer,   root,   linker) {
	return {
		show: function(xsdValue) {

			root.html("parsing...");

			model.clean();

			var errors = p.getValidationError(xsdValue);

			if (errors !== null && errors !== undefined) {
				root.html('<h2>Error when parsing xsd...</h2>' + errors);
			} else {

			    p.parse(xsdValue);

			    linker.link(model.roots);
			    
			    var domElem = renderer.render(model.roots, root);
				
				root.addClass('x');
				root.html(domElem);
			}
		}
	}
});