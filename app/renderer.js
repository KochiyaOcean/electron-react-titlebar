const React = require('react')
const ReactDOM = require('react-dom')
const { shell, remote } = require('electron')
const { openExternal } = shell

const { TitleBar } = require('..')

const template = [
  {
    label: 'App',
    submenu: [
      {
        label: 'Disabled',
        enabled: false,
      },
      {
        label: 'Not Visiable',
        visiable: false,
      },
      {
        label: 'Arguments',
        click: (item, win, e) => console.log(item, win, e),
      },
      { type: 'separator' },
      {
        label: 'Open Dev Tools',
        click: (item, win, e) => {
          win.openDevTools()
        },
      },
      {
        label: 'Resizable',
        type: 'checkbox',
        checked: true,
        click: (item, win, e) => remote.getCurrentWindow().setResizable(item.checked),
      },
      {
        label: 'Quit',
        click: () => {
          window.close()
        },
      },
    ],
  },
  {
    label: 'Color',
    submenu: [
      {
        label: 'Light',
        type: 'radio',
        checked: false,
        click: (item, win, e) => document.querySelector('html').style.background = 'rgb(240,240,240)',
      },
      {
        label: 'Dark',
        type: 'radio',
        checked: true,
        click: (item, win, e) => document.querySelector('html').style.background = 'rgb(64,64,64)',
      },
      {
        label: 'Black',
        type: 'radio',
        checked: false,
        click: (item, win, e) => document.querySelector('html').style.background = 'rgb(0,0,0)',
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Homepage',
        click: () => {
          openExternal('https://github.com/KochiyaOcean/electron-react-titlebar')
        },
      },
    ],
  },
]

ReactDOM.render(React.createElement(TitleBar, {icon: __dirname + '/icon.png', menu: template}), document.querySelector('.title'))
