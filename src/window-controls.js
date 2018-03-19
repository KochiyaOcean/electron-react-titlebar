import React, { Component } from 'react'
import { remote } from 'electron'
import PropTypes from 'prop-types'

export class WindowControls extends Component {
  static propTypes = {
    disableMinimize: PropTypes.bool,
    disableMaximize: PropTypes.bool,
    currentWindow: PropTypes.object,
  }
  static defaultProps = {
    currentWindow: remote.getCurrentWindow(),
  }
  state = {
    isMaximized: this.props.currentWindow.isMaximized(),
  }
  componentDidMount = () => {
    this.props.currentWindow.addListener('maximize', e => this.setState({ isMaximized: true }))
    this.props.currentWindow.addListener('unmaximize', e => this.setState({ isMaximized: false }))
  }
  render() {
    const { disableMaximize, disableMinimize } = this.props
    const { isMaximized } = this.state
    return (
      <div className="window-controls">
        <button aria-label="minimize" tabIndex="-1" className="window-control window-minimize" disabled={disableMinimize}
          onClick={e => this.props.currentWindow.minimize()}>
          <svg aria-hidden="true" version="1.1" width="10" height="10">
            <path d="M 0,5 10,5 10,6 0,6 Z" />
          </svg>
        </button>
        <button aria-label="maximize" tabIndex="-1" className="window-control window-maximize" disabled={disableMaximize}
          onClick={e => this.props.currentWindow.isMaximizable() ? this.props.currentWindow.isMaximized() ? this.props.currentWindow.unmaximize() : this.props.currentWindow.maximize() : null}>
          <svg aria-hidden="true" version="1.1" width="10" height="10">
            <path d={isMaximized? "m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z" : "M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"} />
          </svg>
        </button>
        <button aria-label="close" tabIndex="-1" className="window-control window-close"
          onClick={e => this.props.currentWindow.close()}>
          <svg aria-hidden="true" version="1.1" width="10" height="10">
            <path d="M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z" />
          </svg>
        </button>
      </div>
    )
  }
}
