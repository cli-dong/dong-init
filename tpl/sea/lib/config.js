(function(window, seajs, document) {

  'use strict';

  if (!seajs) {
    return;
  }

  function addParam(url, param) {
    if (!param) {
      return url;
    }

    return url + (url.indexOf('?') === -1 ? '?' : '&') + param;
  }

  // debug 开关
  var debug = (function(localStorage) {
    var flag = window.location.search.indexOf('debug') > 0;

    // 增加 localStorage 支持
    if (localStorage) {
      if (flag) {
        localStorage.setItem('seajs-debug', 'true');
      } else {
        flag = localStorage.getItem('seajs-debug') !== null;
      }
    }

    return flag;
  }(window.localStorage));

  // 映射表
  var map = [];

  if (debug) {
    // debug 模式
    (function(plugins){
      if (!plugins || !plugins.length) {
        return;
      }

      var _use = seajs.use;
      var i = 0, n = plugins.length;

      seajs.use = function() {
        var args = Array.prototype.slice.call(arguments);

        var interval = setInterval(function() {
          if (i === n) {
            clearInterval(interval);
            _use.apply(null, args);
            // 归位
            seajs.use = _use;
            _use = null;
          }
        }, 0);
      };

      function addScript(url, next) {
        var script = document.createElement('script');
        script.src = url;

        function onload() {
          script.onload = script.onerror = script.onreadystatechange = null;
          if (i < n) {
            next();
          }
        }

        if ('onload' in script) {
          script.onload = script.onerror = onload;
        } else {
          script.onreadystatechange = function() {
            if (/loaded|complete/.test(script.readyState)) {
              onload();
            }
          }
        }

        document.head.appendChild(script);
      }

      // 确保加载顺序
      (function loop() {
        addScript(plugins[i++], loop);
      })();
    })(<%= plugins %>);
  } else {
    map.push(function(url) {
      // 仅重定向 app 目录
      return addParam(url.replace('/<%= appname %>/app/', '/<%= appname %>/dist/<%= appname %>/app/'), '<%= version %>');
    });
  }

  seajs.config({
    base: '<%= base %>',
    alias: {
      <%= alias %>
    },
    map: map,
    debug: debug
  });

})(this, this.seajs, this.document);
