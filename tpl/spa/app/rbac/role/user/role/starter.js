'use strict';

var $ = require('jquery');

var Grid = require('nd-grid');
var datetime = require('nd-datetime');

var util = require('../../../../../mod/util');

var RbacUserRoleModel = require('../../../../../mod/model/rbac/user/role');

module.exports = function() {
  var plugin = this,
    host = plugin.host,
    uniqueId;

  function makeGrid() {
    return new Grid($.extend(true, {
      proxy: new RbacUserRoleModel()
        .on('all', function(type, options) {
          options.replacement = {
            'user_id': uniqueId
          };
        }),
      mode: 2,
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

    // 面包屑导航
    util.bread.push({
      title: host.getItemDataById(uniqueId, true)['nick_name']
    }, {
      title: '角色列表'
    });

    grid.element.show();
  });

  plugin.on('hide', function(grid) {
    if (!this.getOptions('interact')) {
      host.element.show();
    }

    // 面包屑导航
    util.bread.splice(-2);

    grid.destroy();
    delete plugin.exports;
  });

  // 通知就绪
  this.ready();
};
