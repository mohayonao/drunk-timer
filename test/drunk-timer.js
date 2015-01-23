"use strict";

var assert = require("power-assert");
var tickable = require("tickable-timer");
var DrunkTimer = require("../src/drunk-timer");

function iter(list) {
  var index = 0;
  return function() {
    return list[index++];
  };
}

describe("DrunkTimer", function() {
  it("works", function() {
    var passed = [];

    var timer = new DrunkTimer({
      timerAPI: tickable,
      rand: iter([ 0.5, 0.5, 0.25, 0.75, 0.0, 1.0 ]),
    });

    timer.set(function() {
      passed.push("*");
    }, 100);

    tickable.tick(99);
    assert(passed.length === 0, "00:00.099");

    tickable.tick(1);
    assert(passed.length === 1, "00:00.100");

    tickable.tick(99);
    assert(passed.length === 1, "00:00.199");

    tickable.tick(1);
    assert(passed.length === 2, "00:00.200");

    tickable.tick(94);
    assert(passed.length === 2, "00:00.294");

    tickable.tick(1);
    assert(passed.length === 3, "00:00.295");

    tickable.tick(104);
    assert(passed.length === 3, "00:00.399");

    tickable.tick(1);
    assert(passed.length === 4, "00:00.400");

    tickable.tick(89);
    assert(passed.length === 4, "00:00.489");

    tickable.tick(1);
    assert(passed.length === 5, "00:00.490");

    tickable.tick(109);
    assert(passed.length === 5, "00:00.599");

    tickable.tick(1);
    assert(passed.length === 6, "00:00.600");

    timer.clear();

    tickable.tick(400);
    assert(passed.length === 6, "00:01.000");
  });
  it("works: once", function() {
    var passed = [];

    var timer = new DrunkTimer({
      timerAPI: tickable,
      rand: iter([ 0.5, 0.5, 0.25, 0.75, 0.0, 1.0 ]),
      once: true
    });

    timer.set(function() {
      passed.push("*");
    }, 100);

    tickable.tick(99);
    assert(passed.length === 0, "00:00.099");

    tickable.tick(1);
    assert(passed.length === 1, "00:00.100");

    tickable.tick(900);
    assert(passed.length === 1, "00:01.000");
  });
});
