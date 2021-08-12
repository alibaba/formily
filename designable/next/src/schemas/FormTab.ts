import type { ISchema } from '@formily/react'

export const FormTab: ISchema & { TabPane?: ISchema } = {
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
    shape: {
      type: 'string',
      enum: ['pure', 'wrapped', 'text', 'capsule'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      default: 'pure',
    },
    animation: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    excessMode: {
      type: 'string',
      enum: ['slide', 'dropdown'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'slide',
        optionType: 'button',
      },
    },
    tabPosition: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'top',
        optionType: 'button',
      },
      'x-reactions': {
        dependencies: ['.shape'],
        when: `{{$deps[0] === 'wrapped'}}`,
        fulfill: {
          schema: {
            enum: ['top', 'bottom', 'left', 'right'],
          },
        },
        otherwise: {
          schema: {
            enum: ['top', 'bottom'],
          },
          state: {
            value: `{{$self.value !== 'bottom' ? 'top' : 'bottom'}}`,
          },
        },
      },
    },
    triggerType: {
      type: 'string',
      enum: ['click', 'hover'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'click',
        optionType: 'button',
      },
    },
    extra: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}

FormTab.TabPane = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    closeable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
