'use strict';

var observable = require('riot-observable')

function Site() {
  observable(this)
}

Site.prototype.mount = function(data, title) {
  this.trigger('mount', data, title)
}

Site.prototype.flash = function(msg, type) {
  this.trigger('coect:flash', msg, type)
}

Site.prototype.error = function(message) {
  if (window.console) console.log('Site.error', message)
  this.trigger('coect:error', message)
}

module.exports = new Site()
