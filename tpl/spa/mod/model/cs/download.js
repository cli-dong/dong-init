'use strict';

var util = require('../../util');

module.exports = util.REST.extend({
  attrs: {
    module: 'cs',
    baseUri: [util.CS_API_ORIGIN, 'v0.1', 'download']
  }
});
