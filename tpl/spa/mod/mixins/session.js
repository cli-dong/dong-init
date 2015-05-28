'use strict';

var Storage = require('nd-storage');

module.exports = function(util) {

  // 浏览器关闭自动消除
  util.session = new Storage(null, -1);

};
