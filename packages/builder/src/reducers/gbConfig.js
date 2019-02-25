import { defaultGlobalCfgValue } from '../configs/supportGlobalCfgList'

export default (state = {}, action) => {
  let newState = {
    ...defaultGlobalCfgValue,
    ...state
  }
  const { data = {} } = action

  switch (action.type) {
    case 'CHANGE_GB_CONFIG':
      newState = Object.assign({}, newState, data)
      return newState
    default:
      return newState
  }
}
