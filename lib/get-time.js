'use strict';

module.exports = function time() {
  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10)
  }

  var now = new Date()

  var d = [pad(now.getFullYear()),
              pad(now.getMonth() + 1),
              pad(now.getDate())].join('-')

  var t = [pad(now.getHours()),
              pad(now.getMinutes()),
              pad(now.getSeconds())].join(':')

  return [d, t].join(' ')
}
