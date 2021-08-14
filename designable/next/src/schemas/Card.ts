import type { ISchema } from '@formily/react'

export const Card: ISchema & { Addition?: ISchema } = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    subTitle: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    showTitleBullet: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    showHeadDivider: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    contentHeight: {
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
    },
    extra: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
