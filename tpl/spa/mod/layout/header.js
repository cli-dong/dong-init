'use strict';

var Widget = require('nd-widget');
var Template = require('nd-template');
var Select = require('nd-select');

var Profile = require('./profile');

var Header = Widget.extend({
  Implements: [Template],

  attrs: {
    template: require('./header.handlebars'),
    model: {}
  }
});

var instance;

exports.render = function(util /*, model*/ ) {
  var isLogin = util.auth.isLogin();

  if (instance) {
    instance.destroy();
  }

  var i18n = window.seajs.i18n;
  var lang = window.seajs.lang;

  if (i18n) {
    i18n = i18n.map(function(item) {
      return {
        text: util.I18N[item] || item,
        value: item,
        selected: lang === item
      };
    });
  }

  var userdata;

  if (isLogin) {
    userdata = util.auth.getAuth('user_info');
    userdata.avatar = util.avatar(userdata['user_id']);
  }

  instance = new Header({
    parentNode: '#header',
    className: i18n ? 'has-i18n' : 'no-i18n',
    model: {
      title: util.SITE_TITLE,
      authed: isLogin,
      i18n: i18n,
      userdata: userdata,
      routes: isLogin ? util.HEADER_ROUTES : null
    },
    events: {
      'click .route-me': function(e) {
        var baseElement = util.$(e.currentTarget);

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
      },
      'click button': function() {
        util.layout.render('rootnode', {
          // toggle state
          collapsed: -1
        });
      }
    },
    afterRender: function() {
      if (i18n) {
        new Select({
          className: 'ui-select-dark',
          trigger: this.$('[data-role="i18n"]'),
          triggerTpl: '<a class="iconfont iconfont-global" href="#"></a>'
        }).on('change', function() {
          var search = location.search;
          var keyVal = 'lang=' + this.get('value');
          var regexp = /([?&])lang=[-_\w]+/;

          if (search) {
            if (regexp.test(search)) {
              search = search.replace(regexp, '$1' + keyVal);
            } else {
              search += '&' + keyVal;
            }
          } else {
            search = keyVal;
          }

          // reload
          location.search = search;
        }).render();
      }
    }
  }).render();
};
