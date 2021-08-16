import type { ISchema } from '@formily/react'

const CommonDatePickerAPI = {
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
  format: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  showTime: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  resetTime: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  hasClear: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      defaultChecked: true,
    },
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
  popupAlign: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  followTrigger: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
}

export const DatePicker: ISchema & { RangePicker?: ISchema } = {
  type: 'object',
  properties: {
    ...CommonDatePickerAPI,
  },
}

DatePicker.RangePicker = {
  type: 'object',
  properties: {
    ...CommonDatePickerAPI,
    type: {
      type: 'string',
      enum: ['date', 'month', 'year'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'date',
      },
    },
  },
}
