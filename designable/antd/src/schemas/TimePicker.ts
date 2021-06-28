import { ISchema } from '@formily/react'

export const CommonTimePickerAPI = {
  allowClear: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      defaultChecked: true,
    },
  },
  autoFocus: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  bordered: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      defaultChecked: true,
    },
  },
  clearText: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  disabledHours: {
    'x-decorator': 'FormItem',
    'x-component': 'ValueInput',
    'x-component-props': {
      include: ['EXPRESSION'],
    },
  },
  disabledMinutes: {
    'x-decorator': 'FormItem',
    'x-component': 'ValueInput',
    'x-component-props': {
      include: ['EXPRESSION'],
    },
  },
  disabledSeconds: {
    'x-decorator': 'FormItem',
    'x-component': 'ValueInput',
    'x-component-props': {
      include: ['EXPRESSION'],
    },
  },
  hideDisabledOptions: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  inputReadOnly: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  showNow: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  use12Hours: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  hourStep: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-component-props': {
      defaultValue: 1,
    },
  },
  minuteStep: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-component-props': {
      defaultValue: 1,
    },
  },
  secondStep: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-component-props': {
      defaultValue: 1,
    },
  },
  placeholder: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  size: {
    type: 'string',
    enum: ['large', 'small', 'middle', null],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
  },
  format: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      placeholder: 'YYYY-MM-DD',
    },
  },
}

export const TimePicker: ISchema & { RangePicker?: ISchema } = {
  type: 'object',
  properties: CommonTimePickerAPI,
}

TimePicker.RangePicker = {
  type: 'object',
  properties: CommonTimePickerAPI,
}
