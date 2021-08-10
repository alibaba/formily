import type { ISettingsLocale } from '../types'

export const ArrayTable: ISettingsLocale = {
  primaryKey: 'Primary key',
  tableLayout: {
    title: 'Table layout',
    dataSource: ['Automatic', 'Fixed'],
  },
  size: {
    title: 'Size',
    dataSource: ['Small', 'Medium', 'Inherit', 'Nothing'],
  },
  tableWidth: 'Table width',
  hasHeader: 'Head',
  isZebra: 'Zebra crossing',
  emptyContent: 'Empty content copy',
  fixedHeader: 'Fixed head',
  maxBodyHeight: 'Maximum body height',
  stickyHeader: 'Viscous head',
}

ArrayTable.Column = {
  align: {
    title: 'Cell alignment',
    dataSource: ['Left', 'Medium', 'Right'],
  },
  alignHeader: {
    title: 'Head alignment',
    tooltip: 'If not set, the alignment will be the same as that of the cell',
    dataSource: ['Left', 'Medium', 'Right'],
  },
  lock: {
    title: 'Lock column',
    dataSource: ['No lock', 'Left', 'Right', 'Lock'],
  },
  colSpan: 'Lattice number',
  wordBreak: {
    title: 'Word break',
    dataSource: ['Whole', 'Word'],
  },
}

ArrayTable.Addition = {
  method: {
    title: 'Add method',
    dataSource: ['Tail', 'Head'],
  },
  defaultValue: 'Default value',
}
