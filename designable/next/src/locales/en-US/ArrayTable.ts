import type { ISettingsLocale } from '../types'

export const ArrayTable: ISettingsLocale = {
  primaryKey: 'Primary Key',
  tableLayout: {
    title: 'Table Layout',
    dataSource: ['Auto', 'Fixed'],
  },
  size: {
    title: 'Size',
    dataSource: ['Small', 'Medium', 'Inherit', 'Nothing'],
  },
  tableWidth: 'Table Width',
  hasHeader: 'Header',
  isZebra: 'Zebra',
  emptyContent: 'Empty Content',
  fixedHeader: 'Fixed Header',
  maxBodyHeight: 'Max Body Height',
  stickyHeader: 'Sticky Header',
}

ArrayTable.Column = {
  align: {
    title: 'Cell Alignment',
    dataSource: ['Left', 'Medium', 'Right'],
  },
  alignHeader: {
    title: 'Header alignment',
    tooltip: 'If not set, the alignment will be the same as that of the cell',
    dataSource: ['Left', 'Medium', 'Right'],
  },
  lock: {
    title: 'Lock',
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
