'use strict';

var observable = require('riot-observable')

function Site() {
  observable(this)
}

Site.prototype.mount = function(data, title) {
  this.trigger('mount', data, title)
}

Site.prototype.flash = function(msg, type) {
  this.trigger('flash', msg, type)
}

Site.prototype.error = function(message) {
  console.error(message)
  this.trigger('error', message)
}

module.exports = new Site()
