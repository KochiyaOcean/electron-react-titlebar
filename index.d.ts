import { SFC, ReactNode } from 'react';
import { Accelerator, BrowserWindow } from 'electron';

export interface PartialMenuItemConstructorOptions {
  /**
   * Will be called with click(menuItem, browserWindow, event) when the menu item is
   * clicked.
   */
  click?: (menuItem: PartialMenuItemConstructorOptions, browserWindow: BrowserWindow, event: Event) => void;
  /**
   * Can be normal, separator, submenu, checkbox or radio.
   */
  type?: ('normal' | 'separator' | 'submenu' | 'checkbox' | 'radio');
  label?: string;
  accelerator?: Accelerator;
  /**
   * If false, the menu item will be greyed out and unclickable.
   */
  enabled?: boolean;
  /**
   * Should only be specified for checkbox or radio type menu items.
   */
  checked?: boolean;
  /**
   * Should be specified for submenu type menu items. If submenu is specified, the
   * type: 'submenu' can be omitted. If the value is not a Menu then it will be
   * automatically converted to one using Menu.buildFromTemplate.
   */
  submenu?: PartialMenuItemConstructorOptions[];
}

export const TitleBar: SFC<{
  children?: ReactNode;
  icon?: string;
  menu?: (PartialMenuItemConstructorOptions & { submenu: PartialMenuItemConstructorOptions[] })[];
  disableMinimize?: boolean;
  disableMaximize?: boolean;
  className?: string;
  currentWindow?: any;
}>;
