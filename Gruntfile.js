module.exports = function (grunt) {
  'use strict';

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
          optimize: 'uglify2',
         
          name: '../lib/vendor/almond/almond',
          include: ['main'],
         
          paths: {
            jquery: '../lib/jquery'
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
    watch: {
      jshint: {
        files: [
          '<%= meta.base %>app/js/**/*.js',
          '<%= meta.base %>/test/**/*.js',
          './app/**/*.js'

        ],
        tasks: ['lint']
      },
      karma: {
        files: ['<%= meta.base %>app/js/**/*.js',
          '<%= meta.base %>/test/**/*.js',
          './app/**/*.js'

        ],
        tasks: ['test']
      }
    },
    copy: {
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

  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify'); 

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('lint', ['jshint:all']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('build', ['copy:dist', 'requirejs:compile']);

  grunt.registerTask('make-dist', [
    'clean:dist',
    'copy:dist',
    'requirejs:compile',
    'processhtml:dist'
  ]);
};