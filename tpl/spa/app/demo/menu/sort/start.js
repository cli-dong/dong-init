'use strict';

module.exports = function() {

  this.translate = function(data) {
    return {
      'srcNode_id': data.id,
      'destNode_id': data.parent
    };
  };

};
