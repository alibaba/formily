export default (state = [], action) => {
  let newState = [...state]
  const { data: { componentId = [] } = {}, type } = action

  switch (type) {
    case 'CHANGE_COMPONENT':
      newState = Array.isArray(componentId) ? componentId : [componentId]
      return newState
    default:
      return state
  }
}
