import type { ISettingsLocale } from '../types'

const ArrayOperations: ISettingsLocale = {
  Index: '索引',
  SortHandle: '排序手柄',
  Addition: '新增按钮',
  Remove: '删除按钮',
  MoveDown: '下移按钮',
  MoveUp: '上移按钮',
}

export const ArrayTable: ISettingsLocale = {
  ...ArrayOperations,
  title: '自增表格',
  Column: '表格列',
}

export const ArrayCards: ISettingsLocale = {
  ...ArrayOperations,
  title: '自增卡片',
}

export const ArrayTabs = {
  ...ArrayOperations,
  title: '自增选项卡',
}

export const ArrayCollapse: ISettingsLocale = {
  ...ArrayOperations,
  title: '自增手风琴',
}
