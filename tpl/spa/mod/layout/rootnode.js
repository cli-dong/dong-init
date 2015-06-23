'use strict';

exports.render = function(util/*, model*/) {
  util.$('html')
    .toggleClass('unauthed', !util.auth.isLogin())
    .addClass('visible');
};
