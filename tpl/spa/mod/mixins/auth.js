'use strict';

var Sha = require('nd-sha');
var datetime = require('nd-datetime');

module.exports = function(util) {

  var storage = util.storage;

  var tokensKey = 'AUTH-TOKENS';
  var authKey = 'AUTH-AUTH';

  var tokensObj;
  var authObj;

  function nonce() {
    function rnd(min, max) {
      var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

      var range = max ? max - min : min,
        str = '',
        i,
        length = arr.length - 1;

      for (i = 0; i < range; i++) {
        str += arr[Math.round(Math.random() * length)];
      }

      return str;
    }

    return new Date().getTime() + ':' + rnd(8);
  }

  function convert(apis) {
    return apis && apis.map(function(api) {
      return api.level;
    }).join(',');
  }

  function getRegexp(level) {
    return new RegExp('(,|\\b)' + level);
  }

  util.auth = {

    isLogin: function() {
      return !!this.getTokens();
    },

    /**
     * @param  {string}  level 接口标识符或权限等级
     * @return {boolean}
     */
    hasAuth: function(level) {
      // 未登录，或登录失效
      if (!this.isLogin) {
        return false;
      }

      // 未启用 RBAC
      if (!util.RBAC_ENABLED) {
        return true;
      }

      var auth = this.getAuth();

      if (!auth) {
        return false;
      }

      var apis = auth.apis;

      // 接口标识符
      // 支持“|”分隔，代表“或”
      return level.split('|').some(function(level) {
        if (/\D/.test(level)) {
          return apis && getRegexp(level).test(apis);
        } else {
          return auth.level >= level;
        }
      });
    },

    setAuth: function(auth) {
      authObj = auth;

      if (auth === null) {
        storage.remove(authKey);
      } else {
        auth.apis = convert(auth.apis);
        storage.set(authKey, auth);
      }
    },

    getAuth: function() {
      var auth = authObj;

      if (!auth) {
        auth = storage.get(authKey);

        if (auth) {
          authObj = auth;
        }
      }

      if (auth) {
        var args = Array.prototype.slice.call(arguments);
        var key;

        while ((key = args.shift()) && auth) {
          auth = auth[key];
        }
      }

      return auth;
    },

    getTokens: function(key) {
      var tokens = tokensObj;

      if (!tokens) {
        // 本地存储
        tokens = storage.get(tokensKey);
      }

      if (tokens) {
        // 失效判断
        if (datetime(tokens['expires_at']).toNumber() <= datetime().toNumber()) {
          this.setTokens(tokens = null);
        }
      }

      if (tokens) {
        tokensObj = tokens;
      }

      if (key && tokens) {
        return tokens[key];
      }

      return tokens;
    },

    /**
     * 设置或清除 tokens
     * @param {object} tokens token值
     */
    setTokens: function(tokens) {
      tokensObj = tokens;

      if (tokens === null) {
        storage.remove(tokensKey);
      } else {
        storage.set(tokensKey, tokens);
      }
    },

    destroy: function() {
      this.setTokens(null);
      this.setAuth(null);
    },

    _getAccessToken: function() {
      return this.getTokens('access_token');
    },

    _getMacContent: function(method, url, host) {
      return [this.nonce, method, url, host, ''].join('\n');
    },

    _getMac: function(method, url, host) {
      return new Sha(this._getMacContent(method, url, host), 'TEXT')
        .getHMAC(this.getTokens('mac_key'), 'TEXT', 'SHA-256', 'B64');
    },

    _getNonce: function() {
      return (this.nonce = nonce());
    },

    getAuthentization: function(method, url, host) {
      return ['MAC id="' + this._getAccessToken() + '"',
        'nonce="' + this._getNonce() + '"',
        'mac="' + this._getMac(method, url, host) + '"'
      ].join(',');
    }

  };

};
