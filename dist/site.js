(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Site = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"riot-observable":2}],2:[function(require,module,exports){
module.exports = function observable(el) {
  var callbacks = {}, slice = [].slice;

  el.on = function(events, fn) {
    if (typeof fn === "function") {
      events.replace(/[^\s]+/g, function(name, pos) {
        (callbacks[name] = callbacks[name] || []).push(fn);
        fn.typed = pos > 0;
      });
    }
    return el;
  };

  el.off = function(events) {
    events.replace(/[^\s]+/g, function(name) {
      callbacks[name] = [];
    });
    if (events == "*") callbacks = {};
    return el;
  };

  // only single event supported
  el.one = function(name, fn) {
    if (fn) fn.one = true;
    return el.on(name, fn);
  };

  el.trigger = function(name) {
    var args = slice.call(arguments, 1),
      fns = callbacks[name] || [];

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = true;
        fn.apply(el, fn.typed ? [name].concat(args) : args);
        if (fn.one) { fns.splice(i, 1); i--; }
        fn.busy = false;
      }
    }

    return el;
  };

  return el;

};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Jpb3Qtb2JzZXJ2YWJsZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb2JzZXJ2YWJsZSA9IHJlcXVpcmUoJ3Jpb3Qtb2JzZXJ2YWJsZScpXG5cbmZ1bmN0aW9uIFNpdGUoKSB7XG4gIG9ic2VydmFibGUodGhpcylcbn1cblxuU2l0ZS5wcm90b3R5cGUubW91bnQgPSBmdW5jdGlvbihkYXRhLCB0aXRsZSkge1xuICB0aGlzLnRyaWdnZXIoJ21vdW50JywgZGF0YSwgdGl0bGUpXG59XG5cblNpdGUucHJvdG90eXBlLmZsYXNoID0gZnVuY3Rpb24obXNnLCB0eXBlKSB7XG4gIHRoaXMudHJpZ2dlcignZmxhc2gnLCBtc2csIHR5cGUpXG59XG5cblNpdGUucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpXG4gIHRoaXMudHJpZ2dlcignZXJyb3InLCBtZXNzYWdlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlKClcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb2JzZXJ2YWJsZShlbCkge1xuICB2YXIgY2FsbGJhY2tzID0ge30sIHNsaWNlID0gW10uc2xpY2U7XG5cbiAgZWwub24gPSBmdW5jdGlvbihldmVudHMsIGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBldmVudHMucmVwbGFjZSgvW15cXHNdKy9nLCBmdW5jdGlvbihuYW1lLCBwb3MpIHtcbiAgICAgICAgKGNhbGxiYWNrc1tuYW1lXSA9IGNhbGxiYWNrc1tuYW1lXSB8fCBbXSkucHVzaChmbik7XG4gICAgICAgIGZuLnR5cGVkID0gcG9zID4gMDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgZWwub2ZmID0gZnVuY3Rpb24oZXZlbnRzKSB7XG4gICAgZXZlbnRzLnJlcGxhY2UoL1teXFxzXSsvZywgZnVuY3Rpb24obmFtZSkge1xuICAgICAgY2FsbGJhY2tzW25hbWVdID0gW107XG4gICAgfSk7XG4gICAgaWYgKGV2ZW50cyA9PSBcIipcIikgY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIC8vIG9ubHkgc2luZ2xlIGV2ZW50IHN1cHBvcnRlZFxuICBlbC5vbmUgPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmIChmbikgZm4ub25lID0gdHJ1ZTtcbiAgICByZXR1cm4gZWwub24obmFtZSwgZm4pO1xuICB9O1xuXG4gIGVsLnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICBmbnMgPSBjYWxsYmFja3NbbmFtZV0gfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMCwgZm47IChmbiA9IGZuc1tpXSk7ICsraSkge1xuICAgICAgaWYgKCFmbi5idXN5KSB7XG4gICAgICAgIGZuLmJ1c3kgPSB0cnVlO1xuICAgICAgICBmbi5hcHBseShlbCwgZm4udHlwZWQgPyBbbmFtZV0uY29uY2F0KGFyZ3MpIDogYXJncyk7XG4gICAgICAgIGlmIChmbi5vbmUpIHsgZm5zLnNwbGljZShpLCAxKTsgaS0tOyB9XG4gICAgICAgIGZuLmJ1c3kgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgcmV0dXJuIGVsO1xuXG59O1xuIl19
