import type { ISettingsLocale } from '../types'

export const Select: ISettingsLocale = {
  placeholder: 'Space occupying prompt',
  autoWidth: {
    title: 'Automatic width',
    tooltip: 'Is the drop-down menu aligned with the selector',
  },
  filterLocal: 'Local filtering',
  filter: 'Filtering method',
  autoHighlightFirstItem: 'Auto highlight first item',
  mode: {
    title: 'Pattern',
    dataSource: ['Single choice', 'Multiple choice', 'Label'],
  },
  notFoundContent: {
    title: 'No content prompt',
    tooltip: 'Copy with empty bullet layer content',
  },
  showDataSourceChildren: {
    title: 'Check auto clear',
    tooltip: 'It is only supported in multi selection or label mode',
  },
  hasSelectAll: 'Can i select all in multiple selection mode',
  cacheValue: {
    title: 'Cache selected values',
    tooltip:
      'Do you want to keep the selected content when the data source changes',
  },
  tagInline: 'Label in line display',
  tagClosable: 'The label can be closed',
  adjustTagSize: {
    title: 'Resize label',
    tooltip: 'Resize the label the same as the selector',
  },
  maxTagCount: 'Maximum number of display labels',
  hiddenSelected: 'Hide menu immediately after selection',
  popupAutoFocus: 'Auto focus on pop-up menu',
}
