'use strict';

function makeOptions(type) {
  var fields = [{
      name: 'node_name',
      label: '节点名称',
      attrs: {
        placeholder: '请选择节点名称',
        required: 'required',
        maxlength: 30
      }
    }, {
      name: 'node_exinfo',
      label: '扩展字段',
      type: 'textarea',
      attrs: {
        placeholder: '扩展信息请采用 JSON 格式输入',
        rows: 4
      }
    }];

  if (type === 'add') {
    fields.unshift({
      name: 'parent_id',
      type: 'hidden'
    }, {
      name: 'parent_name',
      label: '上级节点',
      type: 'static'
    });
  }

  return {
    interact: {
      type: 'dialog',
      title: type === 'add' ? '增加子节点' : '编辑节点'
    },

    view: {
      formData: {},
      fields: fields
    }
  };
}

module.exports = function(type) {
  this.setOptions(makeOptions(type));

  // return false, will prevent starter

};
