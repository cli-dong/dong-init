'use strict';

module.exports = function(util) {

  util.avatar = function(uid, realm, size) {
    if (typeof realm === 'number') {
      size = realm;
      realm = null;
    }

    if (!size) {
      size = 80;
    }

    if (realm) {
      return util.CS_API_ORIGIN + '/v0.1/static/cscommon/avatar/' + uid + '/' +  realm+ '/' + uid + '.jpg?size=' + size;
    }

    return util.CS_API_ORIGIN + '/v0.1/static/cscommon/avatar/' + uid + '/' + uid + '.jpg?size=' + size;
  };

};
