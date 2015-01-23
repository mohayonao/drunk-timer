!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.DrunkTimer=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

function drunkFunc(value, rand) {
  return value + (rand() * 2 - 1) * 0.1 * value;
}

function DrunkTimer(opts) {
  opts = opts || {};
  this.drunk = opts.drunk || drunkFunc;
  this.timerAPI = opts.timerAPI || global;
  this.rand = opts.rand || Math.random;
  this.once = !!opts.once;
  this.timerId = 0;
}

DrunkTimer.prototype.set = function(callback, delay) {
  var _this = this;

  function drunkCallback() {
    callback();
    if (!_this.once) {
      next(callback, delay);
    }
  }

  function next(callback, delay) {
    var drunkDelay = _this.drunk(delay, _this.rand);

    drunkDelay = Math.max(0, +drunkDelay||0);

    _this.timerId = _this.timerAPI.setTimeout(drunkCallback, drunkDelay);
  }

  next(callback, delay);
};

DrunkTimer.prototype.clear = function() {
  if (this.timerId) {
    this.timerAPI.clearTimeout(this.timerId);
    this.timerId = 0;
  }
};

module.exports = DrunkTimer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
"use strict";

var DrunkTimer = require("./drunk-timer");

var _timerId = 0;
var _timers = [];
var _config = {};

module.exports = {
  config: function(opts) {
    if (opts) {
      _config.drunk = opts.drunk;
      _config.timerAPI = opts.timerAPI;
      _config.rand = opts.rand;
    }
  },
  setInterval: function(callback, delay) {
    var timer = new DrunkTimer({
      drunk: _config.drunk,
      timerAPI: _config.timerAPI,
      rand: _config.rand,
      once: false
    });

    timer.set(callback, delay);

    _timerId += 1;
    _timers[_timerId] = timer;

    return _timerId;
  },
  setTimeout: function(callback, delay) {
    var timer = new DrunkTimer({
      drunk: _config.drunk,
      timerAPI: _config.timerAPI,
      rand: _config.rand,
      once: true
    });

    timer.set(callback, delay);

    _timerId += 1;
    _timers[_timerId] = timer;

    return _timerId;
  },
  clearInterval: function(timerId) {
    if (_timers[timerId] && !_timers[timerId].once) {
      _timers[timerId].clear();
      delete _timers[timerId];
    }
  },
  clearTimeout: function(timerId) {
    if (_timers[timerId] && +_timers[timerId].once) {
      _timers[timerId].clear();
      delete _timers[timerId];
    }
  }
};

},{"./drunk-timer":1}]},{},[2])(2)
});