'use strict';

module.exports = function(util) {

  // 本地模拟
  util.SIMULATION = 0;
  // 开发
  util.DEVELOPMENT = 1;
  // 测试
  util.DEBUG = 2;
  // 生产
  util.PRODUCTION = 4;
  // 预生产
  util.PREPRODUCTION = 8;
  // 压测
  util.PRESSURE = 16;

  /**
   * @constant {string} SITE_TITLE
   */
  util.SITE_TITLE = '通用管理系统';

  util.LOC_PROTOCOL = location.protocol;
  util.LOC_HOST = location.host;
  // host === hostname:port
  util.LOC_HOSTNAME = location.hostname;
  util.LOC_PORT = location.port;
  util.LOC_ORIGIN = util.LOC_PROTOCOL + '//' + util.LOC_HOST;

  /**
   * @constant {string} ENV
   */
  util.ENV = (function() {
    switch (util.LOC_HOSTNAME) {
      case '127.0.0.1':
        return util.SIMULATION;
      case 'localhost':
        return util.PRODUCTION;
      default:
        if (/\.dev\.web\.nd$/.test(util.LOC_HOSTNAME)) {
          return util.DEVELOPMENT;
        }
        if (/\.debug\.web\.nd$/.test(util.LOC_HOSTNAME)) {
          return util.DEBUG;
        }
        if (/\.qa\.web\.sdp\.101\.com$/.test(util.LOC_HOSTNAME)) {
          return util.PRESSURE;
        }
        if (/\.beta\.web\.sdp\.101\.com$/.test(util.LOC_HOSTNAME)) {
          return util.PREPRODUCTION;
        }
        return util.PRODUCTION;
    }
  })();

  /**
   * @constant {string} LO_API_ORIGIN
   */
  // util.LO_API_ORIGIN = (function() {
  //   switch (util.ENV) {
  //     case util.DEVELOPMENT:
  //       return 'http://lottery.dev.web.nd';
  //     case util.DEBUG:
  //       return 'http://lottery.debug.web.nd';
  //     case util.PRODUCTION:
  //       return 'http://lottery.web.sdp.101.com';
  //     case util.PREPRODUCTION:
  //       return 'http://lottery.beta.web.sdp.101.com';
  //     case util.PRESSURE:
  //       return 'http://lottery.qa.web.sdp.101.com';
  //     default:
  //       return util.LOC_ORIGIN;
  //   }
  // })();

  /**
   * @constant {string} MB_API_ORIGIN
   */
  util.MB_API_ORIGIN = (function() {
    switch (util.ENV) {
      case util.DEVELOPMENT:
        return 'http://microblog.dev.web.nd';
      case util.DEBUG:
        return 'http://microblog.debug.web.nd';
      case util.PRODUCTION:
        return 'http://microblog.web.sdp.101.com';
      case util.PREPRODUCTION:
        return 'http://microblog.beta.web.sdp.101.com';
      case util.PRESSURE:
        return 'http://microblog.qa.web.sdp.101.com';
      default:
        return util.LOC_ORIGIN;
    }
  })();

  /**
   * @constant {string} PA_API_ORIGIN
   */
  // util.PA_API_ORIGIN = (function() {
  //   switch (util.ENV) {
  //     case util.DEVELOPMENT:
  //       return 'http://pack.dev.web.nd';
  //     case util.DEBUG:
  //       return 'http://pack.debug.web.nd';
  //     case util.PRODUCTION:
  //       return 'http://pack.web.sdp.101.com';
  //     case util.PREPRODUCTION:
  //       return 'http://pack.beta.web.sdp.101.com';
  //     case util.PRESSURE:
  //       return 'http://pack.qa.web.sdp.101.com';
  //     default:
  //       return util.LOC_ORIGIN;
  //   }
  // })();

  /**
   * @constant {string} UC_API_ORIGIN
   */
  util.UC_API_ORIGIN = (function() {
    switch (util.ENV) {
      case util.DEVELOPMENT:
        return 'http://101uccenter.beta.web.sdp.101.com';
      case util.DEBUG:
        return 'http://101uccenter.beta.web.sdp.101.com';
      case util.PRODUCTION:
        return 'https://aqapi.101.com';
      case util.PREPRODUCTION:
        return 'http://101uccenter.beta.web.sdp.101.com';
      case util.PRESSURE:
        return 'http://101uccenter.beta.web.sdp.101.com';
      default:
        return util.LOC_ORIGIN;
    }
  })();

  /**
   * @constant {string} CS_API_ORIGIN
   */
  util.CS_API_ORIGIN = (function() {
    switch (util.ENV) {
      case util.DEVELOPMENT:
        return 'http://betacs.101.com';
      case util.DEBUG:
        return 'http://betacs.101.com';
      case util.PRODUCTION:
        return 'http://cs.101.com';
      case util.PREPRODUCTION:
        return 'http://betacs.101.com';
      case util.PRESSURE:
        return 'http://betacs.101.com';
      default:
        return util.LOC_ORIGIN;
    }
  })();

  /**
   * @constant {boolean} 开启基于角色的权限控制
   */
  util.RBAC_ENABLED = true;

  /**
   * @constant {boolean} 启用接口请求代理
   */
  util.PROXY_ENABLED = true;

  /**
   * @constant {boolean} 接口请求代理版本
   */
  util.PROXY_VERSION = 'v0.1';

  /**
   * @constant {boolean} 接口请求代理前缀
   */
  util.PROXY_PREFIX = 'dispatcher';

  /**
   * @constant {boolean} 请求代理白名单
   */
  util.PROXY_WHITELIST = [
    // util.UC_API_ORIGIN,
    // util.CS_API_ORIGIN
  ];

  /**
   * @constant {boolean} 开启接口请求缓存（浏览器机制）
   */
  util.CACHE_ENABLED = false;

  /**
   * @constant {string} DATETIME_FORMAT 默认的时间日期格式
   */
  util.DATETIME_FORMAT = 'yyyy-MM-dd hh:mm:ss';

  /**
   * @constant {string} DATE_FORMAT 默认的日期格式
   */
  util.DATE_FORMAT = 'yyyy-MM-dd';

  /**
   * @constant {string} TIME_FORMAT 默认的时间格式
   */
  util.TIME_FORMAT = 'hh:mm:ss';

  /**
   * @constant {string} TOAST_DURATION 默认提示信息显示毫秒数
   */
  util.TOAST_DURATION = 3000;

  /**
   * @constant {array} SIDEBAR_ROUTES 侧栏路由
   */
  util.SIDEBAR_ROUTES = [{
    icon: 'demo',
    title: '代码示例',
    routes: [{
      route: 'demo/editor',
      title: '富文本编辑器'
    }, {
      route: 'demo/menu',
      title: '多级菜单设置'
    }, {
      route: 'demo/tree',
      title: '组织结构树'
    }]
  }];

  if (util.RBAC_ENABLED) {
    util.SIDEBAR_ROUTES.push({
      icon: 'rbac',
      title: '权限管理',
      routes: [{
        route: 'rbac/role',
        title: '角色列表',
        // 用于权限控制
        level: '=8'
      }, {
        route: 'rbac/api',
        title: '接口列表',
        // 用于权限控制
        level: '=9'
      }]
    });
  }

  /**
   * @constant {array}  HEADER_ROUTES 顶部路由
   */
  util.HEADER_ROUTES = [{
    route: 'logout',
    title: '退出'
  }];

  /**
   * @constant {object}  I18N 多语言对应
   */
  util.I18N = {
    'zh-CN': '\u7b80\u4f53\u4e2d\u6587',
    'en-US': 'English'
  };

  /**
   * @constant {string}  透明图片
   */
  util.BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';

};
