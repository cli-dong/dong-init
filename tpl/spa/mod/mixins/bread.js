'use strict';

module.exports = function(util) {

  var breads = [];

  util.bread = {
    set: function(value) {
      breads = value;
      this.render();
    },
    get: function() {
      return breads;
    },
    render: function() {
      util.layout.render('bread');
    }
  };

  ['push', 'unshift', 'splice', 'pop', 'shift'].forEach(function(method) {
    util.bread[method] = function() {
      breads[method].apply(breads, arguments);
      this.render();
    };
  });

  /**
   * @method push
   */

  /**
   * @method unshift
   */

  /**
   * @method splice
   */

  /**
   * @method pop
   */

  /**
   * @method shift
   */

};
