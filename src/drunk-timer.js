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
