'use strict';

var Widget = require('nd-widget');
var Template = require('nd-template');

var Sidebar = Widget.extend({
  Implements: [Template],

  attrs: {
    parentNode: document.getElementById('sidebar'),
    template: require('./sidebar.handlebars'),
    model: {}
  }
});

var instance;

exports.render = function(util) {
  var authed = util.auth.isAuthed();

  if (instance) {
    instance.destroy();
  }

  instance = new Sidebar({
    model: {
      folders: authed ? util.SIDEBAR_ROUTES : null,
      visible: authed
    }
  }).render();
};
