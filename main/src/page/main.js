requirejs.config({
	baseUrl: '/src',
    paths: {
        'jquery': '../../node_modules_copy/jquery/dist/jquery',
        'jQuery': '../../node_modules_copy/jquery/dist/jquery',
        'pagejs': '../../node_modules_copy/page/page',
        'hammerjs': '../../node_modules_copy/hammerjs/hammer',
  		'materialize': '../../node_modules_copy/materialize-css/bin/materialize'
    }
});

require(['jquery', 'page/setup'], function($, setup) {
	window.jQuery = $;
	require(['materialize'],
		function(materialize) {
			console.log('init materialize', $('select'));
			$('select').material_select();	
		});

});
