'use strict';

var $ = require('jquery');

module.exports = function(util) {

  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  }

  // fix https://github.com/jquery/jquery/issues/1684
  $.ajaxSetup({
    xhr: createStandardXHR
  });

  util.$ = $;

};
