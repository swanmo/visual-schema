define(['jquery', 'page/editor', 'page/diagram', 'page/rout'],
		function($, editor, diagram, route) {
	'use strict';

	editor.init();
	diagram.init();
	route.init();
});
