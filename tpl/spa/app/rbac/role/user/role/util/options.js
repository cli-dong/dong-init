'use strict';

var AutoComplete = require('nd-autocomplete');

var util = require('../../../../../../mod/util');
var rbacRoleModel = require('../../../../../../mod/model/rbac/role');

var roles;

// 获取用户数据
function getRoles(query, done) {
  // 如果已在内存中
  if (roles) {
    return done(roles);
  }

  // 如果已在本地存储中
  var orgId = util.auth.getAuth('user_info', 'org_exinfo', 'org_id');
  var key = 'ROLES-' + orgId;

  roles = util.session.get(key);

  if (roles) {
    return done(roles);
  }

  // 获取组织用户数据（全量）
  rbacRoleModel.LIST()
  .done(function(data) {
    if (data.items && data.items.length) {
      roles = data.items.map(function(role) {
        return {
          value: role['role_id'],
          label: role['role_id'] + ' ' + role['role_name'],
          alias: [role['role_name'], role['remarks']]
        };
      });
      done(roles);
      util.session.set(key, roles);
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
    dataSource: getRoles
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
      title: '新增角色'
    },

    // 表单选项
    view: {
      formData: {},

      outFilter: function(data) {
        //用户id
        if (data['role_id']) {
          var p = data['role_id'].indexOf(' ');
          if (p !== -1) {
            data['role_id'] = data['role_id'].slice(0, p);
          }
        }

        return data;
      },

      afterRender: function() {
        setAutoComplete(this, this.getField('role_id'));
      },

      fields: [{
        name: 'role_id',
        label: 'ID',
        attrs: {
          placeholder: '角色 ID',
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
