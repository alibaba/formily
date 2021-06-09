import { GlobalDragSource } from '@designable/core'

GlobalDragSource.setSources({
  inputs: [
    {
      componentName: 'DesignableField',
      props: {
        title: 'Input',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
    {
      componentName: 'DesignableField',
      props: {
        title: 'Select',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
    },
    {
      componentName: 'DesignableField',
      props: {
        type: 'string',
        title: 'Radio Group',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
      },
    },
    {
      componentName: 'DesignableField',
      props: {
        type: 'string',
        title: 'Checkbox Group',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox.Group',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
      },
    },
    {
      componentName: 'DesignableField',
      props: {
        type: 'string',
        title: 'Slider',
        'x-decorator': 'FormItem',
        'x-component': 'Slider',
      },
    },
    {
      componentName: 'DesignableField',
      props: {
        type: 'string',
        title: 'Rate',
        'x-decorator': 'FormItem',
        'x-component': 'Rate',
      },
    },
  ],
  layouts: [
    {
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'Card',
        'x-component-props': {
          title: 'Title',
        },
      },
    },
    {
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'FormGrid',
      },
    },
    {
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'FormLayout',
      },
    },
  ],
})
