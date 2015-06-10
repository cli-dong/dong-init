'use strict';

var $ = require('jquery');

var Grid = require('nd-grid');

var ucRoleUserModel = require('../../../../mod/model/uc/role/user');
var ucUserRoleModel = require('../../../../mod/model/uc/user/role');

module.exports = function() {
  var plugin = this,
    host = plugin.host,
    uniqueId;

  // 列表
  ucRoleUserModel.on('GET', function(options) {
    options.replacement = {
      'role_id': uniqueId
    };
  });

  // 新增
  ucRoleUserModel.on('POST', function(options) {
    // 替换
    options.baseUri = ucUserRoleModel.get('baseUri');
    options.replacement = {
      'user_id': options.data['user_id']
    };

    options.uri = uniqueId;

    delete options.data;
  });

  // 删除
  ucRoleUserModel.on('DELETE', function(options) {
    // 替换
    options.baseUri = ucUserRoleModel.get('baseUri');
    options.replacement = {
      'user_id': options.uri
    };

    options.uri = uniqueId;
  });

  function makeGrid(realm) {
    return new Grid($.extend(true, {
      realm: realm,
      proxy: ucRoleUserModel,
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
        },
        paginate: [function() {
          this.setOptions('view', {
            theme: 'none'
          });
        }]
      },
      // 列表加载完毕，重新定位 dialog
      afterRenderPartial: function() {
        this.dialog && this.dialog.show();
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

    grid.element.show();
  });

  plugin.on('hide', function(grid) {
    if (!this.getOptions('interact')) {
      host.element.show();
    }

    grid.destroy();
    delete plugin.exports;
  });

  // 通知就绪
  this.ready();
};
