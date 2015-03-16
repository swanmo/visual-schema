({
  baseUrl: 'main/src',
 
  out: 'dist/main.js',
  optimize: 'uglify2',
 
  name: '../lib/vendor/almond/almond',
  include: ['main'],
 
  paths: {
    jquery: '../../lib/vendor/jquery/src/jquery'
  }
})