'use strict';

var Router = require('nd-router');

module.exports = function(util) {

  var isLogin = util.auth.isLogin();

  function updateSidebar(id) {
    util.layout.render('sidebar', id);
  }

  function cleanup() {
    // loading
    util.$('#main').addClass('route-loading');
  }

  function startup(id, params) {
    var _isLogin = util.auth.isLogin();

    // 登录状态变化
    if (isLogin !== _isLogin) {
      isLogin = _isLogin;

      // 重新渲染
      util.layout.render();
    }

    // loading
    util.$('#main').removeClass('route-loading');

    util.use(id, params);
  }

  var route = util.route = new Router();

  util.redirect = function(value) {
    setTimeout(function() {
      route.setRoute(value);
    }, 80);
  };

  util.getPath = function() {
    return route.getRoute().join(route.delimiter);
  };

  route.mount({
    '([^!]+)[!]?(.+)?': function(id) {
      if (util.auth.isLogin()) {
        if (id === 'login') {
          util.redirect('home');
          return false;
        }
      } else {
        if (id !== 'login' && id !== 'logout') {
          util.redirect('login');
          return false;
        }
      }
    }
  });

  route.configure({
    before: function(id) {
      // 纯数字，左侧分类切换
      if (!isNaN(id)) {
        updateSidebar(id);
        // prevent on
        return false;
      }

      cleanup();
    },
    on: function(id, params) {
      startup(id, params);
      updateSidebar(id);
    },
    notfound: function() {
      util.redirect('error/404');
    }
  });

  route.init();

};
