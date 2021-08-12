import type { ISchema } from '@formily/react'

export const Space: ISchema = {
  type: 'object',
  properties: {
    align: {
      type: 'string',
      enum: ['start', 'end', 'center', 'baseline'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    direction: {
      type: 'string',
      enum: ['horizontal', 'vertical'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'horizontal',
        optionType: 'button',
      },
    },
    size: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 8,
      },
    },
    split: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    wrap: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
