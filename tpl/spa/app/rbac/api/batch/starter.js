'use strict';

var FormExtra = require('nd-form-extra');

var util = require('../../../../mod/util');
var RbacApiBatchModel = require('../../../../mod/model/rbac/api/batch');

module.exports = function() {
  var plugin = this,
    host = plugin.host,
    awaiting;

  plugin.setOptions('interact', {
    type: 'dialog',
    title: '批量添加接口'
  });

  function makeForm() {
    return new FormExtra(util.$.extend(true, {
        name: 'grid-batch-add-item',
        method: 'POST',
        fields: [{
          name: 'apis',
          label: 'APIs',
          type: 'textarea',
          attrs: {
            required: true,
            rows: 10
          }
        }],
        parentNode: host.get('parentNode')
      }, plugin.getOptions('view')))
      .on('formCancel', function() {
        plugin.trigger('hide', this);
      })
      .on('formSubmit', function() {
        // 调用队列
        this.submit(function(data) {
          plugin.trigger('submit', data, function() {
            awaiting = false;
          });
        });
        // 阻止默认事件发生
        return false;
      });
  }

  host.addGridAction(util.$.extend({
    role: 'batch-add',
    text: '批量添加'
  }, plugin.getOptions('button')), function() {
    if (!plugin.exports) {
      plugin.exports = makeForm().render();
    }

    plugin.trigger('show', plugin.exports);
  });

  host.before('destroy', function() {
    plugin.exports && plugin.exports.destroy();
  });

  plugin.on('show', function(form) {
    if (!this.getOptions('interact')) {
      host.element.hide();
    }

    form.element.show();
  });

  plugin.on('hide', function(form) {
    if (!this.getOptions('interact')) {
      host.element.show();
    }

    form.destroy();
    delete plugin.exports;
  });

  plugin.on('submit', function(data, done) {
    if (awaiting) {
      return;
    }

    if (!Array.isArray(data.apis)) {
      util.console.error('请输入 JSON 格式的 API 数组');
      return;
    }

    // 添加用于阻止多次点击
    awaiting = true;

    new RbacApiBatchModel().POST({
        data: data
      })
      .done(function( /*data*/ ) {
        // 成功，返回第一页
        host.getList({
          data: (function(mode) {
            switch (mode) {
              case 2:
                return {};
              case 1:
                return {
                  page: 0
                };
              default:
                return {
                  $offset: 0
                };
            }
          })(host.get('mode'))
        });

        // 隐藏
        plugin.trigger('hide', plugin.exports);
      })
      .fail(function(error) {
        util.console.error(error);
      })
      .always(done);
  });

  // 通知就绪
  this.ready();
};
