'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.reduxSet = reduxSet;

var _lodash = require('lodash');

function reduxSet(obj, path, val) {
  const [prop, ...restPath] = path;
  if (typeof prop === 'undefined') {
    if (!(0, _lodash.isEqual)(obj, val)) return val;else return obj;
  }
  let before;
  if (prop in obj) {
    before = obj[prop];
  } else {
    before = {};
  }
  const after = reduxSet(before, restPath, val);
  if (after !== before) {
    let result;
    if (Array.isArray(obj)) {
      result = obj.slice();
      result[prop] = after;
    } else {
      result = _extends({}, obj, {
        [prop]: after
      });
    }
    return result;
  }
  return obj;
}