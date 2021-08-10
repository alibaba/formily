import { Select } from './Select'
import type { ISettingsLocale } from '../types'

export const TreeSelect: ISettingsLocale = {
  ...Select,
  treeCheckable: {
    title: 'Check tree',
    tooltip:
      'Whether the tree in the drop-down box supports checking the check box of the node',
  },
  treeCheckStrictly: {
    title: 'Strict tree check',
    tooltip:
      'Check whether the node check box in the tree in the drop-down box is completely controlled (the selected status of parent and child nodes is no longer associated)',
  },
  treeCheckedStrategy: {
    title: 'Tick tree strategy',
    tooltip: 'How to backfill when selected',
    dataSource: [
      'Return only parent nodes',
      'Return only child nodes',
      'Returns all selected nodes',
    ],
  },
  treeDefaultExpandAll: 'Expand all nodes by default',
}
