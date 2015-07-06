'use strict';

var UcTokenModel = require('../../mod/model/uc/token');

module.exports = function(util) {
  var accessToken = util.auth.getAccessToken();

  function done() {
    util.auth.destroy();
    util.redirect('login');
  }

  if (accessToken) {
    new UcTokenModel()
      .DELETE(accessToken)
      .always(done);
  } else {
    done();
  }
};
