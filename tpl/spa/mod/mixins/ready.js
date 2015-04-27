'use strict';

var $ = require('jquery');

var render = require('../layout/main').render;
var ucUserModel = require('../model/uc/user');

var layoutReady;

module.exports = function(util) {

  function renderLayout(authed) {
    if (!authed) {
      util.user.set(null);
      layoutReady = true;
      // 重新渲染“头尾侧”
      return render(util);
    }

    if (util.user.get()) {
      layoutReady = true;
      return render(util);
    }

    layoutReady = false;

    ucUserModel.GET(util.auth.getTokens('user_id'))
      .done(function(data) {
        util.user.set(data);
      })
      .fail(function() {
        util.user.set(null);
      })
      .always(function() {
        layoutReady = true;
        // 渲染“头尾侧”
        render(util);
      });
  }

  var saveCurrent = (function() {
    var curRoute = $([]);
    var curFolder = $([]);

    // handles folder
    function f(_curFolder) {
      if (_curFolder.length) {
        if (curFolder[0] !== _curFolder[0]) {
          curFolder.removeClass('folder-active');
          curFolder = _curFolder;
          curFolder.addClass('folder-active');
        }
      } else {
        if (curFolder.length) {
          curFolder.removeClass('folder-active');
        }
      }
    }

    return function(id) {
      (function call(back) {
        if (layoutReady) {
          back();
        } else {
          setTimeout(function() {
            call(back);
          }, 80);
        }
      })(isNaN(id) ? function() {
        var _curRoute = $('[data-route="' + id + '"]');

        if (_curRoute.length) {
          curRoute.removeClass('route-active');
          curRoute = _curRoute;
          curRoute.addClass('route-active');

          f(curRoute.closest('[data-folder]'));
        }
      } : function() {
        f($('[data-folder="' + id + '"]'));
      });
    };
  })();

  var main = $('#main');

  var authed = util.auth.isAuthed();

  function cleanup() {
    // 清理 HTML
    main.empty();

    // loading
    main.addClass('route-loading');
  }

  function startup(id) {
    var _authed = util.auth.isAuthed();

    // 登录状态变化
    if (authed !== _authed) {
      authed = _authed;

      renderLayout(authed);
    }

    // loading
    main.removeClass('route-loading');

    util.use(id);
  }

  renderLayout(authed);

  /****************************
   * Router Configuration
   */
  util.route.mount({
    '(.+)': function(id) {
      if (util.auth.isAuthed()) {
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

  util.route.configure({
    // html5history: true,
    before: function(id) {
      // 纯数字，左侧分类切换
      if (!isNaN(id)) {
        saveCurrent(id);
        // prevent on
        return false;
      }

      cleanup(id);
    },
    on: function(id) {
      startup(id);
      saveCurrent(id);
    }
  });

  util.route.init();
  /**
   * End of Router Configuration
   ****************************/

  util.ready = function(callback) {
    util.use(callback);
  };

};
