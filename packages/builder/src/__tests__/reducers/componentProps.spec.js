import componentPropsReducer from '../../reducers/componentProps'

describe('componentProps reducers', () => {
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
        { name: 'description', title: '提示文案', type: 'string' },
        { name: 'x-props.placeholder', title: '占位符', type: 'string' },
        { name: 'required', title: '是否必填', type: 'boolean' },
        { name: 'x-props.readOnly', title: '是否只读', type: 'boolean' },
        { name: 'x-props.disabled', title: '是否禁用', type: 'boolean' },
        { name: 'x-props.htmltype', title: '是否隐藏', type: 'boolean' }
      ]
    }
    const result = componentPropsReducer(beforeState, action)
    expect(result).toEqual(afterState)
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
})
