'use strict';

module.exports = function(util) {
  util.$('#main').append('<div id="interlude">' +
      '<div class="coffee"></div>' +
      '<div class="content">' + '欢迎回来' + '</div>' +
    '</div>');

  // 面包屑导航
  util.bread.set([]);

  return function() {
    util.$('#interlude').remove();
  };
};
