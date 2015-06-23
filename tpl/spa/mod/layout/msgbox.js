'use strict';

var Message = require('./message');

exports.render = function(util, model) {
  if (model) {
    new Message({
      parentNode: '#msgbox',
      model: model
    }).render();
  }
};

