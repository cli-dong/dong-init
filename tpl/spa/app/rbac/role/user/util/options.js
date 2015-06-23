'use strict';

var AutoComplete = require('nd-autocomplete');

var util = require('../../../../../mod/util');
var ucOrgUser = require('../../../../../mod/model/uc/org/user');

var users;

// 获取用户数据
function getUsers(query, done) {
  // 如果已在内存中
  if (users) {
    return done(users);
  }

  // 如果已在本地存储中
  var orgId = util.auth.getAuth('user_info', 'org_exinfo', 'org_id');
  var key = 'USERS-' + orgId;

  users = util.session.get(key);

  if (users) {
    return done(users);
  }

  ucOrgUser.on('GET', function(options) {
    options.replacement = {
      'org_id': orgId
    };
  });

  // 获取组织用户数据（全量）
  ucOrgUser.LIST({
    data: {
      $offset: 0,
      $limit: 10000
    }
  }).done(function(data) {
    if (data.items && data.items.length) {
      users = data.items.map(function(user) {
        return {
          value: user['user_id'],
          label: user['user_id'] + ' ' + user['nick_name'],
          alias: [user['nick_name_full'], user['nick_name_short'], user['nick_name']]
        };
      });
      done(users);
      util.session.set(key, users);
    } else {
      console.error('无法获取用户列表');
    }
  }).fail(function() {
    console.error('无法获取用户列表');
  });
}

// 使用 autocomplete
function setAutoComplete(form, field) {
  var autoComplete = new AutoComplete({
    trigger: field,
    dataSource: getUsers
  }).render();

  form.before('destroy', function() {
    autoComplete.destroy();
  });
}

function makeOptions() {
  return {

    // 交互模式
    interact: {
      type: 'dialog',
      title: '新增用户'
    },

    // 表单选项
    view: {
      // method: 'POST',

      formData: {},

      outFilter: function(data) {
        //用户id
        if (data['user_id']) {
          var p = data['user_id'].indexOf(' ');
          if (p !== -1) {
            data['user_id'] = data['user_id'].slice(0, p);
          }
        }

        return data;
      },

      afterRender: function() {
        setAutoComplete(this, this.getField('user_id'));
      },

      fields: [{
        name: 'user_id',
        label: 'ID',
        attrs: {
          placeholder: '用户 ID',
          maxlength: 30,
          size: 20,
          required: 'required'
        }
      }]
    }
  };
}

module.exports = function() {

  this.setOptions(makeOptions());

  // return false, will prevent starter

};
