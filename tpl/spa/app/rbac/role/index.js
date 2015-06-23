'use strict';

var Grid = require('nd-grid');
var datetime = require('nd-datetime');

var rbacRoleModel = require('../../../mod/model/rbac/role');

module.exports = function(util) {
  if (!util.auth.hasAuth('=8')) {
    return util.redirect('error/403');
  }

  var instance = new Grid({
    parentNode: '#main',
    proxy: rbacRoleModel,
    mode: util.RBAC_ENABLED ? 2 : 0,
    autoload: util.RBAC_ENABLED,
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
    plugins: [{
      name: 'roleUser',
      starter: require('./user/starter')
    }, {
      name: 'roleAuth',
      starter: require('./auth/starter')
    }],
    pluginCfg: {
      addItem: {
        disabled: false,
        listeners: {
          start: require('./add/start')
        }
      },
      editItem: {
        disabled: false,
        listeners: {
          start: require('./edit/start')
        }
      },
      search: {
        disabled: util.RBAC_ENABLED,
        listeners: {
          start: require('./search/start')
        }
      }
    }
  }).render();

  if (!util.RBAC_ENABLED) {
    // 新增
    // RISK: 如果多次调用，会多次绑定
    rbacRoleModel.on('POST', function(options) {
      options.data.realm = instance.get('params').realm;
    });
  }

  // 面包屑导航
  util.bread.set(
    [{
      title: '权限管理'
    }, {
      title: '角色列表'
    }]
  );

  // 返回垃圾回收
  // 否则内存泄漏
  return function() {
    instance.destroy();
  };

};
