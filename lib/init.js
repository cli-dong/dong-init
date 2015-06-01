'use strict';

var fs = require('fs')

module.exports = function(type, options) {
  if (!options) {
    options = type
    type = 'spa'
  }

  if (fs.existsSync('./' + type)) {
    require('./' + type)(options)
  } else {
    console.warn('type `' + type + '` is NOT exist')
  }
}
