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
   * @constant {object} LOG_TYPES 日志类型
   */
  util.LOG_TYPES = {
    '1': '接受赠送物品',
    '2': '业务系统发放',
    '3': '管理员发放',
    '4': '业务系统删除',
    '5': '管理员删除',
    '6': '赠送物品',
    '7': '使用物品'
  };

  /**
   * @constant {array} SIDEBAR_ROUTES 侧栏路由
   */
  util.SIDEBAR_ROUTES = [{
      icon: 'goods',
      title: '物品管理',
      routes: [{
        route: 'item',
        title: '用户物品列表'
      }, {
        route: 'itemtype',
        title: '物品类型列表'
      }, {
        route: 'itemgroup',
        title: '物品分组管理'
      }]
    }, {
      icon: 'logs',
      title: '日志管理',
      routes: [{
        route: 'log',
        title: '物品日志查询'
      }]
    }, {
      icon: 'gifts',
      title: '礼包管理',
      routes: [{
        route: 'gift',
        title: '礼包管理'
      }]
    }, {
      icon: 'business',
      title: '业务系统管理',
      routes: [{
        route: 'sysbusiness',
        title: '业务系统管理'
      }]
    }, {
      icon: 'config',
      title: '系统管理',
      routes: [{
      //   route: 'system/config',
      //   title: '参数设置'
      // }, {
      //   route: 'system/user',
      //   title: '用户管理'
      // }, {
        route: 'system/rbac',
        title: '权限管理'
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
