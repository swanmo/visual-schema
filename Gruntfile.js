module.exports = function (grunt) {
  'use strict';
  require('jit-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    meta: {
      base: './',
      src: {
          app: 'flitapp/',
          test: 'test/',
      },
      dist: 'dist/',
      mount: '../flit-web/src/main/webapp/app/'
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'main/src',
 
          out: 'dist/main.js',
          optimize: 'none',
         
          name: '../lib/vendor/almond/almond',
          include: ['main'],
         
          paths: {
            jquery: '../../node_modules/jquery/dist/jquery'
          }
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js',
        './flitapp/**/*.js', '!./flitapp/assets/**/*.js'
      ],
      continuous: {
          options: {
              jshintrc: '.jshintrc',
              reporter: 'checkstyle',
              reporterOutput: 'jshint-checkstyle/checkstyle-result.xml',
          },
          src: [ '<%= jshint.all %>' ]
      }      
    },

    less: {
      build: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'main/style/one.css': 'main/style/less/build.less'
        }
      }
    },

    watch: {
      style: {
        files: ['main/style/less/**/*.less'], // which files to watch
        tasks: ['less:build'],
        options: {
          nospawn: true
        }
      },
      jshint: {
        files: [
          '<%= meta.base %>main/src/js/**/*.js',
          '<%= meta.base %>test/**/*.js'

        ],
        tasks: ['lint']
      },
      karma: {
        files: ['<%= meta.base %>main/app/js/**/*.js',
          '<%= meta.base %>/test/**/*.js',
          './app/**/*.js'

        ],
        tasks: ['test']
      }
    },
    karma: {
      files: ['<%= meta.base %>main/app/js/**/*.js',
        '<%= meta.base %>/test/**/*.js',
        './app/**/*.js'

      ],
      tasks: ['test']
    },
    copy: {
      nodemod: {
        /*src: 'flitapp/**',
        dest: '<%= meta.dist %>',*/
        expand: true, cwd: 'node_modules/', src: [
          'page/**/*.js',
          'jquery/**/*.js',
          'requirejs/**/*.js'],
        dest: 'main/node_modules_copy/'
      },
      font: {
        /*src: 'flitapp/**',
        dest: '<%= meta.dist %>',*/
        expand: true,
        cwd: 'node_modules/materialize-css',
        src: ['font/**/*'],
        dest: 'main/' // makes all src relative to cwd
      },
      dist: {
        /*src: 'flitapp/**',
        dest: '<%= meta.dist %>',*/
        expand: true, cwd: 'main/', src: ['**/*',  '!**/src/**'], dest: 'dist/' // makes all src relative to cwd
      }
    },
    clean: {
      options: {
        force:true
      },
      dist: '<%=meta.dist %>',
      mount: '<%= meta.mount %>',
      tmp: '.tmp',
      unminified: ['<%=meta.dist %>**/*.js', '!<%=meta.dist %>**/*.min.js',
        '<%=meta.dist %>**/*.css', '!<%=meta.dist %>**/*.min.css']
    },
    
    processhtml: {
      options: {
        data: {
          message: '<!-- built <%=grunt.template.today("yyyy-mm-dd") %>(<%=pkg.version%>) -->'
        }
      },
      dist: {
        files: {
          'dist/index.html': ['main/index.html']
        }
      }
    }
  });

  grunt.registerTask('lint', ['jshint:all']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('build', ['copy:dist', 'requirejs:compile']);
  grunt.registerTask('default', ['copy:nodemod', 'copy:font', 'less:build', 'watch:style']);

  grunt.registerTask('make-dist', [
    'clean:dist',
    'copy:dist',
    'requirejs:compile',
    'processhtml:dist'
  ]);
};