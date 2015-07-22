'use strict';

var Browser = require('nd-browser');
var Base = require('nd-base');
var RESTful = require('nd-restful');
var ajax = require('nd-ajax');

var msgMap = require('../../msg/error.json');

module.exports = function(util) {

  function addParam(url, params) {
    var arr = Object.keys(params).map(function(key) {
      return key + '=' + params[key];
    }).join('&');

    if (!arr) {
      return url;
    }

    return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr;
  }

  function getMsg(data) {
    if (data && data.code && (data.code in msgMap)) {
      return msgMap[data.code];
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

  function always(defer) {
    util.progress.show(100);
    defer.always();
  }

  util.REST = Base.extend({
    Implements: [RESTful],

    attrs: {
      done: done,
      fail: fail,
      always: always,
      module: null,
      baseUri: [],
      // 默认
      uriVar: 'id'
      // uri: null,
      // params: null, //[]
      // additional: null, //{}
      // replacement: null, //{}
    },

    request: function(options) {
      var dispatcher = this._dispatch(options);

      util.progress.show();

      return ajax(function(data) {
        if (!data.url) {
          return data;
        }

        if (!data.headers) {
          data.headers = {};
        }

        // disable cache
        if (!util.CACHE_ENABLED) {
          if (dispatcher) {
            data.headers[Browser.browser === 'IE' ? 'Pragma' : 'Cache-Control'] = 'no-cache';
          } else {
            // waf DOESN'T support cors Cache-Control header currently
            // would be REMOVED after waf updated
            data.url += data.url.indexOf('?') === -1 ? '?' : '&';
            data.url += '_=' + new Date().getTime();
          }
        }

        // proxy pass
        if (dispatcher) {
          data.headers.Dispatcher = dispatcher;
        }

        // has uc tokens
        if (util.auth.isLogin()) {
          var matched = data.url.match(/^(?:https?:)?\/\/([^\/]+)(\/.+)$/i);
          data.headers.Authorization =
            util.auth.getAuthentization(
              data.type, matched[2], matched[1]
            );
        }

        return data;
      })(options);
    },

    _dispatch: function(options) {
      // 拷贝默认参数
      this._mergeOpt(options);

      // 未开启代理
      if (!util.PROXY_ENABLED) {
        return;
      }

      // 模拟环境下
      if (util.ENV === util.SIMULATION) {
        return;
      }

      var baseUri = options.baseUri;

      // 存在白名单
      if (util.PROXY_WHITELIST) {
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

      // 开始设置 dispatcher

      var api = '/' + baseUri[2];
      var uriVar;
      var replacement = options.replacement;

      if (options.uri) {
        uriVar = this.get('uriVar');

        api += '/{' + uriVar + '}';

        if (!replacement) {
          replacement = {};
        }

        replacement[uriVar] = options.uri;
      }

      if (options.data && !/^POST|PATCH|PUT$/i.test(options.type)) {
        api = addParam(api, options.data);
      }

      if (options.additional) {
        api = addParam(api, options.additional);
      }

      var dispatcher = JSON.stringify({
        'host': baseUri[0].replace(/^(?:https?:)?\/\//i, ''),
        'ver': baseUri[1],
        'api': api,
        'var': replacement,
        'module': this.get('module')
      });

      baseUri[0] = util.LOC_ORIGIN;
      baseUri[1] = util.PROXY_VERSION;
      baseUri[2] = util.PROXY_PREFIX + '/' + baseUri[2];

      return dispatcher;
    },

    _mergeOpt: function(options) {
      if (!options.done) {
        options.done = this.get('done');
      }

      if (!options.fail) {
        options.fail = this.get('fail');
      }

      if (!options.always) {
        options.always = this.get('always');
      }

      if (!options.baseUri) {
        // copy
        options.baseUri = this.get('baseUri').slice();
      }
    }
  });

};
