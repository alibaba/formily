import type { ISchema } from '@formily/react'

export const Checkbox: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {
    indeterminate: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    defaultIndeterminate: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
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
