'use strict';

var fs = require('fs')
var path = require('path')

var chalk = require('chalk')
var template = require('gulp-template')
var inquirer = require('inquirer')
var semver = require('semver')
var vfs = require('vinyl-fs')

module.exports = function(options) {

  if (!options.force && fs.readdirSync(process.cwd()).length > 0) {
    return console.error(chalk.red('请在非空目录上执行初始化命令！'))
  }

  console.log(chalk.magenta('░▒▓██ 创建 Web 项目……'))
  console.log('')

  inquirer.prompt([{
    message: '项目名：',
    name: 'appname',
    'default': path.basename(process.cwd()),
    validate: function(input) {
      var done = this.async()

      if (!/^[a-z][a-z0-9\-\.]*$/.test(input)) {
        console.warn(chalk.red('Must be only lowercase letters, numbers, dashes or dots, and start with lowercase letter.'))
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
        console.warn(chalk.red('Must be a valid semantic version (semver.org).'))
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

    answers.user = require('../get-user')()
    answers.time = require('../get-time')()

    vfs.src(path.join(__dirname, '..', '..', 'tpl', 'web', '**'), { dot: true })
      .pipe(template(answers))
      .pipe(vfs.dest('./'))
      .on('end', function() {
        console.log('')
        console.log(chalk.magenta('░▒▓██ Web 项目成功创建！'))
      })
  })

}
