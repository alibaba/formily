import type { ISettingsLocale } from '../types'

export const ArrayTable: ISettingsLocale = {
  primaryKey: 'Primary Key',
  tableLayout: {
    title: 'Table Layout',
    dataSource: ['Auto', 'Fixed'],
  },
  size: {
    title: 'Size',
    dataSource: ['Small', 'Medium', 'Inherit', 'None'],
  },
  tableWidth: 'Table Width',
  hasHeader: 'Header',
  isZebra: 'Zebra',
  emptyContent: 'Empty Content',
  fixedHeader: 'Fixed Header',
  maxBodyHeight: {
    title: 'Max Body Height',
    tooltip:
      'When Fixed Header is enabled, scroll bars will appear when the height exceeds this height',
  },
  stickyHeader: 'Sticky Header',
}

ArrayTable.Column = {
  align: {
    title: 'Cell Alignment',
    dataSource: ['Left', 'Medium', 'Right'],
  },
  alignHeader: {
    title: 'Header alignment',
    tooltip:
      'If not set, the alignment will be the same as that of the Cell Alignment',
    dataSource: ['Left', 'Center', 'Right'],
  },
  lock: {
    title: 'Lock Column',
    dataSource: ['None', 'Left', 'Right', 'Lock'],
  },
  colSpan: 'Col Span',
  wordBreak: {
    title: 'Word Break',
    dataSource: ['All', 'Word'],
  },
}

ArrayTable.Addition = {
  method: {
    title: 'Method',
    dataSource: ['Push', 'Unshift'],
  },
  defaultValue: 'Default Value',
}
