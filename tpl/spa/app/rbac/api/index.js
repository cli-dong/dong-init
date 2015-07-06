'use strict';

var Grid = require('nd-grid');

var rbacApiModel = require('../../../mod/model/rbac/api');

module.exports = function(util) {
  if (!util.auth.hasAuth('9')) {
    return util.redirect('error/403');
  }

  var instance = new Grid({
    parentNode: '#main',
    className: 'ui-grid-apis',
    proxy: rbacApiModel,
    mode: 2,
    theme: 'card',
    uniqueId: 'api',
    entryKey: null,
    labelMap: {
      'level': '标识',
      'api': '地址',
      'name': '备注'
    },
    checkable: false,
    pluginCfg: {
      addItem: {
        disabled: false,
        listeners: {
          start: require('./add/start')
        }
      },
      delItem: {
        disabled: false,
        listeners: {
          ready: require('./del/ready')
        }
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
