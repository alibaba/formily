import type { ISettingsLocale } from '../types'

export const Cascader: ISettingsLocale = {
  expandTriggerType: {
    title: '展开触发方式',
    dataSource: ['点击', '移入'],
  },
  canOnlySelectLeaf: '单选只能选叶节点',
  canOnlyCheckLeaf: '多选只能选叶节点',
  checkStrictly: '父子节点选中不关联',
}
