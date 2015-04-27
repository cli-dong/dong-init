'use strict';

var header = require('./header');
var sidebar = require('./sidebar');
var footer = require('./footer');

var classList = document.getElementById('container').classList;

exports.render = function(util) {
  document.title = document.title + ' ' + util.SITE_TITLE;

  if (util.auth.isAuthed()) {
    classList.remove('unauthed');
  } else {
    classList.add('unauthed');
  }

  // partials
  header.render(util);
  sidebar.render(util);
  footer.render(util);
};
