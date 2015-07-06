'use strict';

var Grid = require('nd-grid');

var util = require('../../../../mod/util');

var rbacRoleUserModel = require('../../../../mod/model/rbac/role/user');

module.exports = function() {
  var plugin = this,
    host = plugin.host,
    uniqueId;

  rbacRoleUserModel.on('all', function(type, options) {
    options.replacement = {
      'role_id': uniqueId
    };
  });

  function makeGrid(realm) {
    return new Grid(util.$.extend(true, {
      realm: realm,
      proxy: rbacRoleUserModel,
      mode: 2,
      // params: {
      //   $limit: 50,
      //   $offset: 0
      // },
      uniqueId: 'user_id',
      entryKey: null,
      labelMap: {
        'nick_name': '昵称',
        'user_id': 'ID',
        'user_name': '用户名'
      },
      plugins: [{
        name: 'userRole',
        starter: require('./role/starter')
      }],
      pluginCfg: {
        addItem: {
          disabled: false,
          listeners: {
            start: require('./add/start')
          }
        },
        delItem: {
          disabled: false
        },
        back: {
          disabled: false
        }
      },
      parentNode: host.get('parentNode')
    }, plugin.getOptions('view')));
  }

  host.addItemAction({
    'role': 'role-user',
    'text': '查看用户'
  });

  // 按钮事件
  host.delegateEvents({
    'click [data-role="role-user"]': function(e) {
      if (!plugin.exports) {
        uniqueId = host.getItemIdByTarget(e.currentTarget);

        plugin.exports = makeGrid(
          host.get('params').realm
        ).render();

        plugin.exports.on('hide', function() {
          plugin.trigger('hide', plugin.exports);
        });
      }

      plugin.trigger('show', plugin.exports);
    }
  });

  host.before('destroy', function() {
    plugin.exports && plugin.exports.destroy();
  });

  plugin.on('show', function(grid) {
    if (!this.getOptions('interact')) {
      host.element.hide();
    }

    // 面包屑导航
    util.bread.push({
      route: null,
      title: '用户列表'
    });

    grid.element.show();
  });

  plugin.on('hide', function(grid) {
    if (!this.getOptions('interact')) {
      host.element.show();
    }

    // 面包屑导航
    util.bread.pop();

    grid.destroy();
    delete plugin.exports;
  });

  // 通知就绪
  this.ready();
};
