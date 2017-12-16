'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _electron = require('electron');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checked = _react2.default.createElement(
  'svg',
  { width: '1792', height: '1792', viewBox: '0 0 1792 1792', xmlns: 'http://www.w3.org/2000/svg' },
  _react2.default.createElement('path', { d: 'M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z' })
);
const unchecked = _react2.default.createElement('span', null);
const radioUnchecked = _react2.default.createElement(
  'svg',
  { width: '1792', height: '1792', viewBox: '0 0 1792 1792', xmlns: 'http://www.w3.org/2000/svg' },
  _react2.default.createElement('path', { d: 'M896 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z' })
);
const radioChecked = _react2.default.createElement(
  'svg',
  { width: '1792', height: '1792', viewBox: '0 0 1792 1792', xmlns: 'http://www.w3.org/2000/svg' },
  _react2.default.createElement('path', { d: 'M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z' })
);

class MenuListItem extends _react.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { selected: false }, this.onMouseOver = e => this.setState({ selected: true }), this.onMouseLeave = e => this.setState({ selected: false }), this.handleClick = e => {
      const { mainIndex, subIndex, curItem, changeCheckState } = this.props;
      if (curItem.enabled === false) {
        e.stopPropagation();
        return;
      } else if (curItem.type === 'checkbox') {
        e.persist();
        const nextCurItem = _extends({}, curItem, {
          checked: !curItem.checked
        });
        curItem.click(nextCurItem, _electron.remote.getCurrentWindow(), e);
        changeCheckState(mainIndex, subIndex, !curItem.checked);
      } else if (curItem.type === 'radio') {
        const nextCurItem = _extends({}, curItem, {
          checked: true
        });
        curItem.click(nextCurItem, _electron.remote.getCurrentWindow(), e);
        if (!curItem.checked) {
          changeCheckState(mainIndex, subIndex, true, true);
        }
      } else {
        e.persist();
        curItem.click(curItem, _electron.remote.getCurrentWindow(), e);
      }
    }, _temp;
  }

  render() {
    const { curItem, style } = this.props;
    if (curItem.visiable == false) {
      return _react2.default.createElement('div', null);
    }
    const listItemClass = (0, _classnames2.default)("list-item", { 'selected': this.state.selected && curItem.type !== 'separator' && curItem.enabled !== false });
    const menuItemClass = (0, _classnames2.default)("menu-item", { 'disabled': curItem.enabled === false });
    const innerContent = curItem.type === 'separator' ? _react2.default.createElement('hr', null) : _react2.default.createElement(
      'div',
      { className: menuItemClass, onClick: this.handleClick },
      _react2.default.createElement(
        'div',
        { className: 'status-icon' },
        curItem.type === 'radio' ? curItem.checked ? radioChecked : radioUnchecked : curItem.checked && curItem.type === 'checkbox' ? checked : unchecked
      ),
      _react2.default.createElement(
        'div',
        { className: 'menu-label' },
        _react2.default.createElement(
          'span',
          null,
          curItem.label
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'accelerator' },
        curItem.accelerator || ''
      )
    );
    return _react2.default.createElement(
      'div',
      { role: 'menuitem', className: listItemClass, style: style, tabIndex: '-1',
        onMouseOver: this.onMouseOver, onMouseLeave: this.onMouseLeave },
      innerContent
    );
  }
}

class MenuList extends _react.PureComponent {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.getRowHeight = ({ index }) => {
      const menuListItem = this.props.menulist[index];
      if (menuListItem.visiable === false) {
        return 0;
      } else if (menuListItem.type === 'separator') {
        return 10;
      } else {
        return 30;
      }
    }, this.MenuListRenderer = ({ columnIndex, key, rowIndex, style }) => _react2.default.createElement(MenuListItem, { key: key,
      curItem: this.props.menulist[rowIndex],
      style: style,
      changeCheckState: this.props.changeCheckState,
      mainIndex: this.props.mainIndex,
      subIndex: rowIndex }), _temp2;
  }

  render() {
    const { rect, menulist } = this.props;
    const menuListHeight = menulist.map((l, index) => this.getRowHeight({ index })).reduce((a, b) => a + b, 0);
    return _react2.default.createElement(
      'div',
      { id: 'foldout-container', style: {
          position: 'absolute',
          top: rect.bottom,
          left: 0,
          width: '100%',
          height: `calc(100% - ${rect.bottom}px)`
        } },
      _react2.default.createElement('div', { className: 'overlay', tabIndex: '-1' }),
      _react2.default.createElement(
        'div',
        { className: 'foldout', style: {
            position: 'absolute',
            marginLeft: rect.left,
            maxWidth: `calc(100% - ${rect.left}px)`,
            height: '100%',
            overflow: 'hidden',
            top: 0
          } },
        _react2.default.createElement(
          'div',
          { id: 'app-menu-foldout' },
          _react2.default.createElement(
            'div',
            { className: 'menu-pane', style: {
                height: menuListHeight,
                maxHeight: '100%'
              } },
            _react2.default.createElement(
              'div',
              { className: 'list', role: 'menu' },
              _react2.default.createElement(_reactVirtualized.Grid, {
                cellRenderer: this.MenuListRenderer,
                columnCount: 1,
                rowCount: menulist.length,
                columnWidth: 240,
                height: menuListHeight,
                rowHeight: this.getRowHeight,
                width: 240
              })
            ),
            _react2.default.createElement('div', { className: 'menu-pane menu-endblock' })
          )
        )
      )
    );
  }
}

class MenuBar extends _react.PureComponent {
  constructor(props) {
    super(props);

    this.onButtonMouseOver = i => {
      if (this.state.clicked) this.setState({ focusing: i });
    };

    this.onButtonClick = i => {
      if (this.lock) {
        this.lock = false;
        return;
      }
      this.setState({
        clicked: !(this.state.focusing === i && this.state.clicked)
      });
    };

    this.onTouchStart = i => {
      if (i !== this.state.focusing && this.state.clicked) {
        this.lock = true;
      }
    };

    this.onMouseMove = i => {
      if (i === this.state.focusing) return;
      this.setState({
        focusing: i
      });
    };

    this.setRefs = (ref, i) => {
      if (this.menuItems) {
        this.menuItems[i] = ref;
      } else {
        this.menuItems = { [i]: ref };
      }
    };

    this.changeCheckState = (mainIndex, subIndex, checked, isRadio = false) => {
      if (!isRadio) {
        this.setState((0, _utils.reduxSet)(this.state, ['menu', mainIndex, 'submenu', subIndex, 'checked'], checked));
      } else {
        let newState = _extends({}, this.state);
        const menuLength = this.state.menu[mainIndex].submenu.length;
        for (let i = 0; i < menuLength; i++) {
          if (this.state.menu[mainIndex].submenu[i].type === 'radio') {
            newState = (0, _utils.reduxSet)(newState, ['menu', mainIndex, 'submenu', i, 'checked'], i === subIndex);
          }
        }
        this.setState(newState);
      }
    };

    this.state = {
      clicked: false,
      focusing: 0,
      menu: props.menu
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menu !== this.state.menu) {
      this.setState({ menu: nextProps.menu });
    }
  }

  render() {
    return _react2.default.createElement(
      'div',
      { id: 'app-menu-bar', role: 'menubar', 'aria-label': 'Application menu' },
      this.state.menu.map((menuItem, i) => {
        return _react2.default.createElement(
          'div',
          { key: i, onMouseOver: e => this.onButtonMouseOver(i),
            onClick: e => this.onButtonClick(i),
            onTouchStart: e => this.onTouchStart(i),
            onMouseMove: e => this.onMouseMove(i),
            ref: ref => this.setRefs(ref, i),
            className: (0, _classnames2.default)('toolbar-dropdown', {
              'open': this.state.clicked && i === this.state.focusing,
              'closed': !this.state.clicked || i !== this.state.focusing
            }) },
          this.state.clicked && i === this.state.focusing && _react2.default.createElement(MenuList, { rect: this.menuItems[i].getBoundingClientRect(),
            menulist: menuItem.submenu,
            changeCheckState: this.changeCheckState,
            mainIndex: i }),
          _react2.default.createElement(
            'div',
            { className: 'toolbar-button' },
            _react2.default.createElement(
              'button',
              { className: 'button-component', type: 'button', tabIndex: '-1' },
              _react2.default.createElement(
                'div',
                { className: 'menu-item' },
                _react2.default.createElement(
                  'div',
                  { className: 'menu-label' },
                  _react2.default.createElement(
                    'span',
                    { 'aria-label': 'View' },
                    _react2.default.createElement(
                      'span',
                      { 'aria-hidden': 'true' },
                      menuItem.label
                    )
                  )
                )
              )
            )
          )
        );
      })
    );
  }
}
exports.MenuBar = MenuBar;
MenuBar.propTypes = {
  menu: _propTypes2.default.array
};