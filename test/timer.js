"use strict";

var assert = require("power-assert");
var tickable = require("tickable-timer");
var drunk = require("..");

describe("drunk-timer", function() {
  beforeEach(function() {
    drunk.config({
      timerAPI: tickable,
      drunk: function(value) {
        return value;
      }
    });
  });

  it("works", function() {
    var passed;
    var timerId1 = drunk.setInterval(function() { passed.push("A") }, 100);
    var timerId2 = drunk.setInterval(function() { passed.push("B") }, 125);
    var timerId3 = drunk.setInterval(function() { passed.push("C") }, 250);
    var timerId4 = drunk.setTimeout(function() { passed.push("D") }, 250);
    var timerId5 = drunk.setTimeout(function() { passed.push("E") }, 750);
    var timerId6 = drunk.setTimeout(function() { passed.push("F") }, 1000);

    assert(typeof timerId1 === "number");
    assert(typeof timerId4 === "number");
    assert(timerId1 !== timerId2);
    assert(timerId1 !== timerId3);
    assert(timerId1 !== timerId4);
    assert(timerId1 !== timerId5);
    assert(timerId1 !== timerId6);
    assert(timerId2 !== timerId3);
    assert(timerId2 !== timerId4);
    assert(timerId2 !== timerId5);
    assert(timerId2 !== timerId6);
    assert(timerId3 !== timerId4);
    assert(timerId3 !== timerId5);
    assert(timerId3 !== timerId6);
    assert(timerId4 !== timerId5);
    assert(timerId4 !== timerId6);
    assert(timerId5 !== timerId6);

    // 00:00.000 -> 00:00.500
    passed = [];
    tickable.tick(500);

    assert.deepEqual(passed, [
      "A",           // 00:00.100
      "B",           // 00:00.125
      "A",           // 00:00.200
      "C", "D", "B", // 00:00.250
      "A",           // 00:00.300
      "B",           // 00:00.375
      "A",           // 00:00.400
      "C", "B", "A", // 00:00.500
      ], "00:00.500");

      // 00:00.500 -> 00:01.000
      drunk.clearInterval(timerId2);
      drunk.clearTimeout(timerId3);
      drunk.clearTimeout(timerId5);
      drunk.clearInterval(timerId6);

      passed = [];
      tickable.tick(500);

      assert.deepEqual(passed, [
        "A",           // 00:00.600
        "A",           // 00:00.700
        "C",           // 00:00.750
        "A",           // 00:00.800
        "A",           // 00:00.900
        "F", "C", "A", // 00:01.000
        ], "00:01.000");

        drunk.clearInterval(timerId1);
        drunk.clearInterval(timerId3);
        drunk.clearTimeout(timerId4);
        drunk.clearTimeout(timerId6);
      });
    });
