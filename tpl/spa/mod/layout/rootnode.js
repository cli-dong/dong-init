'use strict';

exports.render = function(util, model) {
  var key = 'TOGG';
  var val;

  if (!model) {
    val = util.storage.get(key);
  } else {
    val = model.collapsed;

    if (val === -1) {
      val = !util.$('#container').hasClass('collapsed');
    }

    util.storage.set(key, val);
  }

  util.$('#container').toggleClass('collapsed', val || false);

  // finally, show the root
  util.$('html')
    .toggleClass('unauthed', !util.auth.isLogin())
    .addClass('visible');
};
