import { Select } from './Select'
import type { ISettingsLocale } from '../types'

export const TreeSelect: ISettingsLocale = {
  ...Select,
  treeCheckable: {
    title: 'Tree Checkable',
    tooltip:
      'Whether the tree in the drop-down box supports checking the check box of the node',
  },
  treeCheckStrictly: {
    title: 'Tree Check Strictly',
    tooltip:
      'Check whether the node check box in the tree in the drop-down box is completely controlled (the selected status of parent and child nodes is no longer associated)',
  },
  treeCheckedStrategy: {
    title: 'Tree Checked Strategy',
    tooltip: 'How to backfill when selected',
    dataSource: [
      'Return only parents',
      'Return only children',
      'Returns all selected',
    ],
  },
  treeDefaultExpandAll: 'Expand All By Default',
}
