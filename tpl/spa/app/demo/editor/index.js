'use strict';

var FormExtra = require('nd-form-extra');

module.exports = function(/*util*/) {
  var instance = new FormExtra({
      fields: [{
        label: '正文',
        name: 'content',
        type: 'textarea',
        value: '<p><button>button</button></p><p><a href="@@@">button</a></p>',
        attrs: {
          'x-type': 'wysiwyg',
          required: true
        }
      }],
      pluginCfg: {
        Editor: [require('./editor/start')]
      },
      parentNode: '#main'
    })
    .on('formSubmit', function() {

      this.submit(function(data) {
        console.log(data);
      });

      // 阻止默认事件发生
      return false;
    }).render();

  // 返回垃圾回收
  // 否则内存泄漏
  return function() {
    instance.destroy();
  };
};
