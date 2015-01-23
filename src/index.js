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
