requirejs.config({
    paths: {
        'jquery': '../lib/jquery'        
    }
});

require(['domsetup'],
function (domSetup) {
    domSetup.setup();

    // linker.init(['xs'], ['tns']);     //TODO

    // p.parse(xmlSource.getXml());

    // linker.link(model.roots);
    // var domElem = stroller.render(model.roots, root);

    // domElem.appendTo(root);

    // domSetup.setup();
});


