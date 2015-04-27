'use strict';

var $ = require('jquery');

var Widget = require('nd-widget');
var Template = require('nd-template');

var Profile = require('./profile');

var Header = Widget.extend({
  Implements: [Template],

  attrs: {
    parentNode: document.getElementById('header'),
    template: require('./header.handlebars'),
    model: {}
  },

  events: {
    'click .route-me': function(e) {
      this.showProfile($(e.currentTarget));
    }
  },

  showProfile: function(baseElement) {
    if (!this.profile) {
      this.profile = new Profile({
        parentNode: this.element,
        align: {
          baseElement: baseElement
        },
        model: this.get('model')
      }).on('change:visible', function(visible) {
        baseElement.toggleClass('active', visible);
      });
    }

    this.profile.get('visible') ? this.profile.hide() : this.profile.show();
  }
});

var instance;

exports.render = function(util) {
  var authed = util.auth.isAuthed();

  if (instance) {
    instance.destroy();
  }

  instance = new Header({
    model: {
      title: util.SITE_TITLE,
      authed: authed,
      userdata: util.user.get(),
      routes: authed ? util.HEADER_ROUTES : null
    }
  }).render();
};
