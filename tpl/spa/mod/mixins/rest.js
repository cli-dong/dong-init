'use strict';

var Base = require('nd-base');
var RESTful = require('nd-restful');

module.exports = function(util) {

  util.REST = Base.extend({
    Implements: [RESTful],

    attrs: {
      // FOR RESTful
      proxy: util.ajax
    }
  });

};
