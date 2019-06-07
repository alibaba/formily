import previewReducer from '../../reducers/preview'

describe('preview reducers', () => {
  test('preview reducers return initial state', () => {
    expect(previewReducer(undefined, {})).toEqual(false)
  })

  test('preview reducers return custom state', () => {
    const beforeState = false
    const action = {
      type: 'CHANGE_PREVIEW',
      data: {
        preview: true
      }
    }
    const afterState = true
    expect(previewReducer(beforeState, action)).toEqual(afterState)
  })

  test('preview reducers return custom state', () => {
    const beforeState = true
    const action = {
      type: 'CHANGE_PREVIEW',
      data: {
        preview: false
      }
    }
    const afterState = false
    expect(previewReducer(beforeState, action)).toEqual(afterState)
  })
})
