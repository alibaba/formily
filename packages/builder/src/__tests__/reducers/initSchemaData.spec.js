/* eslint-disable @typescript-eslint/camelcase */
import initSchemaDataReducer from '../../reducers/initSchemaData'

describe('initSchemaData reducers', () => {
  test('initSchemaData reducers return initial state', () => {
    expect(initSchemaDataReducer(undefined, {})).toEqual({})
  })

  test('initSchemaData reducers return custom state when INIT_SCHEMA', () => {
    const beforeState = {}
    const action = {
      type: 'INIT_SCHEMA',
      data: {
        type: 'object',
        properties: {
          a: {
            type: 'string',
            title: 'a'
          },
          b: {
            type: 'string',
            title: 'b'
          }
        }
      }
    }
    const afterState = {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          title: 'a',
          id: 'a',
          'x-index': 0
        },
        b: {
          type: 'string',
          title: 'b',
          id: 'b',
          'x-index': 1
        }
      }
    }
    expect(initSchemaDataReducer(beforeState, action)).toEqual(afterState)
  })

  test('initSchemaData reducers return custom state when CHANGE_COMPONENT_ORDER', () => {
    const beforeState = {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          id: 'a',
          title: 'a',
          'x-index': 0
        },
        b: {
          type: 'string',
          id: 'b',
          title: 'b',
          'x-index': 1
        }
      }
    }
    const action = {
      type: 'CHANGE_COMPONENT_ORDER',
      data: {
        id: ['a'],
        targetId: ['b']
      }
    }
    const afterState = {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          title: 'a',
          id: 'a',
          'x-index': 1
        },
        b: {
          type: 'string',
          title: 'b',
          id: 'b',
          'x-index': 0
        }
      }
    }
    const result = initSchemaDataReducer(beforeState, action)

    expect(result).toEqual(afterState)
  })

  test('initSchemaData reducers return custom state when ADD_COMPONENT', () => {
    const beforeState = {
      type: 'object',
      properties: {}
    }
    const beforeStateWithData = {
      type: 'object',
      properties: {
        '111': {
          type: 'string',
          title: '111'
        },
        '333': {
          type: 'string',
          title: '333'
        }
      }
    }
    const beforeStateWithLayout = {
      type: 'object',
      properties: {
        '111': {
          type: 'object',
          'x-component': 'layout',
          properties: {}
        }
      }
    }
    const action1 = {
      type: 'ADD_COMPONENT',
      data: {
        id: '111',
        component: {
          key: 'input',
          icon: 'info',
          iconUrl: '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
          width: '58',
          height: '28',
          type: 'string',
          title: '单行文本框',
          placeholder: '请输入'
        }
      }
    }
    const action2 = {
      type: 'ADD_COMPONENT',
      data: {
        id: '111',
        component: {
          key: 'wrapper_layout',
          icon: 'clock-circle-o',
          type: 'object',
          title: 'Layout布局',
          __key__: 'layout',
          __key__data__: {
            'x-component': 'layout',
            'x-props': {
              labelCol: 8,
              wrapperCol: 6
            }
          }
        }
      }
    }
    const action3 = {
      type: 'ADD_COMPONENT',
      data: {
        id: '222',
        containerId: ['111'],
        component: {
          key: 'input',
          icon: 'info',
          iconUrl: '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
          width: '58',
          height: '28',
          type: 'string',
          title: '单行文本框',
          placeholder: '请输入'
        }
      }
    }
    const action4 = {
      type: 'ADD_COMPONENT',
      data: {
        id: '222',
        existId: '333',
        component: {
          key: 'input',
          icon: 'info',
          iconUrl: '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
          width: '58',
          height: '28',
          type: 'string',
          title: '单行文本框',
          placeholder: '请输入'
        }
      }
    }

    const afterState1 = {
      type: 'object',
      properties: {
        '111': {
          key: 'input',
          icon: 'info',
          iconUrl: '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
          width: '58',
          height: '28',
          type: 'string',
          title: '单行文本框',
          placeholder: '请输入',
          'x-index': 0,
          id: '111'
        }
      }
    }
    const afterState2 = {
      type: 'object',
      properties: {
        '111': {
          key: 'wrapper_layout',
          icon: 'clock-circle-o',
          type: 'object',
          title: 'Layout布局',
          __key__: 'layout',
          __key__data__: {
            'x-component': 'layout',
            'x-props': { labelCol: 8, wrapperCol: 6 }
          },
          id: '111',
          'x-index': 0
        }
      }
    }
    const afterState3 = {
      type: 'object',
      properties: {
        '111': {
          type: 'object',
          'x-component': 'layout',
          properties: {
            '222': {
              key: 'input',
              icon: 'info',
              iconUrl:
                '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
              width: '58',
              height: '28',
              type: 'string',
              title: '单行文本框',
              placeholder: '请输入',
              'x-index': 0,
              id: '222'
            }
          }
        }
      }
    }
    const afterState4 = {
      type: 'object',
      properties: {
        '111': {
          type: 'string',
          title: '111',
          'x-index': 0,
          id: '111'
        },
        '222': {
          key: 'input',
          icon: 'info',
          iconUrl: '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
          width: '58',
          height: '28',
          type: 'string',
          title: '单行文本框',
          placeholder: '请输入',
          'x-index': 1,
          id: '222'
        },
        '333': {
          type: 'string',
          title: '333',
          'x-index': 2,
          id: '333'
        }
      }
    }

    expect(initSchemaDataReducer(beforeState, action1)).toEqual(afterState1)
    expect(initSchemaDataReducer(beforeState, action2)).toEqual(afterState2)
    expect(initSchemaDataReducer(beforeStateWithLayout, action3)).toEqual(
      afterState3
    )
    expect(initSchemaDataReducer(beforeStateWithData, action4)).toEqual(
      afterState4
    )
  })

  test('initSchemaData reducers return custom state when DELETE_COMPONENT', () => {
    const beforeState = {
      type: 'object',
      properties: {
        '111': {
          type: 'string',
          title: '111'
        }
      }
    }
    const action = {
      type: 'DELETE_COMPONENT',
      data: {
        id: '111'
      }
    }
    const afterState = {
      type: 'object',
      properties: {}
    }
    expect(initSchemaDataReducer(beforeState, action)).toEqual(afterState)
  })

  test('initSchemaData reducers return custom state when EDIT_COMPONENT case1', () => {
    const beforeState = {
      type: 'object',
      properties: {
        '111': {
          type: 'string',
          title: '111'
        }
      }
    }
    const action = {
      type: 'EDIT_COMPONENT',
      data: {
        id: ['111'],
        propsData: {
          __id__: '222'
        }
      }
    }
    const afterState = {
      type: 'object',
      properties: {
        '111': {
          type: 'string',
          title: '111',
          __id__: '222',
          active: true
        }
      }
    }

    const result = initSchemaDataReducer(beforeState, action)

    expect(result).toEqual(afterState)
  })

  test('initSchemaData reducers return custom state when EDIT_COMPONENT case2', () => {
    const beforeState1 = {
      type: 'object',
      properties: {
        '111': {
          type: 'object',
          'x-component': 'layout',
          properties: {
            '222': {
              type: 'string',
              title: '222'
            }
          }
        }
      }
    }
    const action1 = {
      type: 'EDIT_COMPONENT',
      data: {
        id: ['111', '222'],
        propsData: {
          __id__: '333',
          'x-props': {
            enum: [
              {
                value: 1,
                label: 1
              }
            ]
          }
        }
      }
    }
    const afterState1 = {
      type: 'object',
      properties: {
        '111': {
          type: 'object',
          'x-component': 'layout',
          properties: {
            '222': {
              __id__: '333',
              type: 'string',
              title: '222',
              enum: [
                {
                  value: 1,
                  label: 1
                }
              ],
              active: true,
              'x-props': {
                enum: [
                  {
                    value: 1,
                    label: 1
                  }
                ]
              }
            }
          }
        }
      }
    }
    expect(initSchemaDataReducer(beforeState1, action1)).toEqual(afterState1)
  })
})
