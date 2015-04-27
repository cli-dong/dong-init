'use strict';

var Overlay = require('nd-overlay');
var Template = require('nd-template');

var Profile = Overlay.extend({
  Implements: [Template],

  attrs: {
    classPrefix: 'profile',
    align: {
      baseXY: ['100%', '100%-1px'],
      selfXY: ['100%', 0]
    },
    template: require('./profile.handlebars')
  },

  setup: function() {
    Profile.superclass.setup.call(this);

    this._blurHide(this.get('align').baseElement);
  }
});

module.exports = Profile;
