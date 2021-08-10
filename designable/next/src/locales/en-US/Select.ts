import type { ISettingsLocale } from '../types'

export const Select: ISettingsLocale = {
  placeholder: 'Placeholder',
  autoWidth: {
    title: 'Auto width',
    tooltip: 'Is the drop-down menu aligned with the selector',
  },
  filterLocal: 'Local Filter',
  filter: 'Filter Function',
  autoHighlightFirstItem: 'Auto highlight first item',
  mode: {
    title: 'Mode',
    dataSource: ['Single', 'Multiple', 'Tags'],
  },
  notFoundContent: {
    title: 'No Content Prompt',
    tooltip: 'Copy with empty bullet layer content',
  },
  showDataSourceChildren: {
    title: 'Show Data Source Children',
  },
  hasSelectAll: 'Can Select All',
  cacheValue: {
    title: 'Cache Value',
    tooltip:
      'Do you want to keep the selected content when the data source changes',
  },
  tagInline: 'Tag Inline',
  tagClosable: 'Tag Closable',
  adjustTagSize: {
    title: 'Adjust Tag Size',
    tooltip: 'Adjust the tag the same as the selector',
  },
  maxTagCount: 'Max Tag Count',
  hiddenSelected: 'Hidden Selected',
  popupAutoFocus: 'Popup Auto Focus',
}
