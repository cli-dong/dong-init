'use strict';

var $ = require('jquery');

var ajax = require('nd-ajax');

module.exports = function(util) {

  var defaults = {

    // if (options.additional) {
    //   options.additional['org_id'] = 'xxx';
    // } else {
    //   options.additional = {
    //     'org_id': 'xxx'
    //   };
    // }

    done: function(defer, data) {
      defer.resolve(data || {});
    },

    // 400 etc
    fail: function(defer, error, xhr) {
      if (xhr.status === 400) {
        defer.reject(xhr.responseJSON.message);
      } else if (xhr.status === 0) {
        defer.reject('跨域请求被拒绝');
      } else {
        defer.reject(error);
      }
    }

  };

  util.ajax = function(options) {

    $.extend(true, options, defaults);

    return ajax(function(data) {
      if (util.route.getRoute(0) !== 'login' && util.auth.isAuthed()) {
        var matched = data.url.match(/(?:https?:)?\/\/([^\/]+)(\/.+)/i);
        data.headers = {
          authorization: util.auth.getAuthentization(
            data.type, matched[2], matched[1]
          )
        };
      }

      return data;
    })(options);

  };

  // $.defer
};
