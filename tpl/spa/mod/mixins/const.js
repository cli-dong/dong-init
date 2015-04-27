'use strict';

module.exports = function(util) {


  /**
   * @constant {string} SITE_TITLE
   */
  util.SITE_TITLE = '背包管理系统';

  /**
   * @constant {string} API_URL
   *
   * 开发：http://pack.dev.web.nd
   * 测试：
   * 生产：http://pack.web.sdp.101.com
   */
  util.API_URL = (function() {
    switch (location.host) {
      case 'pack-admin.dev.web.nd':
      case '192.168.57.12':
      case 'localhost':
        return 'http://pack.dev.web.nd';
      case 'pack-admin.debug.web.nd':
        return 'http://pack.debug.web.nd';
      case 'pack-admin.web.sdp.101.com':
      case 'pack-admin_b.web.sdp.101.com':
        return 'http://pack.web.sdp.101.com';
      default:
        return '';
    }
  })();

  /**
   * @constant {string} UC_API_URL
   */
  util.UC_API_URL = (function() {
    switch (location.host) {
      case 'pack-admin.dev.web.nd':
      case '192.168.57.12':
      case 'localhost':
        return 'https://aqapi.101.com';
        // return 'http://api.account.service.debug.sdp.nd';
      case 'pack-admin.debug.web.nd':
        return 'https://aqapi.101.com';
        // return 'http://101uccenter.debug.web.nd';
      case 'pack-admin.web.sdp.101.com':
      case 'pack-admin_b.web.sdp.101.com':
        return 'https://aqapi.101.com';
        // return 'https://aqapi.101.com';
      default:
        return '';
    }
  })();

  /**
   * @constant {string} CS_API_URL
   */
  util.CS_API_URL = (function() {
    switch (location.host) {
      case 'pack-admin.dev.web.nd':
      case '192.168.57.12':
      case 'localhost':
        return 'http://cs.101.com';
        // return 'http://sdpcs.dev.web.nd';
      case 'pack-admin.debug.web.nd':
        return 'http://cs.101.com';
        // return 'http://sdpcs.dev.web.nd';
      case 'pack-admin.web.sdp.101.com':
      case 'pack-admin_b.web.sdp.101.com':
        return 'http://cs.101.com';
        // return 'http://cs.101.com';
      default:
        return '';
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
    '1': '赠送物品',
    '2': '使用物品',
    '3': '打开礼包',
    '4': '升级送抽奖券',
    '5': '签到送花',
    '6': '系统发放',
    '7': '管理员添加'
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

};