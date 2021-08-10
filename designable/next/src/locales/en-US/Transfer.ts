import type { ISettingsLocale } from '../types'

export const Transfer: ISettingsLocale = {
  id: 'Identification',
  mode: {
    title: 'Pattern',
    dataSource: ['Normal', 'Simple'],
  },
  leftDisabled: 'Disable left panel',
  rightDisabled: 'Disable right panel',
  filter: 'Filter function',
  searchPlaceholder: 'Search placeholder tips',
  titles: 'Left and right panel titles',
  sortable: 'Drag sort',
  showCheckAll: 'Bottom select all',
}
