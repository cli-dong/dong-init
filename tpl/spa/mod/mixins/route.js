'use strict';

var Router = require('nd-router');

module.exports = function(util) {

  util.route = new Router();

  util.redirect = function(id) {
    setTimeout(function() {
      util.route.setRoute(id);
    }, 80);
  };

};
