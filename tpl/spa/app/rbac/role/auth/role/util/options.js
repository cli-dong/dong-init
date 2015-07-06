'use strict';

function makeOptions() {
  var options = {

    // 交互模式
    interact: {
      type: 'dialog',
      title: '新增角色'
    },

    // 表单选项
    view: {
      formData: {},

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

  return options;
}

module.exports = function() {
  this.setOptions(makeOptions());

  // return false, will prevent starter

};
