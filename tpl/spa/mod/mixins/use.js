'use strict';

module.exports = function(util) {
  // app/**/index 提供的回收函数
  // route 切换前执行以回收内存
  var recycle;

  util.use = function(id, params) {
    // GC
    if (typeof recycle === 'function') {
      recycle();
      recycle = null;
    }

    // just for /index.js currently
    if (typeof id === 'function') {
      recycle = id(util);
    } else {
      util.progress.show();
      window.seajs.use('app/' + id + '/index.js', function(bootstrap) {
        recycle = bootstrap(util, params);
        util.progress.show(100);
      });
    }
  };

  window.seajs.on('error', function() {
    util.redirect('error/404');
  });

};
