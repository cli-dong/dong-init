'use strict';

module.exports = function() {

  this.setOptions('view', {

    fields: [{
      name: 'realm',
      attrs: {
        placeholder: '业务领域',
        maxlength: 255,
        size: 30,
        required: 'required'
      }
    }]

  });
};
