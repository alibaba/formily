export default (state = false, action) => {
  let newState
  const { data = {} } = action
  const _codemode = data.codemode || false
  switch (action.type) {
    case 'CHANGE_CODEMODE':
      newState = _codemode
      return newState
    default:
      return state
  }
}
