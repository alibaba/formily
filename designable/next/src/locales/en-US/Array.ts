import type { ISettingsLocale } from '../types'

const ArrayOperations: ISettingsLocale = {
  Index: 'Indexes',
  SortHandle: 'Sort Handle',
  Addition: 'Addition',
  Remove: 'Remove',
  MoveDown: 'Move Down',
  MoveUp: 'Move Up',
}

export const ArrayTable: ISettingsLocale = {
  ...ArrayOperations,
  title: 'Array Table',
  Column: 'Column',
}

export const ArrayCards: ISettingsLocale = {
  ...ArrayOperations,
  title: 'Array Cards',
}

export const ArrayTabs = {
  ...ArrayOperations,
  title: 'Array Tabs',
}

export const ArrayCollapse: ISettingsLocale = {
  ...ArrayOperations,
  title: 'Array Collapse',
}
