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
        return util.PRODUCTION;
    }
  })();

  /**
   * @constant {string} MB_API_ORIGIN
   */
  util.MB_API_ORIGIN = (function() {
      switch (util.ENV) {
        case 1:
          return 'http://microblog.dev.web.nd';
        case 2:
          return 'http://microblog.debug.web.nd';
        case 4:
          return 'http://microblog.web.sdp.101.com';
        default:
          return util.LOC_ORIGIN;
      }
    })();

  /**
   * @constant {string} UC_API_ORIGIN
   */
  util.UC_API_ORIGIN = (function() {
    switch (util.ENV) {
      case 1:
        return 'http://101uccenter.dev.web.nd';
      case 2:
        return 'http://101uccenter.debug.web.nd';
      case 4:
        return 'https://aqapi.101.com';
      default:
        return util.LOC_ORIGIN;
    }
  })();

  /**
   * @constant {string} CS_API_ORIGIN
   */
  util.CS_API_ORIGIN = (function() {
    switch (util.ENV) {
      case 1:
        return 'http://sdpcs.dev.web.nd';
      case 2:
        return 'http://sdpcs.dev.web.nd';
      case 4:
        return 'http://cs.101.com';
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
   * @constant {boolean} 请求代理白名单
   */
  util.PROXY_WHITELIST = [util.MB_API_ORIGIN];

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
   * @constant {array} SIDEBAR_ROUTES 侧栏路由
   */
  util.SIDEBAR_ROUTES = [{
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
    }];

  /**
   * @constant {array}  HEADER_ROUTES 顶部路由
   */
  util.HEADER_ROUTES = [{
      route: 'logout',
      title: '退出'
    }];

};
