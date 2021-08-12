import type { ISchema } from '@formily/react'

export const Cascader: ISchema = {
  type: 'object',
  properties: {
    expandTriggerType: {
      type: 'string',
      enum: ['click', 'hover'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'click',
        optionType: 'button',
      },
    },
    useVirtual: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    multiple: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
    canOnlySelectLeaf: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-reactions': {
        dependencies: ['.multiple'],
        fulfill: {
          state: {
            visible: '{{!$deps[0]}}',
          },
        },
      },
    },
    canOnlyCheckLeaf: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-reactions': {
        dependencies: ['.multiple'],
        fulfill: {
          state: {
            visible: '{{$deps[0]}}',
          },
        },
      },
    },
    checkStrictly: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    immutable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
