'use strict';

var util = require('../util');
var ImageSessionModel = require('../model/image/session');
var CsUploadModel = require('../model/cs/upload');
var CsDownloadModel = require('../model/cs/download');
var CsDentryModel = require('../model/cs/dentry');

var storage = util.session;

var sessionKey = 'MISC-UPLOAD';
var sessionObj;

var expires = 1800;

var DENTRY_ID_PATTERN = /^[0-9a-f]{8}(\-[0-9a-f]{4}){3}\-[0-9a-f]{12}$/;

var Server = {

  session: function(callback) {
    var session = sessionObj;

    if (!session) {
      // 本地存储
      session = storage.get(sessionKey);
    }

    if (session) {
      return callback((sessionObj = session));
    }

    new ImageSessionModel()
      .GET()
      .done(function(data) {
        callback((sessionObj = data));
        storage.set(sessionKey, sessionObj, expires);
      })
      .fail(function(error) {
        callback(false);
        util.console.error(error);
      });
  },

  upload: function(callback) {
    var url = new CsUploadModel().get('baseUri').join('/');

    Server.session(function(data) {
      if (data.session) {
        url += '?session=' + data.session;
      }

      callback({
        server: url,
        formData: {
          path: data.path,
          // public
          scope: 1
        }
      });
    });
  },

  download: function(file, data, callback) {
    if (!callback) {
      callback = data;
      data = null;
    }

    if (!DENTRY_ID_PATTERN.test(file.value)) {
      file.src = file.value;
      callback && callback(file);
      return file;
    }

    var url = new CsDownloadModel().get('baseUri').join('/');

    url += '?dentryId=' + file.value;

    // if not public, need add session parameter too

    if (data) {
      Object.keys(data).forEach(function(key) {
        url += '&' + key + '=' + data[key];
      });
    }

    file.src = url;

    callback && callback(file);

    return file;
  },

  detail: function(file, callback) {
    Server.session(function(data) {
      if (!data) {
        return callback(file);
      }

      new CsDentryModel()
        .GET({
          uri: file.value,
          data: {
            session: data.session
          }
        })
        .done(function(data) {
          if (data.inode) {
            file.type = data.inode.mime;
            file.size = data.inode.size;
          }
          if (data.name) {
            file.name = data.name;
          }
          callback(file);
        })
        .fail(function(error) {
          // error
          callback(file);
          util.console.error(error);
        });
    });
  }

};

module.exports = {
  server: Server
};
