'use strict';

var Widget = require('nd-widget');
var Template = require('nd-template');

var Sidebar = Widget.extend({
  Implements: [Template],

  attrs: {
    template: require('./bread.handlebars'),
    model: {}
  }
});

var instance;

exports.render = function(util/*, model*/) {
  if (instance) {
    instance.destroy();
  }

  var breads = util.bread.get();

  if (breads.length) {
    instance = new Sidebar({
      parentNode: '#bread',
      model: {
        breads: util.bread.get()
      }
    }).render();
    util.$('#bread').show();
  } else {
    util.$('#bread').hide();
  }
};
