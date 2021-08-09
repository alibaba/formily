import type { ISchema } from '@formily/react'

export const Switch: ISchema = {
  type: 'object',
  properties: {
    size: {
      type: 'string',
      enum: ['small', 'medium', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'medium',
      },
    },
    checkedChildren: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    unCheckedChildren: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    autoWidth: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
