'use strict';

var fs = require('fs')
var path = require('path')

var log = require('spm-log')
var template = require('gulp-template')
var inquirer = require('inquirer')
var semver = require('semver')
var vfs = require('vinyl-fs')

module.exports = function(options) {

  if (!options.force && fs.readdirSync(process.cwd()).length > 0) {
    return log.error('init web', '请在非空目录上执行初始化命令！')
  }

  log.info('init web', '...')

  inquirer.prompt([{
    message: '项目名：',
    name: 'appname',
    'default': path.basename(process.cwd()),
    validate: function(input) {
      var done = this.async()

      if (!/^[a-z][a-z0-9\-\.]*$/.test(input)) {
        log.warn('init web', 'Must be only lowercase letters, numbers, dashes or dots, and start with lowercase letter.')
        return
      }

      done(true)
    }
  }, {
    message: '版本号：',
    name: 'version',
    'default': '0.0.0',
    validate: function(input) {
      var done = this.async()

      if (!semver.valid(input)) {
        log.warn('init web', 'Must be a valid semantic version (semver.org).')
        return
      }

      done(true)
    }
  }, {
    message: '项目描述：',
    name: 'description'
  }], function(answers) {
    answers.varname = answers.appname
    .replace(/\-(\w)/g, function(_, $1){
      return $1.toUpperCase()
    })

    answers.user = require('../../util/get-user')()

    vfs.src(path.join(__dirname, '../../tpl/web/**'), { dot: true })
      .pipe(template(answers))
      .pipe(vfs.dest('./'))
      .on('end', function() {
        log.info('init web', 'done!')
      })
  })

}
