'use strict';

function makeOptions(type) {
  var options = {

    // 交互模式
    interact: {
      type: 'dialog',
      title: type === 'add' ? '新增角色' : '编辑角色'
    },

    // 操作按钮
    button: {
      disabled: type === 'add'
    },

    // 从列表取单项数据
    detail: {
      useLocal: type === 'edit'
    },

    // 表单选项
    view: {
      method: type === 'add' ? 'POST' : 'PUT',

      // 默认值
      formData: {
        'is_default': false,
        'auth_extra': 0
      },

      fields: [{
        name: 'role_name',
        label: '名称',
        attrs: {
          placeholder: '角色名称',
          maxlength: 30,
          size: 20,
          required: 'required'
        }
      }, {
        name: 'remarks',
        label: '备注',
        attrs: {
          placeholder: '备注',
          maxlength: 30,
          size: 20,
          required: 'required'
        }
      }, {
        name: 'is_default',
        label: '默认角色',
        type: 'radio',
        options: [{
          text: '是',
          value: true
        }, {
          text: '否',
          value: false
        }]
      }, {
        name: 'auth_extra',
        label: '权限扩展',
        type: 'radio',
        options: [{
          text: 'NONE',
          value: 0
        }, {
          text: 'READ',
          value: 1
        }, {
          text: 'ADD',
          value: 2
        }, {
          text: 'WRITE',
          value: 3
        }, {
          text: 'DELETE',
          value: 4
        }]
      }]
    }
  };

  return options;
}

module.exports = function(type) {

  if (type === 'add') {
    this.host.after('renderPartial', function(){
      this.$('[data-role="add-item"]').prop('disabled', false);
    });
  }

  this.setOptions(makeOptions(type));

  // return false, will prevent starter

};
