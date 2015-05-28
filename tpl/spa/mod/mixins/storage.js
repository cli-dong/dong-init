'use strict';

var Storage = require('nd-storage');

module.exports = function(util) {

  // 默认一周有效期
  util.storage = new Storage(null, 7 * 24 * 3600);

};
