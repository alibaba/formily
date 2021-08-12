import type { ISettingsLocale } from '../types'

export const Cascader: ISettingsLocale = {
  expandTriggerType: {
    title: '展开触发',
    dataSource: ['点击', '移入'],
  },
  canOnlySelectLeaf: '单选仅叶节点',
  canOnlyCheckLeaf: '多选仅叶节点',
  checkStrictly: '父子节点选中不关联',
}
