import React, { useCallback, useState, CSSProperties } from 'react'
import classnames from 'classnames'

const checked = (
  <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" />
  </svg>
)
const unchecked = <span />
const radioUnchecked = (
  <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M896 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
  </svg>
)
const radioChecked = (
  <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
  </svg>
)

export type MenuItemT =
  | {
      label?: string
      accelerator?: string
      type?: 'normal'
      enabled?: boolean
      visiable?: boolean
      checked?: boolean
      click: (menuItem: MenuItemT, event: React.MouseEvent) => void
    }
  | {
      type: 'separator'
      visiable?: boolean
    }
  | {
      label?: string
      accelerator?: string
      type: 'checkbox'
      enabled?: boolean
      visiable?: boolean
      checked?: boolean
      click: (menuItem: MenuItemT, event: React.MouseEvent) => void
    }
  | {
      label?: string
      accelerator?: string
      type: 'radio'
      enabled?: boolean
      visiable?: boolean
      checked?: boolean
      click: (menuItem: MenuItemT, event: React.MouseEvent) => void
    }

export interface MenuListItemProps {
  mainIndex: number
  subIndex: number
  curItem: MenuItemT
  changeCheckState: (mainIndex: number, subIndex: number, check: boolean, isRadio?: boolean) => void
  style: CSSProperties
}

export const MenuListItem: React.FC<MenuListItemProps> = ({
  mainIndex,
  subIndex,
  curItem,
  style,
  changeCheckState,
}) => {
  const [selected, setSelected] = useState(false)
  const onMouseOver = () => setSelected(true)
  const onMouseLeave = () => setSelected(false)
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (curItem.type === 'separator' || curItem.enabled === false) {
      e.stopPropagation()
      return
    } else if (curItem.type === 'checkbox') {
      e.persist()
      const nextCurItem = {
        ...curItem,
        checked: !curItem.checked,
      }
      curItem.click(nextCurItem, e)
      changeCheckState(mainIndex, subIndex, !curItem.checked)
    } else if (curItem.type === 'radio') {
      const nextCurItem = {
        ...curItem,
        checked: true,
      }
      curItem.click(nextCurItem, e)
      if (!curItem.checked) {
        changeCheckState(mainIndex, subIndex, true, true)
      }
    } else {
      e.persist()
      curItem.click(curItem, e)
    }
  }, [])

  if (curItem.visiable == false) {
    return <div />
  }
  const listItemClass = classnames('list-item', {
    selected: selected && curItem.type !== 'separator' && curItem.enabled !== false,
  })
  const menuItemClass = classnames('menu-item', {
    disabled: curItem.type !== 'separator' && curItem.enabled === false,
  })
  const innerContent =
    curItem.type === 'separator' ? (
      <hr />
    ) : (
      <div className={menuItemClass} onClick={handleClick}>
        <div className="status-icon">
          {curItem.type === 'radio'
            ? curItem.checked
              ? radioChecked
              : radioUnchecked
            : curItem.checked && curItem.type === 'checkbox'
            ? checked
            : unchecked}
        </div>
        <div className="menu-label">
          <span>{curItem.label}</span>
        </div>
        {curItem.accelerator && <div className="accelerator">{curItem.accelerator}</div>}
      </div>
    )
  return (
    <div
      role="menuitem"
      className={listItemClass}
      style={style}
      tabIndex={-1}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {innerContent}
    </div>
  )
}
