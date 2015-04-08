requirejs.config({
	
    paths: {
        'jquery': '../../node_modules/jquery/dist/jquery'

    }
});
require(['domsetup'],
function (domSetup) {
    domSetup.setup();
});