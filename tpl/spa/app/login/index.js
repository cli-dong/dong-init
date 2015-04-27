'use strict';

var Alert = require('nd-alert');
var Form = require('nd-form');
var Validator = require('nd-validator');
var md5 = require('nd-md5');

var util = require('../../mod/util');
var ucTokenModel = require('../../mod/model/uc/token');

util.ready(function() {
  var instance = new Form({
      className: 'ui-form-login',

      plugins: [Validator],

      pluginCfg: {
        Validator: {
          listeners: {
            start: function() {
              var plugin = this;

              plugin.on('export', function(instance) {
                // 异步，添加到队列
                plugin.host.queue.use(function(next) {
                  instance.execute(function(err) {
                    if (!err) {
                      next();
                    }
                  });
                });
              });
            }
          }
        }
      },

      fields: [{
        name: 'login_name',
        value: '980071',
        attrs: {
          placeholder: '帐号',
          maxlength: 32,
          required: 'required',
          'data-display': '帐号'
        }
      }, {
        name: 'password',
        // label: '密码',
        type: 'password',
        value: '123456',
        attrs: {
          placeholder: '密码',
          maxlength: 32,
          required: 'required',
          'data-display': '密码'
        }
      }],

      buttons: [{
        label: '登录',
        type: 'submit',
        role: 'form-submit'
      }],

      parentNode: '#main'
    })
    .on('formSubmit', function() {
      var that = this;
      // 调用队列
      this.queue.run(function() {
        var data = that.get('dataParser').call(that);

        data.password = md5(data.password);

        ucTokenModel.POST({
            data: data
          })
          .done(function(data) {
            // 保存
            util.auth.setTokens(data);
            // 跳转
            util.redirect('home');
          })
          .fail(function(error) {
            Alert.show(error);
          });
      });
      // 阻止默认事件发生
      return false;
    })
    .render();

  // 返回垃圾回收
  // 否则内存泄漏
  return function() {
    instance.destroy();
  };
});
