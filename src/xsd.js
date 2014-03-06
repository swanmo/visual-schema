define(['parser', 'model', 'standardRenderer', 'root', 'linker'],
function (p,	   model,   renderer,   root,   linker) {
	return {
		show: function(xsdValue) {

			root.html("parsing...");

			model.clean();

		    linker.init(['xs'], ['tns']);     //TODO

		    p.parse(xsdValue);

		    linker.link(model.roots);
		    
		    var domElem = renderer.render(model.roots, root);

			root.html(domElem);
		}
	}
});