export default {
  name: {
    title: '姓名',
    description: '请输入姓名',
    default: '淘小宝',
    type: 'string',
    'x-props': {
      help: '不得超过6个汉字'
    },
    'x-component': 'Input',
    'x-component-props': {
      disabled: true
    },
    'x-rules': [
      {
        required: true
      },
      {
        pattern: '[\u4e00-\u9fa5]'
      },
      {
        validator: 'nameValidator'
      }
    ]
  }
}
