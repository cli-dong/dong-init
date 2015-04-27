'use strict';

var Browser = require('nd-browser');

if (!window.XMLHttpRequest ||
    !('withCredentials' in (new window.XMLHttpRequest()))) {
  alert('还未支持您当前的浏览器' +
    ((Browser.browser === 'IE' && Browser.version < 10) ?
      '，请采用 IE10 或以上版本' : ''));
}

// exports to global
var util = window.util = require('./mod/util');

require('./mod/mixins/all')(util);

util.ready(function() {
  if (util.auth.isAuthed()) {
    // 如果是首页，跳转到 home
    if (!util.route.getRoute(0)) {
      util.redirect('home');
    }
  } else {
    util.redirect('login');
  }
});
