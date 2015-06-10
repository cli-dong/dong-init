'use strict';

var AutoComplete = require('nd-autocomplete');

var util = require('../../../../../mod/util');
var userModel = require('../../../../../mod/model/uc/org/user');
var autoComplete;

var keyPrefix = 'USERS-';

// 过滤原始 user 数据，获取 autocomplete 必要内容
function filtUserData(oriUserData) {
  return oriUserData.map(function(user) {
    return {
      value: user['user_id'],
      label: user['user_id'] + ' ' + user['nick_name'],
      alias: [user['nick_name_full'], user['nick_name_short'], user['nick_name']]
    };
  });
}

// 使用 autocomplete
function setAutocomplete(users) {
  autoComplete = new AutoComplete({
    trigger: '#grid-add-item-user_id',
    dataSource: users
  }).render();
}

//获取用户数据
function getUsers(orgId) {
  //替换URL中的org_id
  var replacement = {
    'org_id': orgId
  };

  userModel.on('all', function(type, options) {
    options.replacement = replacement;
  });

  //获取组织用户数据
  userModel.LIST({
    data: {
      $offset: 0,
      $limit: 10000
    }
  }).done(function(data) {
    if (data.items && data.items.length) {
      var thinUser = filtUserData(data.items);

      util.session.set(keyPrefix + orgId, thinUser);

      //设置autocomplete
      setAutocomplete(thinUser);
    } else {
      console.error('无法获取用户列表');
    }
  }).fail(function() {
    console.error('无法获取用户列表');
  });
}

function makeOptions() {
  var options = {

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
        var orgId = util.user.get('org_exinfo', 'org_id');
        var localUser = util.session.get(keyPrefix + orgId);

        if (localUser) {
          setAutocomplete(localUser);
        } else {
          getUsers(orgId);
        }

        if (autoComplete) {
          this.before('destroy', function() {
            autoComplete.destroy();
          });
        }
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

  return options;
}

module.exports = function() {

  this.setOptions(makeOptions());

  // return false, will prevent starter

};
