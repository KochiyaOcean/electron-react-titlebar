const electron = require('electron')
const { app, BrowserWindow } = electron

let mainWindow

const { initialize } = require('../dist/main')
initialize()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
    frame: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL('file://' + __dirname + '/main.html')

  if (process.env['DEBUG']) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
