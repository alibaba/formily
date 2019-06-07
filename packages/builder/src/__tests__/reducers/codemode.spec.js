import codemodeReducer from '../../reducers/codemode'

describe('codemode reducers', () => {
  test('codemode reducers return initial state', () => {
    expect(codemodeReducer(undefined, {})).toEqual(false)
  })
  test('codemode reducers return custom state', () => {
    const beforeState = false
    const action = {
      type: 'CHANGE_CODEMODE',
      data: {
        codemode: true
      }
    }
    expect(codemodeReducer(beforeState, action)).toEqual(true)
  })
  test('codemode reducers return custom state', () => {
    const beforeState = true
    const action = {
      type: 'CHANGE_CODEMODE',
      data: {
        codemode: false
      }
    }
    expect(codemodeReducer(beforeState, action)).toEqual(false)
  })
})
