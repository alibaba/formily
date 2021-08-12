import { Select } from './Select'
import type { ISettingsLocale } from '../types'

export const TreeSelect: ISettingsLocale = {
  ...Select,
  treeCheckable: {
    title: '勾选树',
    tooltip: '下拉框中的树是否支持勾选节点的复选框',
  },
  treeCheckStrictly: {
    title: '严格树勾选',
    tooltip:
      '下拉框中的树勾选节点复选框是否完全受控（父子节点选中状态不再关联）',
  },
  treeCheckedStrategy: {
    title: '勾选树策略',
    tooltip: '选中时回填的方式',
    dataSource: ['只返回父节点', '只返回子节点', '返回所有选中的节点'],
  },
  treeDefaultExpandAll: '默认展开所有节点',
}
