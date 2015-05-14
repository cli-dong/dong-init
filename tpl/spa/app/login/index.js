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

      fields: [{
        name: 'login_name',
        value: '980071@nd',
        attrs: {
          placeholder: '帐号',
          maxlength: 32,
          required: 'required',
          'data-display': '帐号'
        }
      }, {
        name: 'password',
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

      outFilter: function(data) {
        data.password = md5(data.password);
        return data;
      },

      parentNode: '#main'
    })
    .on('formSubmit', function() {
      // 调用队列
      this.submit(function(data) {
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
