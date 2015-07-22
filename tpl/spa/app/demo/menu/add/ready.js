'use strict';

module.exports = function() {
  var plugin = this,
    host = plugin.host;

  // 控制按钮显示

  setTimeout(function(){
    host.getPlugin('crud').exports.before('useTo', function(node) {
      var level = node.getLevel();

      // 添加子节点
      this.$('[data-role="add-node"]').toggle(
        // 小于二级
        level < 2 &&
        // 如果是顶级，则要求子节点数量小于 3
        (level > 0 || Object.keys(node.children()).length < 3)
      );
    });
  }, 80);

};
