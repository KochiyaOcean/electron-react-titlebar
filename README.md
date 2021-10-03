# electron-react-titlebar
A github desktop style title bar component for electron.

![screenshot](https://github.com/KochiyaOcean/electron-react-titlebar/raw/master/app/screenshot.PNG)

## Installation

```
npm i --save electron-react-titlebar
```

## Example

```
npm run build
npm run demo
```

## Usage

### Main process

```javascript
app.on('ready', () => {
  require('electron-react-titlebar/main').initialize()
})
```

### Renderer process

#### If you are using webpack

```javascript
import { TitleBar } from 'electron-react-titlebar/renderer'
import 'electron-react-titlebar/assets/style.css'

ReactDOM.render(
    <TitleBar menu={menuTemplate} icon={iconPath} />,
    document.querySelector('title-bar')
)
```

#### If you're not a webpack user and wants to load css directly

```js
ReactDOM.render(
    <TitleBar menu={menuTemplate} icon={iconPath}>
      <link rel="stylesheet" type="text/css" href={require.resolve('electron-react-titlebar/assets/style.css')} />
    </TitleBar>,
    document.body
)
```

## Options

### children?: node

Elements to be rendered in between the menu and the window controls (optional).

### disableMinimize?: boolean

Disable minimize button (optional).

### disableMaximize?: boolean

Disable maximize button (optional).

### icon?: string

Path to icon file (optional).

### browserWindowId?: number

The browserWindow's id that window controls affect to. Default value is the browserWindow that renders the component (optional).

### menu?: \<MenuTemplate\>

Menu template of [Electron's Menu](https://github.com/electron/electron/blob/master/docs/api/menu.md#main-process) (optional).

Note: electron-react-titlebar is supporting a subset of [Electron's MenuItem](https://github.com/electron/electron/blob/master/docs/api/menu-item.md).

Supported options:

* `click` - supported, but the callback only have `item` and `event` parameter, and the `browserWindow` parameter is removed due to restriction since Electron@14
* `type` - `submenu` is not supported.
* `label` - supported
* `enabled` - supported
* `visible` - supported
* `checked` - supported


## Breaking changes since v1.0.0

The v1.0.0 version contains following breaking changes:

- Requires `React@16.8` or newer version
- Due to the Electron's removal of remote module since version 14, electron-react-titlebar now:
  - Needs to initialize in main process (See example above)
  - The require path of component has changed to `electron-react-titlebar/renderer`
  - The `currentWindow` prop has been removed, instead you can control your browserWindow by `browserWindowId` prop
  - The second parameter of callback of menuItem's click handler (the browserWindow) has been removed

If you're still using Electron below 14 and don't want to take breaking changes, you can still use 0.x version of electron-react-titlebar.
