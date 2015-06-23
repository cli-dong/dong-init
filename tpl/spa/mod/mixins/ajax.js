'use strict';

var ajax = require('nd-ajax');

var msg = require('../../msg/error.json');

module.exports = function(util) {

  function getMsg(data) {
    if (data && data.code && (data.code in msg)) {
      return msg[data.code];
    }

    return '未知错误';
  }

  function done(defer, data) {
    defer.resolve(data || {});
  }

  // 400 etc
  function fail(defer, error, xhr) {
    if (xhr.status === 0) {
      defer.reject('请求被拒绝');
    } else if (xhr.status >= 400) {
      defer.reject(getMsg(xhr.responseJSON));
    } else {
      defer.reject(error);
    }
  }

  function checkDispatcher(options) {
    var baseUri = options.baseUri;

    // 未开启代理
    if (!util.PROXY_ENABLED) {
      return;
    }

    // 模拟环境下
    if (util.ENV === util.SIMULATION) {
      return;
    }

    // 存在白名单
    if (util.PROXY_WHITELIST && util.PROXY_WHITELIST.length) {
      // 不在白名单
      if (util.PROXY_WHITELIST.indexOf(baseUri[0]) === -1) {
        return;
      }
    } else {
      // 本地接口
      if (baseUri[0] === util.LOC_ORIGIN) {
        return;
      }
    }

    var dispatcher = JSON.stringify({
      'host': baseUri[0].replace(/^(?:https?:)?\/\//i, ''),
      'ver': baseUri[1],
      'api': '/' + baseUri[2],
      'var': options.replacement
    });

    // http://remote-api to http://locale-proxy
    baseUri[0] = util.LOC_ORIGIN;
    baseUri[2] = 'dispatcher/' + baseUri[2];

    return dispatcher;
  }

  util.ajax = function(options) {
    options.done = done;
    options.fail = fail;

    var dispatcher = checkDispatcher(options);
    var isLogin = util.auth.isLogin();

    return ajax(function(data) {
      if (data.url) {

        if (!dispatcher && !isLogin) {
          return data;
        }

        if (!data.headers) {
          data.headers = {};
        }

        // has uc tokens
        if (isLogin) {
          var matched = data.url.match(/^(?:https?:)?\/\/([^\/]+)(\/.+)$/i);
          data.headers.Authorization =
            util.auth.getAuthentization(
              data.type, matched[2], matched[1]
            );
        }

        // proxy pass
        if (dispatcher) {
          data.headers.Dispatcher = dispatcher;
        }
      }

      return data;
    })(options);

  };
};
