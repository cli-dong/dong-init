'use strict';

var Browser = require('nd-browser');

if (!window.XMLHttpRequest ||
    !('withCredentials' in (new window.XMLHttpRequest()))) {
  alert('还未支持您当前的浏览器' +
    ((Browser.browser === 'IE' && Browser.version < 10) ?
      '，请采用 IE10 或以上版本' : ''));
  // redirect
  location.href = '/browser';
}

var util = require('./mod/util');

// exports to global for share
window.util = util;

require('./mod/mixins/dollar')(util);
require('./mod/mixins/unique')(util);
require('./mod/mixins/avatar')(util);
require('./mod/mixins/session')(util);
require('./mod/mixins/storage')(util);
require('./mod/mixins/const')(util);
require('./mod/mixins/console')(util);
require('./mod/mixins/progress')(util);
require('./mod/mixins/rest')(util);
require('./mod/mixins/auth')(util);
require('./mod/mixins/bread')(util);
require('./mod/mixins/layout')(util);
require('./mod/mixins/use')(util);
require('./mod/mixins/route')(util);

util.use(function(util) {
  if (util.auth.isLogin()) {
    // 如果是首页，跳转到 home
    if (!util.route.getRoute(0)) {
      util.redirect('home');
    }
  } else {
    util.redirect('login');
  }
});
