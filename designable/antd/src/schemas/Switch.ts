import { ISchema } from '@formily/react'

export const Switch: ISchema = {
  type: 'object',
  properties: {
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'default', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'default',
      },
    },
  },
}
