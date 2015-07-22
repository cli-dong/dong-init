'use strict';

var Tree = require('nd-tree');

var util = require('../../../mod/util');

var ucOrgNodeModel = require('../../../mod/model/uc/org/node');

var replacement = {
  'org_id': util.auth.getUser('org_exinfo', 'org_id')
};

ucOrgNodeModel.on('all', function(type, options) {
  options.replacement = replacement;
});

util.ready(function() {
  var instance = new Tree({
    proxy: ucOrgNodeModel,

    keyMap: {
      id: 'node_id',
      name: 'node_name',
      parent: 'parent_id'
    },

    treeName: '组织结构',

    foldable: true,
    checkable: true,
    // multiple: false,

    editable: true,
    sortable: true,

    checked: true,

    pluginCfg: {
      addNode: {
        listeners: {
          start: require('./add/start')
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
      }
    },
    // nodes: data.items,
    parentNode: '#main'
  }).render();

  return function() {
    instance.destroy();
  };
});
