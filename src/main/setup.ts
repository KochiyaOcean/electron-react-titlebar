import { ipcMain, BrowserWindow, WebContents } from 'electron'

const setupEventListener = (browserWindow: BrowserWindow, sender: WebContents) => {
  browserWindow.addListener('maximize', () => {
    sender.send('electron-react-titlebar/maximunize/change', true, browserWindow.id)
  })
  browserWindow.addListener('unmaximize', () => {
    sender.send('electron-react-titlebar/maximunize/change', false, browserWindow.id)
  })
}

export const initialize = (): void => {
  ipcMain.on('electron-react-titlebar/initialize', (event, browserWindowId) => {
    const browserWindow = browserWindowId ? BrowserWindow.fromId(browserWindowId) : BrowserWindow.fromWebContents(event.sender)
    if (browserWindow) {
      setupEventListener(browserWindow, event.sender)
      event.sender.send('electron-react-titlebar/browser-window-id', browserWindow.id)
    }
  })

  ipcMain.on('electron-react-titlebar/maximumize/set', (event, browserWindowId) => {
    const browserWindow = browserWindowId ? BrowserWindow.fromId(browserWindowId) : BrowserWindow.fromWebContents(event.sender)
    if (browserWindow?.isMaximizable()) {
      if (browserWindow.isMaximized()) {
        browserWindow.unmaximize()
      } else {
        browserWindow.maximize()
      }
    }
  })

  ipcMain.on('electron-react-titlebar/minimumize/set', (event, browserWindowId) => {
    const browserWindow = browserWindowId ? BrowserWindow.fromId(browserWindowId) : BrowserWindow.fromWebContents(event.sender)
    browserWindow?.minimize()
  })

  ipcMain.on('electron-react-titlebar/close', (event, browserWindowId) => {
    const browserWindow = browserWindowId ? BrowserWindow.fromId(browserWindowId) : BrowserWindow.fromWebContents(event.sender)
    browserWindow?.close()
  })
}
