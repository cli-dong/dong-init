'use strict';

var options = require('../util/options');

module.exports = function() {

  return options.call(this, 'edit');

  // return false, will prevent starter

};
