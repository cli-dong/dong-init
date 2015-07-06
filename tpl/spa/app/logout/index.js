'use strict';

module.exports = function(util) {
  util.auth.destroy();
  util.redirect('login');
};
