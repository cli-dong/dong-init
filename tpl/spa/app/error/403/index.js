'use strict';

module.exports = function(util) {
  util.$('#main').append('<div id="interlude">' +
      '<div class="error"></div>' +
      '<div class="content">' + '权限不足' + '</div>' +
    '</div>');

  // 面包屑导航
  util.bread.set([]);

  return function() {
    util.$('#interlude').remove();
  };
};
