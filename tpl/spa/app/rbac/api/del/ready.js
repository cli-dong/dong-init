'use strict';

var Alert = require('nd-alert');

module.exports = function() {
  var plugin = this,
    host = plugin.host;

  plugin.off('submit').on('submit', function(id, done) {
    host.DELETE({
        data: {
          'api': id
        }
      })
      .done(function() {
        // 成功，返回第一页
        // host.getList();
        host.deleteItem(id);
      })
      .fail(function(error) {
        Alert.show(error);
      })
      .always(done);
  });

};
