'use strict';

var Tree = require('nd-tree');

var util = require('../../../mod/util');

var menuData = {
  items: [{
    'type': 'click',
    'name': '今日歌曲',
    'key': 'V1000_MAINMENU',
    'msg': {
      'msg_type': 1, //消息类别(1文本2图片5图文)
      'content': '文本消息' //消息内容
    }
  }, {
    'type': 'view',
    'name': '歌手简介',
    'url': 'http://www.baidu.com/'
  }, {
    'name': '菜单',
    'sub_buttons': [{
      'type': 'view',
      'name': 'hello word',
      'url': 'http://www.baidu.com/'
    }, {
      'type': 'click',
      'name': '赞一下我们',
      'key': 'V3001_SUBMENU',
      'msg': {
        'msg_type': 1, //消息类别(1文本2图片5图文)
        'content': '文本消息' //消息内容
      }
    }]
  }]
};

// 模拟 RESTful 接口
var menuModel = {
  LIST: function() {
    return {
      done: function(callback) {
        callback(menuData);
        return this;
      },
      fail: function(/*callback*/) {
        return this;
      },
      always: function(callback) {
        callback();
        return this;
      }
    };
  },
  GET: function(id) {
    console.log(id);
    return {
      done: function(callback) {
        if (id.indexOf('-') !== -1) {
          id = id.split('-');
          if (id.length === 3) {
            callback(menuData.items[id[1]]['sub_buttons'][id[2]]);
          } else {
            callback(menuData.items[id[1]]);
          }
        }
        return this;
      },
      fail: function(/*callback*/) {
        return this;
      },
      always: function(callback) {
        callback();
        return this;
      }
    };
  },
  DELETE: function(/*id*/) {
    return {
      done: function(callback) {
        callback({});
        return this;
      },
      fail: function(/*callback*/) {
        return this;
      },
      always: function(callback) {
        callback();
        return this;
      }
    };
  },
  PATCH: function(id, data) {
    return {
      done: function(callback) {
        data.id = id;
        callback(data);
        return this;
      },
      fail: function(/*callback*/) {
        return this;
      },
      always: function(callback) {
        callback();
        return this;
      }
    };
  },
  POST: function(data) {
    return {
      done: function(callback) {
        callback(data);
        return this;
      },
      fail: function(/*callback*/) {
        return this;
      },
      always: function(callback) {
        callback();
        return this;
      }
    };
  }
};

util.ready(function() {
  var instance = new Tree({
    proxy: menuModel,

    keyMap: {
      // id: 'node_id',
      // name: 'node_name',
      // parent: 'parent_id',
      children: 'sub_buttons'
    },

    treeName: '菜单管理',

    // foldable: true,
    // checkable: true,
    // multiple: false,

    editable: true,
    // sortable: true,

    opened: false,
    // checked: true,

    pluginCfg: {
      addNode: {
        listeners: {
          start: require('./add/start'),
          ready: require('./add/ready')
        }
      },
      editNode: {
        listeners: {
          start: require('./edit/start')
        }
      },
      dndSort: {
        listeners: {
          start: require('./sort/start')
        }
      },
      save: {
        disabled: false,
        listeners: {
          start: require('./save/start')
        }
      }
    },
    // nodes: data.items,
    parentNode: '#main'
  }).render();

  return function() {
    instance.destroy();
  };
});
