import type { ISchema } from '@formily/react'

export const Input: ISchema & { TextArea?: ISchema } = {
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
    maxLength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    showLimitHint: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    cutString: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    trim: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    composition: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasBorder: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    hint: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    innerBefore: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    innerAfter: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    addonTextBefore: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    addonTextAfter: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

Input.TextArea = {
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
    maxLength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    cutString: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    trim: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    composition: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    hasBorder: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    autoHeight: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
    rows: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-reactions': {
        dependencies: ['.autoHeight'],
        fulfill: {
          state: {
            visible: '{{!$deps[0]}}',
          },
        },
      },
      'x-component-props': {
        min: 0,
        precision: 0,
      },
    },
  },
}
