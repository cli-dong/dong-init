'use strict';

function makeOptions(type) {
  var fields = [{
      name: 'name',
      label: '菜单名称',
      attrs: {
        // 一级菜单不多于4个汉字或8个字母，二级菜单不多于8个汉字或16个字母
        placeholder: '请输入菜单名称',
        required: 'required',
        maxlength: 16
      }
    }, {
      name: 'type',
      label: '菜单类型',
      type: 'radio',
      options: [{
        text: '发送事件消息',
        value: 'click',
        checked: true
      }, {
        text: '跳转到 URL',
        value: 'view'
      }]
    }, {
      group: 'click',
      fields: [{
        name: 'key',
        label: '事件代码',
        attrs: {
          placeholder: '规则：父菜单序号 + 000，或，父菜单序号 + 00 + 子菜单序',
          required: 'required',
          maxlength: 16
        }
      }]
    }, {
      group: 'view',
      fields: [{
        name: 'url',
        label: '跳转地址',
        attrs: {
          placeholder: 'http://',
          required: 'required',
          maxlength: 255
        }
      }]
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
    // 额外显示上级信息
    fields.unshift({
      name: 'parent_id',
      type: 'hidden'
    }, {
      name: 'parent_name',
      label: '上级节点',
      type: 'static',
      attrs: {
        'data-skip': 'true'
      }
    });
  }

  return {
    // inFilter: function(data) {

    //   return data;
    // },

    outFilter: function(data) {
      data.parent = data['parent_id'];
      delete data['parent_id'];

      return data;
    },

    formData: {},

    fields: fields,

    events: {
      'change [type="radio"]': function(e) {
        var value = this.getValue(e.currentTarget.name)[0];

        ['click', 'view'].forEach(function(type) {
          var visible = (value === type);

          this.getGroup(type).toggle(visible)
            .find('[name]').attr('data-skip', !visible || null);

        }.bind(this));
      }
    },
    afterRender: function() {
      this.$('[type="radio"]').trigger('change');
    }
  };
}

module.exports = function(type) {
  this.options = makeOptions(type);

  // return false, will prevent starter

};
