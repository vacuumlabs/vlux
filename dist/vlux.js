'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var isDev = 'production' !== process.env.NODE_ENV;

var Dispatcher = (function () {
  function Dispatcher(store) {
    _classCallCheck(this, Dispatcher);

    this.store = store;
    this.state = store();
  }

  _createClass(Dispatcher, [{
    key: 'dispatch',
    value: function dispatch(action) {
      if (typeof action === 'function') {
        action(this.dispatch.bind(this), this.state);
      } else if (typeof action === 'undefined') {
        return;
      } else {
        if (isDev) console.log(action);
        this.state = this.store(this.state, action);
        this.onChange && this.onChange(this.state);
      }
    }
  }, {
    key: 'load',
    value: function load(state) {
      this.state = this.store(state);
      this.onChange && this.onChange(this.state);
    }
  }]);

  return Dispatcher;
})();

exports.Dispatcher = Dispatcher;
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _dispatcher = require('./dispatcher');

_defaults(exports, _interopRequireWildcard(_dispatcher));