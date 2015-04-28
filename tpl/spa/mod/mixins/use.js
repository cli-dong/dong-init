'use strict';

module.exports = function(util) {
  var cached = {};

  // app/**/index 提供的回收函数
  // route 切换前执行以回收内存
  var recycle;

  // 忽略第一次 cache 请求
  // 因为它是 index
  var ignore0;

  // 保存以供多次调用
  function cache(callback) {
    if (!ignore0) {
      ignore0 = true;
      return;
    }

    var id = util.route.getRoute().join(util.route.delimiter);

    if (!(id in cached)) {
      cached[id] = callback;
    }
  }

  function clean() {
    // GC
    if (typeof recycle === 'function') {
      recycle();
      recycle = null;
    }
  }

  util.use = function(id) {
    clean();

    if (typeof id === 'function') {
      cache(id);

      recycle = id();
    } else {
      if (id in cached) {
        recycle = cached[id]();
      } else {
        // app/**/index
        window.seajs.use('app/' + id + '/index.js');
      }
    }
  };

};
