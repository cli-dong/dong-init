'use strict';

var util = require('../../util');

module.exports = new util.REST({
  // for AJAX 代理
  baseUri: [util.UC_API_ORIGIN, 'v0.9', 'users']
});
