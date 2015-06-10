'use strict';

var util = require('../../../util');

module.exports = new util.REST({
  // for AJAX 代理
  baseUri: [util.UC_API_URL, 'v0.9/users/{user_id}/roles']
});
