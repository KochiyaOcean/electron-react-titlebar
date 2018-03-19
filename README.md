# electron-react-titlebar
A github desktop style title bar component for electron.

![screenshot](https://github.com/KochiyaOcean/electron-react-titlebar/raw/master/app/screenshot.PNG)

## Installation

```
npm i --save electron-react-titlebar
```

## Example

You should have electron installed first.

```
electron app
```

## Usage

### If you are using webpack

```javascript
import { TitleBar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'

ReactDOM.render(
    <TitleBar menu={menuTemplate} icon={iconPath} />,
    document.querySelector('title-bar')
)
```

### If you're not a webpack user and wants to load css directly

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

### currentWindow?: \<BrowserWindow\>

The browserWindow Object that window controls affect to. Default value is `remote.currentWindow()` (optional).

### menu?: \<MenuTemplate\>

Menu template of [Electron's Menu](https://github.com/electron/electron/blob/master/docs/api/menu.md#main-process) (optional).

Note: electron-react-titlebar is supporting a subset of [Electron's MenuItem](https://github.com/electron/electron/blob/master/docs/api/menu-item.md).

Supported options:

* `click` - supported
* `type` - `submenu` is not supported.
* `label` - supported
* `enabled` - supported
* `visible` - supported
* `checked` - supported
