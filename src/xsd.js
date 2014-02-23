define(['parser', 'model', 'stroller', 'root', 'linker'],
function (p,	   model,   stroller,   root,   linker) {
	return {
		show: function(xsdValue) {

		    linker.init(['xs'], ['tns']);     //TODO

		    p.parse(xsdValue);

		    linker.link(model.roots);
		    
		    var domElem = stroller.render(model.roots, root);

		    domElem.appendTo(root);
		}
	}
});