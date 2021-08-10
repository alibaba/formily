import type { ISettingsLocale } from '../types'

export const Cascader: ISettingsLocale = {
  expandTriggerType: {
    title: 'Expand Trigger Method',
    dataSource: ['Click', 'Hover'],
  },
  canOnlySelectLeaf: 'Can Only Select Leaf',
  canOnlyCheckLeaf: 'Can Only Check Leaf',
  checkStrictly: 'Parent and child nodes selected are not associated',
}
