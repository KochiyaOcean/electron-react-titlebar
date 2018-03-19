'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowControls = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _electron = require('electron');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WindowControls extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      isMaximized: this.props.currentWindow.isMaximized()
    }, this.componentDidMount = () => {
      this.props.currentWindow.addListener('maximize', e => this.setState({ isMaximized: true }));
      this.props.currentWindow.addListener('unmaximize', e => this.setState({ isMaximized: false }));
    }, _temp;
  }

  render() {
    const { disableMaximize, disableMinimize } = this.props;
    const { isMaximized } = this.state;
    return _react2.default.createElement(
      'div',
      { className: 'window-controls' },
      _react2.default.createElement(
        'button',
        { 'aria-label': 'minimize', tabIndex: '-1', className: 'window-control window-minimize', disabled: disableMinimize,
          onClick: e => this.props.currentWindow.minimize() },
        _react2.default.createElement(
          'svg',
          { 'aria-hidden': 'true', version: '1.1', width: '10', height: '10' },
          _react2.default.createElement('path', { d: 'M 0,5 10,5 10,6 0,6 Z' })
        )
      ),
      _react2.default.createElement(
        'button',
        { 'aria-label': 'maximize', tabIndex: '-1', className: 'window-control window-maximize', disabled: disableMaximize,
          onClick: e => this.props.currentWindow.isMaximizable() ? this.props.currentWindow.isMaximized() ? this.props.currentWindow.unmaximize() : this.props.currentWindow.maximize() : null },
        _react2.default.createElement(
          'svg',
          { 'aria-hidden': 'true', version: '1.1', width: '10', height: '10' },
          _react2.default.createElement('path', { d: isMaximized ? "m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z" : "M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z" })
        )
      ),
      _react2.default.createElement(
        'button',
        { 'aria-label': 'close', tabIndex: '-1', className: 'window-control window-close',
          onClick: e => this.props.currentWindow.close() },
        _react2.default.createElement(
          'svg',
          { 'aria-hidden': 'true', version: '1.1', width: '10', height: '10' },
          _react2.default.createElement('path', { d: 'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z' })
        )
      )
    );
  }
}
exports.WindowControls = WindowControls;
WindowControls.propTypes = {
  disableMinimize: _propTypes2.default.bool,
  disableMaximize: _propTypes2.default.bool,
  currentWindow: _propTypes2.default.object
};
WindowControls.defaultProps = {
  currentWindow: _electron.remote.getCurrentWindow()
};