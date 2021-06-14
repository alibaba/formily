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
])
