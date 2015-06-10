'use strict';

var msg = require('../../msg/error.json');

module.exports = function(util) {

  util.error = function(data) {
    if (data && data.code && (data.code in msg)) {
      return msg[data.code];
    }

    return '未知错误';
  };

};
