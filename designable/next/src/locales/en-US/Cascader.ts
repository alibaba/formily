import type { ISettingsLocale } from '../types'

export const Cascader: ISettingsLocale = {
  expandTriggerType: {
    title: 'Expand trigger method',
    dataSource: ['Click', 'Move in'],
  },
  canOnlySelectLeaf: 'Single selection can only select leaf nodes',
  canOnlyCheckLeaf: 'Multiple selection can only select leaf nodes',
  checkStrictly: 'Parent and child nodes selected are not associated',
}
