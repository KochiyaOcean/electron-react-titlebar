import React from 'react'
import PropTypes from 'prop-types'

import { WindowControls } from './window-controls'
import { MenuBar } from './menu'

export const TitleBar = ({ icon, menu, disableMinimize, disableMaximize, className }) => (
  <div className={`electron-app-title-bar ${className || ''}`}>
    <link href="../assets/style.css" rel="stylesheet" />
    <img className="icon" src={icon} />
    <MenuBar menu={menu} />
    <WindowControls disableMinimize={disableMinimize} disableMaximize={disableMaximize} />
  </div>
)

TitleBar.propTypes = {
  icon: PropTypes.string,
  disableMinimize: PropTypes.bool,
  disableMaximize: PropTypes.bool,
  menu: PropTypes.array,
}
