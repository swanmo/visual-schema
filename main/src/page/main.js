requirejs.config({
	baseUrl: '/src',
    paths: {
        'jquery': '../../node_modules_copy/jquery/dist/jquery',
        'pagejs': '../../node_modules_copy/page/page'
    }
});

require(['page/setup'],
    function(setup) {});
