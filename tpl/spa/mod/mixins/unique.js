'use strict';

module.exports = function(util) {

  util.unique = function() {
    return new Date().getTime().toString(16) +
      Math.random().toString(16).substring(2);
  };

};
