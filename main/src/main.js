requirejs.config({
    paths: {
        'jquery': '../lib/jquery'
    }
});
require(['domsetup'],
function (domSetup) {
    domSetup.setup();
});


