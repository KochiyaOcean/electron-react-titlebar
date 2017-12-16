import React, { PureComponent } from 'react'
import { Grid } from 'react-virtualized'
import { remote } from 'electron'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { reduxSet } from './utils'

const checked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/></svg>
const unchecked = <span />
const radioUnchecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
const radioChecked = <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>

class MenuListItem extends PureComponent {
  state = { selected: false }
  onMouseOver = e => this.setState({ selected: true })
  onMouseLeave = e => this.setState({ selected: false })
  handleClick = e => {
    const { mainIndex, subIndex, curItem, changeCheckState } = this.props
    if (curItem.enabled === false) {
      e.stopPropagation()
      return
    } else if (curItem.type === 'checkbox') {
      e.persist()
      const nextCurItem = {
        ...curItem,
        checked: !curItem.checked,
      }
      curItem.click(nextCurItem, remote.getCurrentWindow(), e)
      changeCheckState(mainIndex, subIndex, !curItem.checked)
    } else if (curItem.type === 'radio') {
      const nextCurItem = {
        ...curItem,
        checked: true,
      }
      curItem.click(nextCurItem, remote.getCurrentWindow(), e)
      if (!curItem.checked) {
        changeCheckState(mainIndex, subIndex, true, true)
      }
    } else {
      e.persist()
      curItem.click(curItem, remote.getCurrentWindow(), e)
    }
  }
  render() {
    const { curItem, style } = this.props
    if (curItem.visiable == false) {
      return <div />
    }
    const listItemClass = classnames("list-item", { 'selected': this.state.selected && curItem.type !== 'separator' && curItem.enabled !== false })
    const menuItemClass = classnames("menu-item", { 'disabled': curItem.enabled === false })
    const innerContent = (
      curItem.type === 'separator'?
      <hr /> :
      <div className={menuItemClass} onClick={this.handleClick}>
        <div className="status-icon">
          {
            curItem.type === 'radio' ?
            curItem.checked ? radioChecked : radioUnchecked :
            curItem.checked && curItem.type === 'checkbox' ? checked : unchecked
          }
        </div>
        <div className="menu-label">
          <span>
          { curItem.label }
          </span>
        </div>
        <div className="accelerator">
        { curItem.accelerator || '' }
        </div>
      </div>
    )
    return (
      <div role="menuitem" className={listItemClass} style={style} tabIndex="-1"
        onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        { innerContent }
      </div>
    )
  }
}

class MenuList extends PureComponent {
  getRowHeight = ({ index }) => {
    const menuListItem = this.props.menulist[index]
    if (menuListItem.visiable === false) {
      return 0
    } else if (menuListItem.type === 'separator') {
      return 10
    } else {
      return 30
    }
  }
  MenuListRenderer = ({ columnIndex, key, rowIndex, style }) => (
    <MenuListItem key={key}
      curItem={this.props.menulist[rowIndex]}
      style={style}
      changeCheckState={this.props.changeCheckState}
      mainIndex={this.props.mainIndex}
      subIndex={rowIndex} />
  )
  render() {
    const { rect, menulist } = this.props
    const menuListHeight = menulist.map((l, index) => this.getRowHeight({ index })).reduce((a, b) => a + b, 0)
    return (
      <div id="foldout-container" style={{
        position: 'absolute',
        top: rect.bottom,
        left: 0,
        width: '100%',
        height: `calc(100% - ${rect.bottom}px)`,
      }}>
        <div className="overlay" tabIndex="-1" />
        <div className="foldout" style={{
          position: 'absolute',
          marginLeft: rect.left,
          maxWidth: `calc(100% - ${rect.left}px)`,
          height: '100%',
          overflow: 'hidden',
          top: 0,
        }}>
          <div id="app-menu-foldout">
            <div className="menu-pane" style={{
              height: menuListHeight,
              maxHeight: '100%',
            }}>
              <div className="list" role="menu">
                <Grid
                  cellRenderer={this.MenuListRenderer}
                  columnCount={1}
                  rowCount={menulist.length}
                  columnWidth={240}
                  height={menuListHeight}
                  rowHeight={this.getRowHeight}
                  width={240}
                />
              </div>
              <div className="menu-pane menu-endblock" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class MenuBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      focusing: 0,
      menu: props.menu,
    }
  }
  static propTypes = {
    menu: PropTypes.array,
  }
  onButtonMouseOver = (i) => {
    if (this.state.clicked) this.setState({ focusing: i })
  }
  onButtonClick = (i) => {
    if (this.lock) {
      this.lock = false
      return
    }
    this.setState({
      clicked: !(this.state.focusing === i && this.state.clicked),
    })
  }
  onTouchStart = (i) => {
    if (i !== this.state.focusing && this.state.clicked) {
      this.lock = true
    }
  }
  onMouseMove = (i) => {
    if (i === this.state.focusing) return
    this.setState({
      focusing: i,
    })
  }
  setRefs = (ref, i) => {
    if (this.menuItems) {
      this.menuItems[i] = ref
    } else {
      this.menuItems = { [i]: ref }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.menu !== this.state.menu) {
      this.setState({ menu: nextProps.menu })
    }
  }
  changeCheckState = (mainIndex, subIndex, checked, isRadio=false) => {
    if (!isRadio) {
      this.setState(reduxSet(this.state, ['menu', mainIndex, 'submenu', subIndex, 'checked'], checked))
    } else {
      let newState = { ...this.state }
      const menuLength = this.state.menu[mainIndex].submenu.length
      for (let i = 0; i < menuLength; i++) {
        if (this.state.menu[mainIndex].submenu[i].type === 'radio') {
          newState = reduxSet(newState, ['menu', mainIndex, 'submenu', i, 'checked'], i === subIndex)
        }
      }
      this.setState(newState)
    }
  }
  render() {
    return (
      <div id="app-menu-bar" role="menubar" aria-label="Application menu">
      {
        this.state.menu.map((menuItem, i) => {
          return (
            <div key={i} onMouseOver={e => this.onButtonMouseOver(i)}
              onClick={e => this.onButtonClick(i)}
              onTouchStart={e => this.onTouchStart(i)}
              onMouseMove={e => this.onMouseMove(i)}
              ref={ref => this.setRefs(ref, i)}
              className={classnames('toolbar-dropdown', {
                'open': this.state.clicked && i === this.state.focusing,
                'closed': !this.state.clicked || i !== this.state.focusing,
              })}>
              {
                this.state.clicked && i === this.state.focusing &&
                <MenuList rect={this.menuItems[i].getBoundingClientRect()}
                  menulist={menuItem.submenu}
                  changeCheckState={this.changeCheckState}
                  mainIndex={i} />
              }
              <div className="toolbar-button">
                <button className="button-component" type="button" tabIndex="-1">
                  <div className="menu-item">
                    <div className="menu-label">
                      <span aria-label="View">
                        <span aria-hidden="true">{menuItem.label}</span>
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )})
      }
      </div>
    )
  }
}
