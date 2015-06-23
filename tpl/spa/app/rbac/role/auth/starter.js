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
    uniqueId,
    awaiting;

  var lazySave = (function() {
    var t;

    return function(callback) {
      if (t) {
        clearTimeout(t);
      }

      t = setTimeout(callback, 500);
    };
  })();

  function makeGrid(apiArr) {
    return new Grid(util.$.extend(true, {
      className: 'ui-grid-apis',
      proxy: rbacRoleApiAllModel,
      mode: 2,
      // theme: 'card',
      uniqueId: 'api',
      entryKey: null,
      labelMap: {
        'name': '名称',
        'api': '地址',
        'level': '标识符'
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
            }).done(function(/*data*/) {
              util.console.success('成功设置用户权限');
            }).fail(function(error) {
              util.console.error(error);
            });
          }.bind(this));
        }
      },
      beforeRenderPartial: function(itemList) {
        if (apiArr && apiArr.length) {
          var checked = 0;
          itemList.forEach(function(item) {
            if (apiArr.indexOf(item.api.value) !== -1) {
              item.checked = true;
              ++checked;
            }
          });
          if (checked === itemList.length) {
            // all checked
            this.set('checked', true);
          }
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
      if (awaiting) {
        return;
      }

      if (!plugin.exports) {
        // 添加用于阻止多次点击
        awaiting = true;

        uniqueId = host.getItemIdByTarget(e.currentTarget);

        rbacRoleApiModel.GET({
          replacement: {
            'role_id': uniqueId
          }
        })
        .done(function(data) {

          plugin.exports = makeGrid(data.items.map(function(item) {
            return item.api;
          })).render();

          plugin.exports.on('hide', function() {
            plugin.trigger('hide', plugin.exports);
          });

          plugin.trigger('show', plugin.exports);
        })
        .fail(function(error) {
          util.console.error(error);
        })
        .always(function() {
          awaiting = false;
        });
      } else {
        plugin.trigger('show', plugin.exports);
      }
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
      title: host.getItemDataById(uniqueId, true)['role_name']
    }, {
      title: '权限列表'
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
