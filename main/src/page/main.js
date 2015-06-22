requirejs.config({
	baseUrl: '/src',
    paths: {
        'jquery': '../../node_modules_copy/jquery/dist/jquery',
        'jQuery': '../../node_modules_copy/jquery/dist/jquery',
        'pagejs': '../../node_modules_copy/page/page',
        'hammerjs': '/lib/materialize-src/js/hammer.min',
        'materialize': '/lib/materialize-src/js/bin/materialize'
    },
    shim: {
      materialize: {
          deps: ['jquery', 'hammerjs']
      }
    }
});

require(['jquery', 'page/setup'], function($, setup) {
	window.jQuery = $;
    // window.Hammer = Hammer;

	require(['materialize'],
		function(materialize) {


		});

});
