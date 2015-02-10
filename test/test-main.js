var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/Users/swanmo/Documents/javascript/visual-schema/main/src',

    paths: {
        'jquery': '/Users/swanmo/Documents/javascript/visual-schema/node_modules/jquery/dist/jquery.js'  
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
// /Users/swanmo/Documents/javascript/visual-schema/main/src/sample.js 
// /Users/swanmo/Documents/javascript/xml-visual/main/src/sample.js