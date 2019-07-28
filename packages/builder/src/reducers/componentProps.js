import { getPropsByKey } from '../configs/supportConfigList'

export default (state = {}, action) => {
  const newState = Object.assign({}, state)
  const { data = {} } = action
  const { id, propsData = {}, comp = {} } = data

  switch (action.type) {
    case 'SHOW_COMPONENT_PROPS':
      if (id && !newState[id]) {
        newState[id] = getPropsByKey(comp.key).map(item => {
          const { name } = item
          return Object.assign(
            {},
            item,
            comp[name]
              ? {
                  value: comp[name]
                }
              : {}
          )
        })
      }
      return newState
    case 'DELETE_COMPONENT':
      if (id && newState[id]) {
        delete newState[id]
      }
      return newState
    case 'EDIT_COMPONENT_PROPS':
      if (id && newState[id]) {
        newState[id] = newState[id].map(item => {
          const { name } = item
          const value = propsData[name]
          return Object.assign(
            {},
            item,
            value !== undefined
              ? {
                  value
                }
              : {}
          )
        })
      }
      return newState
    default:
      return state
  }
}
