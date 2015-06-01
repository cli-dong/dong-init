'use strict';

var fs = require('fs')
var path = require('path')

module.exports = function(type, options) {
  if (!options) {
    options = type
    type = 'spa'
  }

  var dest = path.join(__dirname, type)

  if (fs.existsSync(dest)) {
    require(dest)(options)
  } else {
    console.warn('type `' + type + '` is NOT exist')
  }
}
