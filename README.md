# drunk-timer
[![Build Status](http://img.shields.io/travis/mohayonao/tickable-timer.svg?style=flat)](https://travis-ci.org/mohayonao/tickable-timer)
[![NPM Version](http://img.shields.io/npm/v/drunk-timer.svg?style=flat)](https://www.npmjs.org/package/drunk-timer)
[![Bower](https://img.shields.io/bower/v/drunk-timer.svg?style=flat)](https://github.com/mohayonao/drunk-timer)

> Staggering timer API

demo: [drunk-mertonome](http://mohayonao.github.io/drunk-timer/)

## Installation

npm:

```
npm install drunk-timer
```

bower:

```
bower install drunk-timer
```

downloads:

- [drunk-timer.js](https://raw.githubusercontent.com/mohayonao/drunk-timer/master/build/drunk-timer.js)
- [drunk-timer.min.js](https://raw.githubusercontent.com/mohayonao/drunk-timer/master/build/drunk-timer.min.js)

## API

- `config(opts={}): void`
- `setInterval(callback: function, delay: number): number`
- `clearInterval(timerId: number): void`
- `setTimeout(callback: function, delay: number): number`
- `clearTimeout(timerId: number): void`

### Config options

- `drunk: function` _default: ``(value, rand)=> value ± rand 10%`_
- `timerAPI: object` _default: `window || global`_
- `rand: function` _default: `Math.random`_

## License

MIT
