'use strict';

module.exports = function(type) {

  this.setOptions({
    // 交互模式
    interact: {
      type: 'dialog',
      title: type === 'add' ? '新增接口' : '编辑接口'
    },

    detail: {
      useLocal: type === 'edit'
    },

    // 表单选项
    view: {
      formData: {},

      method: type === 'add' ? 'POST' : 'PUT',

      fields: [{
        name: 'module',
        label: '模块',
        attrs: {
          placeholder: '服务模块，如：microblog、forum',
          maxlength: 30,
          required: 'required'
        }
      }, {
        name: 'name',
        label: '名称',
        attrs: {
          maxlength: 50,
          required: 'required'
        }
      }, {
        name: 'api',
        label: '地址',
        attrs: {
          placeholder: '接口地址，如：[POST]/roles',
          maxlength: 255,
          required: 'required',
          pattern: '^\\[(?:DELETE|GET|PATCH|POST|PUT)\\](?:\\/[_0-9a-zA-Z\\{\\}]+)+$'
        },
        messages: {
          pattern: '要求 [http_method]/request_uri 格式'
        }
      }, {
        name: 'level',
        label: '标识符',
        attrs: {
          placeholder: '接口标识，如：role/post',
          maxlength: 50,
          required: 'required',
          pattern: '^[a-z]+(/[a-z]+)*$'
        },
        messages: {
          pattern: '要求 module/action 格式'
        }
      }]
    }
  });

  // return false, will prevent starter

};
