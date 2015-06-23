'use strict';

var options = require('../util/options');

module.exports = function() {

  return options.call(this, 'add');

  // return false, will prevent starter

};
