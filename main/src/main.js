requirejs.config({
    paths: {
        'jquery': 'node_modules/jquery/dist/jquery.js'
    }
});
require(['domsetup'],
function (domSetup) {
    domSetup.setup();
});


