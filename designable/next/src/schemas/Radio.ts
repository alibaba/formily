import type { ISchema } from '@formily/react'

export const Radio: ISchema & { Group?: ISchema } = {
  type: 'object',
  properties: {},
}

Radio.Group = {
  type: 'object',
  properties: {
    size: {
      type: 'string',
      enum: ['small', 'medium', 'large', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'medium',
      },
    },
    shape: {
      type: 'string',
      enum: ['normal', 'button'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      default: 'normal',
      'x-component-props': {
        optionType: 'button',
      },
    },
    direction: {
      type: 'string',
      enum: ['hoz', 'ver'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'hoz',
        optionType: 'button',
      },
      'x-reactions': {
        dependencies: ['.shape'],
        fulfill: {
          state: {
            visible: `{{$deps[0] === 'normal'}}`,
          },
        },
      },
    },
  },
}
