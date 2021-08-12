import type { ISchema } from '@formily/react'

export const Checkbox: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {},
}

Checkbox.Group = {
  type: 'object',
  properties: {
    direction: {
      type: 'string',
      enum: ['hoz', 'ver'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'hoz',
        optionType: 'button',
      },
    },
  },
}
