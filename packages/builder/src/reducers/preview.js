export default (state = false, action) => {
  let newState
  const { data = {} } = action
  const _preview = data.preview || false
  switch (action.type) {
    case 'CHANGE_PREVIEW':
      newState = _preview
      return newState
    default:
      return state
  }
}
