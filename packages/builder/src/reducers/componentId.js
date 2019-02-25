export default (state = '', action) => {
  let newState = state
  const { data = {} } = action
  const _componentId = data.componentId || ''
  // eslint-disable-next-line
  let { id, propsData = {}, comp = {}, key } = data

  switch (action.type) {
    case 'CHANGE_COMPONENT':
      newState = _componentId
      return newState
    default:
      return state
  }
}
