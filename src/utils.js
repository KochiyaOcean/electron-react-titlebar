import { isEqual } from 'lodash'

export function reduxSet(obj, path, val) {
  const [prop, ...restPath] = path
  if (typeof prop === 'undefined') {
    if (!isEqual(obj, val))
      return val
    else
      return obj
  }
  let before
  if (prop in obj) {
    before = obj[prop]
  } else {
    before = {}
  }
  const after = reduxSet(before, restPath, val)
  if (after !== before) {
    let result
    if (Array.isArray(obj)) {
      result = obj.slice()
      result[prop] = after
    } else {
      result = {
        ...obj,
        [prop]: after,
      }
    }
    return result
  }
  return obj
}
