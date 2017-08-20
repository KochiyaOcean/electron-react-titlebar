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

```javascript
import { TitleBar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'

ReactDOM.render(
    <TitleBar menu={menuTemplate} icon={iconPath} />,
    document.querySelector('title-bar')
)
```

### Options

#### disableMinimize

Disable minimize button

#### disableMaximize

Disable maximize button

#### icon

Path to icon file.

#### menu

Menu template of [Electron's Menu](https://github.com/electron/electron/blob/master/docs/api/menu.md#main-process)

Note: electron-react-titlebar is supporting a subset of [Electron's MenuItem](https://github.com/electron/electron/blob/master/docs/api/menu-item.md).

Supported options:

* `click` - supported
* `type` - `submenu` is not supported.
* `label` - supported
* `enabled` - supported
* `visible` - supported
* `checked` - supported
