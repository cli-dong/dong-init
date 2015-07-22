'use strict';

var AutoComplete = require('nd-autocomplete');

var user = require('../../../../../mod/misc/user');

module.exports = function() {

  this.setOptions({

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
        var autoComplete = new AutoComplete({
          trigger: this.getField('user_id'),
          dataSource: user.getUsers
        }).render();

        this.before('destroy', function() {
          autoComplete.destroy();
        });
      },

      fields: [{
        name: 'user_id',
        label: '用户',
        attrs: {
          placeholder: 'ID、用户名、昵称（全拼或简拼）等',
          maxlength: 30,
          size: 20,
          required: 'required'
        }
      }]
    }
  });

  // return false, will prevent starter

};
