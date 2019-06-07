import gbConfigReducer from '../../reducers/gbConfig'

describe('reducers', () => {
  test('gbConfig reducers return initial state', () => {
    expect(gbConfigReducer(undefined, {})).toEqual({
      labelAlign: 'left',
      labelTextAlign: 'right',
      autoAddColon: true,
      needFormButtonGroup: false,
      inline: false,
      size: 'medium',
      labelCol: 8,
      wrapperCol: 16,
      editable: true
    })
  })

  test('gbConfig reducers return custom state', () => {
    const beforeState = {
      labelAlign: 'left',
      labelTextAlign: 'left',
      autoAddColon: true,
      needFormButtonGroup: false,
      inline: false,
      size: 'small',
      labelCol: 8,
      wrapperCol: 16
    }

    const action = {
      type: 'CHANGE_GB_CONFIG',
      data: {
        size: 'large',
        inline: true,
        extra: 'extra'
      }
    }

    const afterState = {
      labelAlign: 'left',
      labelTextAlign: 'left',
      autoAddColon: true,
      needFormButtonGroup: false,
      inline: true,
      size: 'large',
      extra: 'extra',
      labelCol: 8,
      wrapperCol: 16,
      editable: true
    }

    expect(gbConfigReducer(beforeState, action)).toEqual(afterState)
  })
})
