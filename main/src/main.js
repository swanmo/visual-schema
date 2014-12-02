requirejs.config({
    paths: {
        'jquery': '../lib/static/jquery'
    }
});
require(['domsetup'],
function (domSetup) {
    domSetup.setup();
});


