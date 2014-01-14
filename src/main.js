requirejs.config({
    paths: {
        'jquery': '../lib/jquery',
        'underscore': '../lib/underscore',
        "jquery.bootstrap": "../lib/bootstrap.min"
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery.bootstrap': {
            deps: ["jquery"]
        }
    }
});

define(['parser', 'model', 'stroller', 'root', 'domsetup', 'xmlSource', 'linker', 'jquery.bootstrap'], function (p, model, stroller, root, domSetup, xmlSource, linker, bootstrap) {

    linker.init(['xs'], ['tns']);     //TODO

    p.parse(xmlSource.getXml());

    linker.link(model.roots);
    var domElem = stroller.render(model.roots, root);

    domElem.appendTo(root);

    domSetup.setup();
});


