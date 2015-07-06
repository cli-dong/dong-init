'use strict';

var Widget = require('nd-widget');
var Template = require('nd-template');

var Sidebar = Widget.extend({
  Implements: [Template],

  attrs: {
    template: require('./sidebar.handlebars'),
    model: {}
  }
});

var instance;

exports.render = function(util, id) {
  var isLogin = util.auth.isLogin();
  var folders = [];

  if (isLogin) {
    folders = util.SIDEBAR_ROUTES;

    if (util.RBAC_ENABLED) {
      // 拷贝
      folders = util.$.extend(true, [], folders);
      // 根据权限过滤模块
      folders = folders.filter(function(folder) {
        folder.routes = folder.routes.filter(function(route) {
          return !route.level || util.auth.hasAuth(route.level, route.module);
        });

        // 有可用的模块（route）
        return !!folder.routes.length;
      });
    }

    // highlight active folder and route
    if (typeof id !== 'undefined') {
      if (isNaN(id)) {
        folders.forEach(function(folder) {
          var found;

          folder.routes.forEach(function(route) {
            if (route.route === id) {
              route.active = found = true;
            } else {
              route.active = false;
            }
          });

          folder.active = found;
        });
      } else {
        folders.forEach(function(folder, index) {
          folder.active = (index === +id);
        });
      }
    }
  }

  if (instance) {
    instance.destroy();
  }

  instance = new Sidebar({
    parentNode: '#sidebar',
    model: {
      folders: folders,
      visible: isLogin
    }
  }).render();
};
