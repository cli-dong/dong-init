'use strict';

var debug = require('nd-debug');

module.exports = function(util) {

  util.console = {

    log: function() {
      if (util.ENV !== 'PRODUCTION') {
        console.log.apply(null, arguments);
      }
    },

    warn: function(msg, cb, ms) {
      util.layout.render('msgbox', {
        msg: msg,
        close: cb,
        timeout: ms || 1000,
        level: 'warning'
      });
    },

    error: function(msg, cb, ms) {
      util.layout.render('msgbox', {
        msg: msg,
        close: cb,
        timeout: ms || 1000,
        level: 'danger'
      });
    },

    info: function(msg, cb, ms) {
      util.layout.render('msgbox', {
        msg: msg,
        close: cb,
        timeout: ms || 1000,
        level: 'info'
      });
    },

    success: function(msg, cb, ms) {
      util.layout.render('msgbox', {
        msg: msg,
        close: cb,
        timeout: ms || 1000,
        level: 'success'
      });
    },

    progress: function() {
      // todo
    }

  };

  // take care of debug
  debug.log = util.console.log;
  debug.warn = util.console.warn;
  debug.error = util.console.error;
  debug.info = util.console.info;
  debug.success = util.console.success;

};