'use strict';

/**
 * 注意，下文中 `xxx` 需根据实际情况修改。
 */

module.exports = function(util) {

  /**
   * @constant {string} SITE_TITLE
   */
  util.SITE_TITLE = 'XXX 管理系统';

  /**
   * @constant {string} API_URL
   *
   * 开发：http://xxx.dev.web.nd
   * 测试：
   * 生产：http://xxx.web.sdp.101.com
   */
  util.API_URL = (function() {
    switch (location.host) {
      case 'xxx-admin.dev.web.nd':
      case '192.168.57.12':
      case 'localhost':
        return 'http://xxx.dev.web.nd';
      case 'xxx-admin.debug.web.nd':
        return 'http://xxx.debug.web.nd';
      case 'xxx-admin.web.sdp.101.com':
      case 'xxx-admin_b.web.sdp.101.com':
        return 'http://xxx.web.sdp.101.com';
      default:
        return '//' + location.host;
    }
  })();

  /**
   * @constant {string} UC_API_URL
   */
  util.UC_API_URL = (function() {
    switch (location.host) {
      case 'xxx-admin.dev.web.nd':
      case '192.168.57.12':
      case 'localhost':
        return 'https://aqapi.101.com';
        // return 'http://api.account.service.debug.sdp.nd';
      case 'xxx-admin.debug.web.nd':
        return 'https://aqapi.101.com';
        // return 'http://101uccenter.debug.web.nd';
      case 'xxx-admin.web.sdp.101.com':
      case 'xxx-admin_b.web.sdp.101.com':
        return 'https://aqapi.101.com';
        // return 'https://aqapi.101.com';
      default:
        return '//' + location.host;
    }
  })();

  /**
   * @constant {string} CS_API_URL
   */
  util.CS_API_URL = (function() {
    switch (location.host) {
      case 'xxx-admin.dev.web.nd':
      case '192.168.57.12':
      case 'localhost':
        return 'http://cs.101.com';
        // return 'http://sdpcs.dev.web.nd';
      case 'xxx-admin.debug.web.nd':
        return 'http://cs.101.com';
        // return 'http://sdpcs.dev.web.nd';
      case 'xxx-admin.web.sdp.101.com':
      case 'xxx-admin_b.web.sdp.101.com':
        return 'http://cs.101.com';
        // return 'http://cs.101.com';
      default:
        return '//' + location.host;
    }
  })();

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
      title: '角色列表'
    }]
  }];

  /**
   * @constant {array}  HEADER_ROUTES 顶部路由
   */
  util.HEADER_ROUTES = [{
    route: 'logout',
    title: '退出'
  }];

  /**
   * @constant {object}  UPLOAD_SERVER 上传服务配置
   */
  util.UPLOAD_SERVER = JSON.stringify({
    locale: {
      host: util.API_URL,
      session: 'm/fsession',
      // 存放路径
      formData: {
        path: '/xxx_pic'
      }
    },
    remote: {
      host: util.CS_API_URL
    }
  });

};
