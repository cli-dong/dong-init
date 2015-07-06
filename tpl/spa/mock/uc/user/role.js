'use strict';

module.exports = {
  '/v0.9/users/980071/roles': {
    'GET': function(url, query) {
      return query === 'realm=uc.sdp.nd' ? {
        'items': [{
          'auth_extra': 0,
          'realm': 'uc.sdp.nd',
          'role_id': 76,
          'role_name': 'SDP_DEVELOPER',
          'updated_at': '2015-02-09T10:12:46Z'
        }]
      } : {
        'items': [{
          'auth_extra': 0,
          'realm': 'interaction.nd.com',
          'remarks': '管理员',
          'role_id': 145,
          'role_name': 'ADMINISTRATOR',
          'updated_at': '2015-06-15T14:59:36Z'
        }]
      };
    }
  }
};
