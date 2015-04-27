'use strict';

var util = require('../../mod/util');

util.ready(function() {
  util.auth.setTokens(null);
  util.redirect('login');
});
