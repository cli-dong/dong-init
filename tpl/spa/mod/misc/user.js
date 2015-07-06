'use strict';

var util = require('../util');
var UcOrgUser = require('../model/uc/org/user');

var users;
var waiting;
var ucOrgUser = new UcOrgUser();

var User = module.exports = {
  // 获取用户数据
  getUsers: function(query, done) {
    // 如果已在内存中
    if (users) {
      return done(users);
    }

    // 如果已在本地存储中
    var orgId = util.auth.getAuth('user_info', 'org_exinfo', 'org_id');
    var key = 'USERS-' + orgId;

    users = util.session.get(key);

    if (users) {
      return done(users);
    }

    if (waiting) {
      return setTimeout(function() {
        User.getUsers(query, done);
      }, 500);
    }

    ucOrgUser.on('GET', function(options) {
      options.replacement = {
        'org_id': orgId
      };
    });

    waiting = true;

    // 获取组织用户数据（全量）
    ucOrgUser.LIST({
      data: {
        $offset: 0,
        $limit: 10000
      }
    }).done(function(data) {
      if (data.items && data.items.length) {
        users = data.items.map(function(user) {
          return {
            value: user['user_id'],
            label: user['user_id'] + ' ' + user['nick_name'],
            alias: [user['nick_name_full'], user['nick_name_short'], user['nick_name']]
          };
        });
        done(users);
        util.session.set(key, users);
      } else {
        console.error('无法获取用户列表');
      }
    }).fail(function() {
      console.error('无法获取用户列表');
    }).always(function() {
      waiting = false;
    });
  },

  getUser: function(id, done) {
    this.getUsers(null, function(users) {
      var nickname;
      users.some(function(user) {
        if ('' + user.value === '' + id) {
          nickname = user.alias[2];
          return true;
        }
      });
      done(nickname);
    });
  }
};
