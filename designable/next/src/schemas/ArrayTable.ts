import type { ISchema } from '@formily/react'

export const ArrayTable: ISchema & { Addition?: ISchema; Column?: ISchema } = {
  type: 'object',
  properties: {
    primaryKey: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        defaultValue: 'id',
      },
    },
    tableLayout: {
      type: 'string',
      enum: ['auto', 'fixed'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'auto',
        optionType: 'button',
      },
    },
    size: {
      type: 'string',
      enum: ['small', 'medium', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'medium',
      },
    },
    tableWidth: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    hasBorder: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    hasHeader: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    isZebra: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    emptyContent: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    fixedHeader: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
    maxBodyHeight: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-reactions': {
        dependencies: ['.fixedHeader'],
        fulfill: {
          state: {
            visible: '{{$deps[0]}}',
          },
        },
      },
    },
    stickyHeader: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    useVirtual: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

const Column: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    width: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    align: {
      type: 'string',
      enum: ['left', 'center', 'right'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
      },
    },
    alignHeader: {
      type: 'string',
      enum: ['left', 'center', 'right'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
      },
    },
    lock: {
      type: 'string',
      enum: [false, 'left', 'right', true],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
      },
    },
    colSpan: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    wordBreak: {
      type: 'string',
      enum: ['all', 'word'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'all',
        optionType: 'button',
      },
    },
  },
}

const Addition: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    method: {
      type: 'string',
      enum: ['push', 'unshift'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'push',
        optionType: 'button',
      },
    },
    defaultValue: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
    },
  },
}

ArrayTable.Column = Column
ArrayTable.Addition = Addition
