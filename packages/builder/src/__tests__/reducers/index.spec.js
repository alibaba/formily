import codemodeReducer from '../../reducers/codemode'
import componentIdReducer from '../../reducers/componentId'
import componentPropsReducer from '../../reducers/componentProps'
import gbConfigReducer from '../../reducers/gbConfig'
import initSchemaDataReducer from '../../reducers/initSchemaData'
import layoutIdReducer from '../../reducers/layoutId'
import previewReducer from '../../reducers/preview'

describe('reducers', () => {
  // codemode reducer
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

  // componentId reducer
  test('componentId reducers return initial state', () => {
    expect(componentIdReducer(undefined, {})).toEqual('')
  })
  test('componentId reducers return custom state', () => {
    const beforeState = ''
    const action = {
      type: 'CHANGE_COMPONENT',
      data: {
        componentId: '66666'
      }
    }
    expect(componentIdReducer(beforeState, action)).toEqual('66666')
  })

  // componentProps reducer
  test('componentProps reducers return initial state', () => {
    expect(componentPropsReducer(undefined, {})).toEqual({})
  })
  test('componentProps reducers return custom state when SHOW_COMPONENT_PROPS', () => {
    const beforeState = {}
    const action = {
      type: 'SHOW_COMPONENT_PROPS',
      data: {
        id: '11111',
        comp: {
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

    const afterState = {
      '11111': [
        {
          name: '__id__',
          title: '字段名称',
          type: 'string',
          description: '字段名称：发起请求时带上的参数id，必填，全局保证唯一。',
          required: true
        },
        { name: 'description', title: '提示文案', type: 'string' },
        {
          name: 'title',
          title: '标题',
          type: 'string',
          placeholder: '请输入字段名称，不超过50个字符',
          value: '单行文本框'
        },
        {
          name: 'default',
          title: '默认值',
          type: 'object',
          'x-component': 'defaultValueCascader'
        },
        { name: 'required', title: '是否必填', type: 'boolean' },
        { name: 'x-props.readOnly', title: '是否只读', type: 'boolean' },
        { name: 'x-props.disabled', title: '是否禁用', type: 'boolean' },
        { name: 'x-props.htmltype', title: '是否隐藏', type: 'boolean' },
        { name: 'x-props.placeholder', title: '占位符', type: 'string' }
      ]
    }
    expect(componentPropsReducer(beforeState, action)).toEqual(afterState)
  })
  test('componentProps reducers return custom state when DELETE_COMPONENT', () => {
    const beforeState = {
      '11111': [
        {
          name: '__id__',
          title: '字段名称',
          type: 'string',
          description: '字段名称：发起请求时带上的参数id，必填，全局保证唯一。',
          required: true,
          value: '11111'
        },
        { name: 'description', title: '提示文案', type: 'string' },
        {
          name: 'title',
          title: '标题',
          type: 'string',
          placeholder: '请输入字段名称，不超过50个字符',
          value: '单行文本框'
        },
        {
          name: 'default',
          title: '默认值',
          type: 'object',
          'x-component': 'defaultValueCascader'
        },
        { name: 'required', title: '是否必填', type: 'boolean' },
        { name: 'x-props.readOnly', title: '是否只读', type: 'boolean' },
        { name: 'x-props.disabled', title: '是否禁用', type: 'boolean' },
        { name: 'x-props.htmltype', title: '是否隐藏', type: 'boolean' },
        { name: 'x-props.placeholder', title: '占位符', type: 'string' }
      ]
    }
    const action = {
      type: 'DELETE_COMPONENT',
      data: {
        id: '11111'
      }
    }

    const afterState = {}
    expect(componentPropsReducer(beforeState, action)).toEqual(afterState)
  })
  test('componentProps reducers return custom state when EDIT_COMPONENT_PROPS', () => {
    const beforeState = {
      '11111': [
        {
          name: '__id__',
          title: '字段名称',
          type: 'string',
          description: '字段名称：发起请求时带上的参数id，必填，全局保证唯一。',
          required: true,
          value: '11111'
        },
        { name: 'description', title: '提示文案', type: 'string' },
        {
          name: 'title',
          title: '标题',
          type: 'string',
          placeholder: '请输入字段名称，不超过50个字符',
          value: '单行文本框'
        },
        {
          name: 'default',
          title: '默认值',
          type: 'object',
          'x-component': 'defaultValueCascader'
        },
        { name: 'required', title: '是否必填', type: 'boolean' },
        { name: 'x-props.readOnly', title: '是否只读', type: 'boolean' },
        { name: 'x-props.disabled', title: '是否禁用', type: 'boolean' },
        { name: 'x-props.htmltype', title: '是否隐藏', type: 'boolean' },
        { name: 'x-props.placeholder', title: '占位符', type: 'string' }
      ]
    }
    const action = {
      type: 'EDIT_COMPONENT_PROPS',
      data: {
        id: '11111',
        propsData: {
          __id__: 'hello'
        }
      }
    }

    const afterState = {
      '11111': [
        {
          name: '__id__',
          value: 'hello',
          title: '字段名称',
          type: 'string',
          description: '字段名称：发起请求时带上的参数id，必填，全局保证唯一。',
          required: true
        },
        { name: 'description', title: '提示文案', type: 'string' },
        {
          name: 'title',
          title: '标题',
          type: 'string',
          placeholder: '请输入字段名称，不超过50个字符',
          value: '单行文本框'
        },
        {
          name: 'default',
          title: '默认值',
          type: 'object',
          'x-component': 'defaultValueCascader'
        },
        { name: 'required', title: '是否必填', type: 'boolean' },
        { name: 'x-props.readOnly', title: '是否只读', type: 'boolean' },
        { name: 'x-props.disabled', title: '是否禁用', type: 'boolean' },
        { name: 'x-props.htmltype', title: '是否隐藏', type: 'boolean' },
        { name: 'x-props.placeholder', title: '占位符', type: 'string' }
      ]
    }
    expect(componentPropsReducer(beforeState, action)).toEqual(afterState)
  })

  // gbConfig reducers
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

  // layoutId reducer
  test('layoutId reducers return initial state', () => {
    expect(layoutIdReducer(undefined, {})).toEqual('')
  })
  test('layoutId reducers return custom state', () => {
    const beforeState = 'aaa'
    const action = {
      type: 'CHANGE_LAYOUTID',
      data: {
        id: 'bbb'
      }
    }
    const afterState = 'bbb'
    expect(layoutIdReducer(beforeState, action)).toEqual(afterState)
  })

  // preview reducer
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

  // initSchemaData reducer
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
          title: 'a'
        },
        b: {
          type: 'string',
          title: 'b'
        }
      }
    }
    const action = {
      type: 'CHANGE_COMPONENT_ORDER',
      data: {
        id: 'a',
        targetId: 'b'
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
    expect(initSchemaDataReducer(beforeState, action)).toEqual(afterState)
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
        addType: 'layout',
        containerId: '111',
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
          type: 'object',
          id: '111',
          'x-index': 0,
          'x-component': 'layout',
          properties: {},
          'x-props': {
            labelCol: 8,
            wrapperCol: 6,
            _extra: {
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
  test('initSchemaData reducers return custom state when EDIT_COMPONENT', () => {
    const beforeState = {
      type: 'object',
      properties: {
        '111': {
          type: 'string',
          title: '111'
        }
      }
    }
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
    const action = {
      type: 'EDIT_COMPONENT',
      data: {
        id: '111',
        propsData: {
          __id__: '222'
        }
      }
    }
    const action1 = {
      type: 'EDIT_COMPONENT',
      data: {
        id: '222',
        containerId: '111',
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
    const afterState = {
      type: 'object',
      properties: {
        '111': {
          type: 'string',
          title: '111',
          __id__: '222'
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

    expect(initSchemaDataReducer(beforeState, action)).toEqual(afterState)
    expect(initSchemaDataReducer(beforeState1, action1)).toEqual(afterState1)
  })
})
