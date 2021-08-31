import { GlobalDragSource } from '@designable/core'

GlobalDragSource.appendSourcesByGroup('displays', [
  {
    componentName: 'DesignableField',
    props: {
      type: 'void',
      'x-component': 'Text',
    },
  },
])
