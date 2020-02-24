export default {
  name: {
    title: '姓名',
    description: '请输入姓名',
    default: '淘小宝',
    type: 'string',
    'x-props': {
      help: '不得超过6个汉字',
      validateStatus: 'success',
      labelCol: [{ col: 2 }],
      extra: null
    },
    'x-component': 'Input',
    'x-component-props': {
      value: 'abc',
      onChange: '{{function(){}}}'
    },
    'x-rules': [
      {
        required: true,
        message: '此项必填'
      },
      {
        pattern: '[\\u4e00-\\u9fa5]',
        message: '正则'
      },
      {
        validator: 'nameValidator'
      }
    ]
  }
}