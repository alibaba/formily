import type { ISettingsLocale } from '../types'

export const Transfer: ISettingsLocale = {
  id: '标识',
  mode: {
    title: '模式',
    dataSource: ['正常', '简单'],
  },
  leftDisabled: '禁用左侧面板',
  rightDisabled: '禁用右侧面板',
  filter: '过滤函数',
  searchPlaceholder: '搜索占位提示',
  titles: '左右面板标题',
  sortable: '拖拽排序',
  showCheckAll: '底部全选',
}
