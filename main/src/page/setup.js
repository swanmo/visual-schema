define(['jquery', 'page/editor', 'page/diagram', 'page/rout', 'services/collectionController'],
		function($, editor, diagram, route, collectionCtrl) {
	'use strict';

	editor.init();
	diagram.init();
	route.init();
	collectionCtrl.init();
});
