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
  ipcMain.handle('electron-react-titlebar/initialize', (event, browserWindowId: number): number | undefined => {
    const browserWindow = browserWindowId
      ? BrowserWindow.fromId(browserWindowId)
      : BrowserWindow.fromWebContents(event.sender)
    if (browserWindow) {
      setupEventListener(browserWindow, event.sender)
      return browserWindow.id
    }
    return undefined
  })

  ipcMain.on('electron-react-titlebar/maximumize/set', (event, browserWindowId: number) => {
    const browserWindow = browserWindowId
      ? BrowserWindow.fromId(browserWindowId)
      : BrowserWindow.fromWebContents(event.sender)
    if (browserWindow?.isMaximizable()) {
      if (browserWindow.isMaximized()) {
        browserWindow.unmaximize()
      } else {
        browserWindow.maximize()
      }
    }
  })

  ipcMain.on('electron-react-titlebar/minimumize/set', (event, browserWindowId: number) => {
    const browserWindow = browserWindowId
      ? BrowserWindow.fromId(browserWindowId)
      : BrowserWindow.fromWebContents(event.sender)
    browserWindow?.minimize()
  })

  ipcMain.on('electron-react-titlebar/close', (event, browserWindowId: number) => {
    const browserWindow = browserWindowId
      ? BrowserWindow.fromId(browserWindowId)
      : BrowserWindow.fromWebContents(event.sender)
    browserWindow?.close()
  })
}
