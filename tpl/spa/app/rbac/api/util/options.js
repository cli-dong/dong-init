'use strict';

module.exports = function() {

  this.setOptions({
    // 交互模式
    interact: {
      type: 'dialog',
      title: '新增接口'
    },

    // 表单选项
    view: {
      formData: {},

      fields: [{
        name: 'level',
        label: '标识',
        attrs: {
          placeholder: '接口标识，如：role/post',
          maxlength: 30,
          required: 'required',
          pattern: '^[a-z]+(/[a-z]+)?$'
        },
        messages: {
          pattern: '要求 module/action 格式'
        }
      }, {
        name: 'api',
        label: '地址',
        attrs: {
          placeholder: '接口地址，如：[POST]/roles',
          maxlength: 50,
          required: 'required',
          pattern: '^\\[(?:DELETE|GET|PATCH|POST|PUT)\\](?:\\/[_0-9a-zA-Z\\{\\}]+)+$'
        },
        messages: {
          pattern: '要求 [http_method]/request_uri 格式'
        }
      }, {
        name: 'name',
        label: '备注',
        attrs: {
          maxlength: 50,
          required: 'required'
        }
      }]
    }
  });

  // return false, will prevent starter

};
