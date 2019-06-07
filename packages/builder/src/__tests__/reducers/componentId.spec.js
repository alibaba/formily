import componentIdReducer from '../../reducers/componentId'

describe('componentId reducers', () => {
  test('componentId reducers return initial state', () => {
    expect(componentIdReducer(undefined, {})).toEqual([])
  })

  test('componentId reducers return custom state', () => {
    const beforeState = []
    const action = {
      type: 'CHANGE_COMPONENT',
      data: {
        componentId: ['66666', '333']
      }
    }
    expect(componentIdReducer(beforeState, action)).toEqual(['66666', '333'])
  })

  test('componentId reducers return custom state', () => {
    const beforeState = []
    const action = {
      type: 'CHANGE_COMPONENT',
      data: {
        componentId: '333'
      }
    }
    expect(componentIdReducer(beforeState, action)).toEqual(['333'])
  })
})
