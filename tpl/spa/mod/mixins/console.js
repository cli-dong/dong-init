'use strict';

var debug = require('nd-debug');
var Message = require('nd-message');

module.exports = function(util) {

  /*jshint maxparams:4*/
  function render(msg, cb, ms, level) {
    if (typeof cb === 'number') {
      ms = cb;
      cb = null;
    }

    return new Message({
      parentNode: '#msgbox',
      model: {
        msg: msg,
        close: cb,
        timeout: ms || util.TOAST_DURATION,
        level: level
      }
    }).render();
  }

  util.console = {

    log: function() {
      if (util.ENV !== 'PRODUCTION') {
        console.log.apply(null, arguments);
      }
    },

    warn: function(msg, cb, ms) {
      return render(msg, cb, ms, 'warning');
    },

    error: function(msg, cb, ms) {
      return render(msg, cb, ms, 'danger');
    },

    info: function(msg, cb, ms) {
      return render(msg, cb, ms, 'info');
    },

    success: function(msg, cb, ms) {
      return render(msg, cb, ms, 'success');
    }

  };

  // take care of debug
  debug.log = util.console.log;
  debug.warn = util.console.warn;
  debug.error = util.console.error;
  debug.info = util.console.info;
  debug.success = util.console.success;

};
