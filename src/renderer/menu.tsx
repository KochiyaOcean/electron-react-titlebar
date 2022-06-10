import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { reduxSet } from './utils'
import { MenuList } from './menu-list'
import { MenuItemT } from './menu-list-item'

export interface MenuT {
  label: string
  submenu: MenuItemT[]
}

export interface MenuBarProps {
  menu: MenuT[]
}

export const MenuBar: React.FC<MenuBarProps> = ({ menu: propMenu }) => {
  const [clicked, setClicked] = useState(false)
  const [focusing, setFocusing] = useState(0)
  const [menu, setMenu] = useState<MenuT[]>(propMenu)
  const lock = useRef(false)
  const menuItems = useRef<{ [i: number]: HTMLDivElement }>({})

  const onButtonMouseOver = useCallback(
    (i: number) => {
      if (clicked) {
        setFocusing(i)
      }
    },
    [clicked]
  )

  const onButtonClick = useCallback(
    (i) => {
      if (lock.current) {
        lock.current = false
        return
      }
      setClicked(!(focusing === i && clicked))
    },
    [clicked, focusing]
  )

  const onTouchStart = useCallback(
    (i) => {
      if (i !== focusing && clicked) {
        lock.current = true
      }
    },
    [clicked, focusing]
  )

  const onMouseMove = (i: number) => {
    setFocusing(i)
  }

  const setRefs = (ref: HTMLDivElement, i: number) => {
    menuItems.current[i] = ref
  }

  useEffect(() => {
    setMenu(propMenu)
  }, [propMenu])

  const changeCheckState = (mainIndex: number, subIndex: number, checked: boolean, isRadio = false) => {
    if (!isRadio) {
      setMenu(reduxSet(menu, [mainIndex, 'submenu', subIndex, 'checked'], checked) as MenuT[])
    } else {
      let newMenu = [...menu]
      const menuLength = menu[mainIndex].submenu.length
      for (let i = 0; i < menuLength; i++) {
        if (menu[mainIndex].submenu[i].type === 'radio') {
          newMenu = reduxSet(newMenu, [mainIndex, 'submenu', i, 'checked'], i === subIndex) as MenuT[]
        }
      }
      setMenu(newMenu)
    }
  }

  return (
    <div id="app-menu-bar" role="menubar" aria-label="Application menu">
      {menu.map((menuItem, i) => {
        return (
          <div
            key={i}
            onMouseOver={() => onButtonMouseOver(i)}
            onClick={() => onButtonClick(i)}
            onTouchStart={() => onTouchStart(i)}
            onMouseMove={() => onMouseMove(i)}
            ref={(ref) => ref && setRefs(ref, i)}
            className={classnames('toolbar-dropdown', {
              open: clicked && i === focusing,
              closed: !clicked || i !== focusing,
            })}
          >
            {clicked && i === focusing && (
              <MenuList
                rect={menuItems.current[i]?.getBoundingClientRect()}
                menulist={menuItem.submenu}
                changeCheckState={changeCheckState}
                mainIndex={i}
              />
            )}
            <div className="toolbar-button">
              <button className="button-component" type="button" tabIndex={-1}>
                <div className="menu-item">
                  <div className="menu-label">
                    <span aria-label="View">
                      <span aria-hidden="true">{menuItem.label}</span>
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
