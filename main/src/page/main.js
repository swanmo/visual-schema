requirejs.config({
	baseUrl: '/main/src',
    paths: {
        'jquery': '../../../node_modules/jquery/dist/jquery'
    }
});

require(['page/setup'],
    function(setup) {});
