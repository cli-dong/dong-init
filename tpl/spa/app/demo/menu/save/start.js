'use strict';

module.exports = function() {
  var plugin = this,
    host = plugin.host;

  this.options = {
    onTreeSave: function() {
      console.log(host.getData());
    }
  };

};
