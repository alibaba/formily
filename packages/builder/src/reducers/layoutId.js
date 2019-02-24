export default (state = '', action) => {
  const { data = {} } = action
  const { id = '' } = data
  let newState = state

  switch (action.type) {
    case 'CHANGE_LAYOUTID':
      newState = id
      return newState
    default:
      return state
  }
}
