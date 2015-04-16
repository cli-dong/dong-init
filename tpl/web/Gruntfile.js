/**
 * @author: <%= user.name %> <<%= user.email %>> - <%= time %>
 */

'use strict';

module.exports = function(grunt) {

  // 显示任务执行时间
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    pkg: pkg,

    jshint: {
      options: {
        jshintrc: true
      },
      app: ['app/**/*.js'],
      mod: ['mod/**/*.js']
    },

    jsdoc: {
      app: {
        src: ['app/**/*.js'],
        options: {
          destination: 'doc/app'
        }
      },
      mod: {
        src: ['mod/**/*.js'],
        options: {
          destination: 'doc/mod'
        }
      }
    },

    sass: {
      theme: {
        options: {
          compass: true,
          // nested, compact, compressed, expanded
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'theme/default/scss',
          src: ['**/*.scss'],
          dest: 'theme/default/css',
          ext: '.css'
        }]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= "\<%= pkg.name %\>" %> - v<%= "\<%= pkg.version %\>" %> - <%= "\<%= grunt.template.today(\"yyyymmdd\") %\>" %> */\n',
        beautify: {
          'ascii_only': true
        },
        compress: {
          'global_defs': {
            'DEBUG': false
          },
          'dead_code': true
        }
      },
      config: {
        files: {
          'lib/config.js': 'lib/config.js'
        }
      }
    },

    clean: {
      doc: ['doc'],
      theme: ['theme/default/css']
    }

  });

  grunt.registerTask('build-theme', ['clean', 'sass']);
  grunt.registerTask('build-lib', ['uglify']);

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['build-theme', 'build-lib']);
  grunt.registerTask('doc', ['clean:doc', 'jsdoc']);

  grunt.registerTask('default', ['test', 'build', 'doc']);

};
