import { isEqual } from 'lodash'

type CommonTypes = number | boolean | string

type Obj<T> = T[] | { [key: string | number]: T } | T

export function reduxSet<T>(obj: Obj<T>, path: (string | number)[], val: CommonTypes): Obj<T> | CommonTypes {
  const [prop, ...restPath] = path
  if (typeof prop === 'undefined') {
    if (!isEqual(obj, val)) return val
    else return obj
  }
  let before
  if (prop in obj) {
    before = (obj as { [key: string | number]: T })[prop]
  } else {
    before = {}
  }
  const after = reduxSet(before, restPath, val)
  if (after !== before) {
    let result
    if (Array.isArray(obj)) {
      result = [...obj.slice(0, prop as number), after, ...obj.slice((prop as number) + 1, obj.length)] as T[]
    } else {
      result = {
        ...obj,
        [prop]: after,
      } as { [key: string | number]: T }
    }
    return result
  }
  return obj
}
