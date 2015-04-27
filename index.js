/*
 * dong-serve
 * https://github.com/crossjs/dong-init
 *
 * Copyright (c) 2015 crossjs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(options) {

  require('./lib/' + options.type)(options)

}
