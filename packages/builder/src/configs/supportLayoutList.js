/* eslint-disable @typescript-eslint/camelcase */
export default [
  {
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
  },
  {
    key: 'wrapper_grid',
    icon: 'clock-circle-o',
    type: 'object',
    title: 'Grid布局',
    __key__: 'layout',
    __key__data__: {
      'x-component': 'grid',
      'x-props': {
        gutter: 20
      }
    }
  },
  {
    key: 'wrapper_card',
    icon: 'clock-circle-o',
    type: 'object',
    title: 'FormCard卡片式布局',
    __key__: 'layout',
    __key__data__: {
      'x-component': 'card',
      'x-props': {
        title: '卡片式布局',
        showHeadDivider: true
      }
    }
  }
]
