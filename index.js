/*
 * dong-init
 * https://github.com/crossjs/dong-init
 *
 * Copyright (c) 2015 crossjs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {
  command: 'init',
  description: '初始化项目文件',
  options: [{
    name: 'force',
    alias: 'f',
    description: '直接覆盖，不做目录非空校验',
    defaults: false
  }],
  bootstrap: require('./lib/init'),
  help: function(chalk) {
    console.log('  Examples:')
    console.log('')
    console.log(chalk.gray('    $ ') +
                chalk.magenta('dong init spa') +
                chalk.gray(' ....... Single Page Application'))
    console.log(chalk.gray('    $ ') +
                chalk.magenta('dong init web') +
                chalk.gray(' ....... General Web Project'))
    console.log('')
  }
}
