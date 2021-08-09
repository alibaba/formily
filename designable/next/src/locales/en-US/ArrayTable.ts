import type { ISettingsLocale } from '../types'

export const ArrayTable: ISettingsLocale = {
  primaryKey: '主键',
  tableLayout: {
    title: '表格布局',
    dataSource: ['自动', '固定'],
  },
  size: {
    title: '尺寸',
    dataSource: ['小', '中', '继承', '无'],
  },
  tableWidth: '表格宽度',
  hasHeader: '头部',
  isZebra: '斑马线',
  emptyContent: '空内容文案',
  fixedHeader: '固定头部',
  maxBodyHeight: '最大主体高度',
  stickyHeader: '粘性头部',
}

ArrayTable.Column = {
  align: {
    title: '单元格对齐',
    dataSource: ['左', '中', '右'],
  },
  alignHeader: {
    title: '头部对齐',
    tooltip: '不设置将与单元格对齐方式相同',
    dataSource: ['左', '中', '右'],
  },
  lock: {
    title: '锁列',
    dataSource: ['不锁', '左', '右', '锁'],
  },
  colSpan: '格数',
  wordBreak: {
    title: '单词打破',
    dataSource: ['全部', '单词'],
  },
}

ArrayTable.Addition = {
  method: {
    title: '添加方法',
    dataSource: ['尾部', '头部'],
  },
  defaultValue: '默认值',
}
