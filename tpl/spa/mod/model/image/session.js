'use strict';

var util = require('../../util');

// 内容服务相关 session

module.exports = util.REST.extend({
  attrs: {
    module: 'microblog',
    baseUri: [util.MB_API_ORIGIN, 'v0.1', 'images/sessions']
  }
});
