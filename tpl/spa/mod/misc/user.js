'use strict';

var util = require('../util');
var UcSearch = require('../model/uc/search');
var UcUser = require('../model/uc/user');

var waiting;

var User = module.exports = {

  // 获取用户数据
  getUsers: function(query, done) {
    if (!query) {
      return done([]);
    }

    // 'user_id [nick_name]'
    if (/^\d+ /.test(query)) {
      return done([]);
    }

    // 如果已在本地存储中
    var orgId = util.auth.getAuth('user_info', 'org_exinfo', 'org_id');

    if (!orgId) {
      return done([]);
    }

    var key = ['USERS', orgId, query].join('-');
    var users = util.session.get(key);

    // 如果已在内存中
    if (users) {
      return done(users);
    }

    if (waiting) {
      return setTimeout(function() {
        User.getUsers(query, done);
      }, 500);
    }

    waiting = true;

    // 搜索用户
    new UcSearch()
    .LIST({
      replacement: {
        'org_id': orgId,
        'node_id': 0
      },
      data: {
        $offset: 0,
        $limit: 10,
        name: query
      }
    })
    .done(function(data) {
      if (data.items && data.items.length) {
        users = data.items.map(function(user) {
          return {
            value: user['user_id'],
            label: user['user_id'] + ' ' + user['nick_name'],
            alias: [
              user['nick_name_full'],
              user['nick_name_short'],
              user['nick_name'],
              user['org.org_user_code'],
              user['org.real_name']
            ]
          };
        });
        done(users);
        util.session.set(key, users);
      } else {
        done([]);
      }
    })
    .fail(function() {
      done([]);
    })
    .always(function() {
      waiting = false;
    });
  },

  getUser: function(id, done) {
    var key = ['USER', id].join('-');
    var val = util.session.get(key);

    if (val) {
      return done(val);
    }

    new UcUser()
    .GET(id)
    .done(function(data) {
      done(data);
      util.session.set(key, data);
    })
    .fail(function() {
      done({});
    });
  }
};
