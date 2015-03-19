define(['parser', 'model', 'standardRenderer', 'root', 'linker'],
function (p,	   model,   renderer,   root,   linker) {
	var present = function(arr) {
		var errorsArr = [];
		arr.forEach(
			function(e) {
				if (!e) {
					errorsArr.push('An error occurred');
				} else if (e.level==='E') {
					errorsArr.push('Error: ' + e.message);
				} else if (e.level==='I') {
					errorsArr.push('Information: ' + e.message);
				}
			});
		return errorsArr.join('<br>');
	};
	var _id = 1;
	return {
		show: function(xsdValue) {

			root.html('saving...');

			root.html('parsing...');
			model.clean();
			
			var errors = p.getValidationError(xsdValue);

			if (errors !== null && errors !== undefined) {
				root.html('<div style="margin:1em 0 0 5em"><h2>Error when parsing xsd...</h2>' + present(errors) + '</div>');
			} else {

			    p.parse(xsdValue);

			    linker.link(model.roots);
			    
			    var domElem = renderer.render(model.roots, root);
				
				root.addClass('x');
				root.html(domElem);
			}
		}
	};
});