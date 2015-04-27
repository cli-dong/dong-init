'use strict'

var log = require('spm-log')
var shell = require('shelljs')

module.exports = function user() {
  var check = shell.exec('git config', {
    silent: true
  }).output.trim()

  if (check.indexOf('\'git\' ') === 0) {
    log.warn('init', 'Please install git <http://git-scm.com/> first!')
    process.exit(0)
  }

  var name = shell.exec('git config --get user.name', {
    silent: true
  }).output.trim()

  var email = shell.exec('git config --get user.email', {
    silent: true
  }).output.trim()

  return {
    name: name,
    email: email
  }
}
