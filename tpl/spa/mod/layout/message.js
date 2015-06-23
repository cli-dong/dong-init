'use strict';

var Widget = require('nd-widget');
var Template = require('nd-template');

var Message = Widget.extend({
  Implements: [Template],

  attrs: {
    classPrefix: 'ui-message',
    template: require('./message.handlebars'),
    model: {}
  },

  events: {
    'click [data-role="close"]': 'destroy'
  },

  initAttrs: function(config) {
    Message.superclass.initAttrs.call(this, config);

    var model = this.get('model');

    if (typeof model.close === 'function') {
      this.before('destroy', model.close);
      model.close = true;
    }

    if (model.timeout !== -1) {
      setTimeout(this.hide.bind(this), model.timeout);
      delete model.timeout;
    }
  },

  hide: function() {
    this.element.animate({
      opacity: 0,
      height: 0
    }, 200, this.destroy.bind(this));
  }
});

module.exports = Message;
