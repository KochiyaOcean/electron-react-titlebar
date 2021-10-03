import { ipcMain, BrowserWindow } from 'electron'

export const initialize = (): void => {
  ipcMain.on('electron-react-titlebar/initialize', (event, browserWindowId) => {
    console.log(browserWindowId)
    const browserWindow = browserWindowId ? BrowserWindow.fromId(browserWindowId) : BrowserWindow.fromWebContents(event.sender)
    console.log(browserWindow)
    const callback = () => browserWindow?.webContents.send('electron-react-titlebar/maximunize/change', browserWindow.isMaximized())
    browserWindow?.on('maximize', callback)
    browserWindow?.on('unmaximize', callback)
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
