'use strict';

/**
 * 这个接口提供的地址不符合规范，所有只能用role1命名
 */

var util = require('../../../util');

module.exports = new util.REST({
  // for AJAX 代理
  baseUri: [util.UC_API_URL, 'v0.9/users/roles/{role_id}']
});
