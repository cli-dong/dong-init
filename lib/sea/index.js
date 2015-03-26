'use strict';

var path = require('path')

var chalk = require('chalk')
var extend = require('extend')
var getPkg = require('package')
var template = require('gulp-template')
var vfs = require('vinyl-fs')
var deps = require('dong-deps')

module.exports = function(options) {

  var pkg

  try {
    pkg = getPkg('.')
  } catch(e) {
    return console.error(chalk.red('缺少 package.json 文件！'))
  }

  if (!pkg || !pkg.name || !pkg.version) {
    return console.error(chalk.red('package.json 缺少必要的字段！'))
  }

  options = extend({
    root: '.'
  }, pkg && pkg.dong || {}, options)

  options.appname = pkg.name
  options.version = pkg.version

  var idleading = path.relative(options.root, process.cwd()).replace(/\\/g, '/')

  var dependencies = deps({
    scope: 'spm/dependencies',
    idleading: idleading
  })

  var devDependencies = deps({
    scope: 'spm/devDependencies',
    idleading: idleading
  })

  function _base() {
    return idleading.replace('/' + options.appname, '')
  }

  function _alias() {
    var map = [], keys = []
    var data = dependencies.all(), n
    var dep = dependencies.get()

    for (n in dep) {
      keys.push(n)
      map.push('\'' + n + '\': \'' + dep[n] + '\'')
    }

    for (n in data) {
      if (n === dependencies.ROOT_KEY) {
        continue
      }

      dep = data[n]

      for (n in dep) {
        if (keys.indexOf(n) !== -1) {
          continue
        }

        keys.push(n)
        map.push('\'' + n + '\': \'' + dep[n] + '\'')
      }

    }

    return map.join(',\n      ')
  }

  function _plugins() {
    // 必须按指定顺序执行
    var plugins = ['seajs-text', 'seajs-wrap', 'seajs-style', 'seajs-debug']

    var str = []

    plugins.forEach(function(plugin) {
      plugin = devDependencies.get('', plugin)

      // 仅加载 devDependecies 中的 plugins
      if (plugin) {
        str.push('\'' + plugin + '?nowrap\'')
      }
    })

    return '[' + str.join(', ') + ']'
  }

  options.base = _base()
  options.alias = _alias()
  options.plugins = _plugins()

  vfs.src(path.join(__dirname, '..', '..', 'tpl', 'sea', '**'), { dot: true })
    .pipe(template(options))
    .pipe(vfs.dest('.'))
    .on('end', function() {
      console.log('')
      console.log(chalk.magenta('░▒▓██ SeaJS 及其配置文件成功创建！'))
    })

}
