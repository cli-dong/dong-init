'use strict';

var Form = require('nd-form');
var Validator = require('nd-validator');
var md5 = require('nd-md5');

var ucTokenModel = require('../../mod/model/uc/token');
var ucUserModel = require('../../mod/model/uc/user');
var rbacAuthModel = require('../../mod/model/rbac/auth');

module.exports = function(util) {

  var awaiting;

  function getUser(token, done, fail) {
    ucUserModel
      .GET(token.userId)
      .done(function(data) {
        // 保存用户数据
        util.auth.setAuth({
          userinfo: data
        });
        done();
      })
      .fail(function(error) {
        util.console.error(error);
        fail();
      });
  }

  function getAuth(token, done, fail) {
    rbacAuthModel.GET()
      .done(function(data) {
        util.auth.setAuth(data);
        done();
      })
      .fail(function(error) {
        util.console.error(error);
        fail();
      });
  }

  // 检查是否有访问权限
  function checkAuth(token) {
    // 保存
    util.auth.setTokens(token);

    function done() {
      // 跳转
      util.redirect('home');
      awaiting = false;
    }

    function fail() {
      // 清理
      util.auth.destroy();
      // 拒绝
      util.console.error('没有权限');
      awaiting = false;
    }

    token = {
      userId: token['user_id']
    };

    // 已开启基于角色的权限控制
    if (util.RBAC_ENABLED) {
      // 本地获取权限后进入
      getAuth(token, done, fail);
    } else {
      // 获取用户信息后进入
      getUser(token, done, fail);
    }
  }

  var instance = new Form({
      className: 'ui-form-login',
      plugins: [Validator],

      fields: [{
        icon: 'user',
        name: 'login_name',
        attrs: {
          placeholder: '帐号',
          maxlength: 41,
          required: 'required',
          pattern: '^[_0-9a-zA-Z]{1,20}@[_0-9a-zA-Z]{1,20}$',
          'data-display': '帐号'
        },
        messages: {
          pattern: '格式：用户@组织'
        }
      }, {
        icon: 'lock',
        name: 'password',
        type: 'password',
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

      events: {
        'focus [name="password"]': function() {
          util.$('#container')
              .addClass('focused');
        },
        'blur [name="password"]': function() {
          util.$('#container')
              .removeClass('focused');
        }
      },

      parentNode: '#main'
    })
    .on('formSubmit', function() {

      this.submit(function(data) {
        if (awaiting) {
          return;
        }

        awaiting = true;

        ucTokenModel.POST({
            data: data
          })
          .done(function(data) {
            checkAuth(data);
          })
          .fail(function(error) {
            util.console.error(error);
            awaiting = false;
          });
      });

      // 阻止默认事件发生
      return false;
    })
    .render();

  // 面包屑导航
  util.bread.set([]);

  // 返回垃圾回收
  // 否则内存泄漏
  return function() {
    instance.destroy();
  };
};
