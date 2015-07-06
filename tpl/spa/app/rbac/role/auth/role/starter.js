'use strict';

var $ = require('jquery');

var Grid = require('nd-grid');
var datetime = require('nd-datetime');

var ucUserRoleModel = require('../../../../../mod/model/uc/user/role');

module.exports = function() {
  var plugin = this,
    host = plugin.host,
    uniqueId;

  // 列表
  ucUserRoleModel.on('GET', function(options) {
    options.data['realm'] = host.get('realm');
    options.replacement = {
      'user_id': uniqueId
    };
  });

  // 新增
  ucUserRoleModel.on('POST', function(options) {
    options.replacement = {
      'user_id': uniqueId
    };

    options.uri = options.data['role_id'];

    delete options.data;
  });

  // 删除
  ucUserRoleModel.on('DELETE', function(options) {
    options.replacement = {
      'user_id': uniqueId
    };
  });

  function makeGrid() {
    return new Grid($.extend(true, {
      proxy: ucUserRoleModel,
      uniqueId: 'role_id',
      entryKey: null,
      labelMap: {
        'role_id': 'ID',
        'role_name': '名称',
        'remarks': '备注',
        'is_default': '默认角色',
        // 0-NONE,1-READ,2-ADD,3-WRITE,4-DELETE
        'auth_extra': '权限扩展',
        'updated_at': '更新时间'
      },
      adapters: function(key, value) {
        switch (key) {
          case 'is_default':
            return value ? '是' : '否';
          case 'auth_extra':
            return ['NONE', 'READ', 'ADD', 'WRITE', 'DELETE'][value];
          case 'updated_at':
            return datetime(value).format();
          default:
            return value;
        }
      },
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
      // 列表加载完毕，重新定位 dialog
      afterRenderPartial: function() {
        this.dialog && this.dialog.show();
      },
      parentNode: host.get('parentNode')
    }, plugin.getOptions('view')));
  }

  host.addItemAction({
    'role': 'user-role',
    'text': '查看用户拥有的角色'
  });

  // 按钮事件
  host.delegateEvents({
    'click [data-role="user-role"]': function(e) {
      if (!plugin.exports) {
        uniqueId = host.getItemIdByTarget(e.currentTarget);
        plugin.exports = makeGrid().render();

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
