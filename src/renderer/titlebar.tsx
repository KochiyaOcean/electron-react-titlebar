import React, { PropsWithChildren } from 'react'

import { WindowControls } from './window-controls'
import { MenuBar, MenuT } from './menu'

export interface TitleBarProps {
  icon?: string
  menu?: MenuT[]
  disableMinimize?: boolean
  disableMaximize?: boolean
  disableClose?: boolean
  className?: string
  browserWindowId?: number
}

export const TitleBar: React.FC<PropsWithChildren<TitleBarProps>> = ({
  children,
  icon,
  menu,
  disableMinimize,
  disableMaximize,
  disableClose,
  className,
  browserWindowId,
}) => (
  <div id="electron-app-title-bar" className={`electron-app-title-bar ${className || ''}`}>
    <div className="resize-handle resize-handle-top" />
    <div className="resize-handle resize-handle-left" />
    {!!icon && <img className="icon" src={icon} />}
    {!!menu && <MenuBar menu={menu} />}
    {children}
    <WindowControls
      disableMinimize={disableMinimize}
      disableMaximize={disableMaximize}
      disableClose={disableClose}
      browserWindowId={browserWindowId}
    />
  </div>
)
