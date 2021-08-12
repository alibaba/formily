import type { ISchema } from '@formily/react'

export const TimePicker: ISchema = {
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
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    hasClear: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    format: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    hourStep: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    minuteStep: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    secondStep: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    popupAlign: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    popupTriggerType: {
      type: 'string',
      enum: ['click', 'hover'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'click',
        optionType: 'button',
      },
    },
  },
}
