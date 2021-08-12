import { GlobalDragSource } from '@designable/core'

GlobalDragSource.appendSourcesByGroup('arrays', [
  {
    componentName: 'DesignableField',
    props: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
    },
  },
  {
    componentName: 'DesignableField',
    props: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayCards',
      'x-component-props': {
        title: `Title`,
      },
    },
  },
])
