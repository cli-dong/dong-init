'use strict';

var Grid = require('nd-grid');

var util = require('../../../../mod/util');

// authed
var rbacRoleApiModel = require('../../../../mod/model/rbac/role/api');
// entire
var rbacRoleApiAllModel = require('../../../../mod/model/rbac/role/apiall');

module.exports = function() {
  var plugin = this,
    host = plugin.host,
    uniqueId;

  var lazySave = (function() {
    var t;

    return function(callback) {
      if (t) {
        clearTimeout(t);
      }

      t = setTimeout(callback, 500);
    };
  })();

  function makeGrid() {
    return new Grid(util.$.extend(true, {
        proxy: rbacRoleApiAllModel,
        mode: 2,
        theme: 'card',
        uniqueId: 'api',
        entryKey: null,
        labelMap: {
          'level': '标识符',
          'api': '地址',
          'name': '备注'
        },
        checkable: true,
        pluginCfg: {
          back: {
            disabled: false
          }
        },
        events: {
          'change [name="check-item"]': function() {
            // 延迟提交，避免多次提交
            lazySave(function() {
              var apis = util.$.map(
                this.$('[name="check-item"]:checked'),
                function(item) {
                  return item.value;
                });
              var _apis = [];

              this.get('originData').items.forEach(function(item) {
                if (apis.indexOf(item.api) !== -1) {
                  _apis.push(item);
                }
              });

              rbacRoleApiModel.POST({
                data: {
                  // apis: apis
                  apis: _apis
                },
                replacement: {
                  'role_id': uniqueId
                }
              });
            }.bind(this));
          }
        },
        beforeRenderPartial: function(itemList) {
          if (util.auth.getAuth('apis')) {
            itemList.forEach(function(item) {
              if (util.auth.hasAuth(item.level.value)) {
                item.checked = true;
              }
            });
          }
        },
        parentNode: host.get('parentNode')
      }, plugin.getOptions('view')));
  }

  host.addItemAction({
    'role': 'role-auth',
    'text': '查看权限'
  });

  // 按钮事件
  host.delegateEvents({
    'click [data-role="role-auth"]': function(e) {
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
      route: null,
      title: '权限列表'
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
