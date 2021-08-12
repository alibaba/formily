import type { ISettingsLocale } from '../types'

export const Select: ISettingsLocale = {
  filterLocal: 'Local Filter',
  filter: 'Filter Function',
  autoHighlightFirstItem: 'Auto highlight first item',
  mode: {
    title: 'Mode',
    dataSource: ['Single', 'Multiple', 'Tags'],
  },
  notFoundContent: 'No Content Prompt',
  showDataSourceChildren: 'Show Data Source Children',
  hasSelectAll: 'Can Select All',
  cacheValue: {
    title: 'Cache Value',
    tooltip:
      'Do you want to keep the selected value when the data source changes',
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
