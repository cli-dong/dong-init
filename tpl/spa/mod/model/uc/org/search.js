'use strict';

var util = require('../../../util');

module.exports = util.REST.extend({
  attrs: {
    module: 'uc',
    baseUri: [util.UC_API_ORIGIN, 'v0.93/organizations/{orgId}/orgnodes/0/users/actions/search']
  }
});
