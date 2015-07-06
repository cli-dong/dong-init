'use strict';

var Grid = require('nd-grid');

var RbacApiModel = require('../../../mod/model/rbac/api');

module.exports = function(util) {
  if (!util.auth.hasAuth('=9')) {
    return util.redirect('error/403');
  }

  var instance = new Grid({
    parentNode: '#main',
    proxy: new RbacApiModel(),
    mode: 2,
    // theme: 'card',
    uniqueId: 'id',
    entryKey: null,
    labelMap: {
      // 'id': 'ID',
      'module': '模块',
      'name': '名称',
      'api': '地址',
      'level': '标识符'
    },
    checkable: false,
    plugins: [{
      name: 'batch-add',
      starter: require('./batch/starter')
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
      delItem: {
        disabled: false
      }
    }
  }).render();

  // 面包屑导航
  util.bread.set(
    [{
      title: '权限管理'
    }, {
      title: '接口列表'
    }]
  );

  // 返回垃圾回收
  return function() {
    instance.destroy();
  };
};
