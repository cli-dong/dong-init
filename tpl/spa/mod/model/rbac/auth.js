'use strict';

var util = require('../../util');

module.exports = new util.REST({
  // for AJAX 代理
  baseUri: [util.LOC_ORIGIN, 'v0.1', 'auth']
});
