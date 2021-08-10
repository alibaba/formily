import type { ISettingsLocale } from '../types'

const ArrayOperations: ISettingsLocale = {
  Index: 'Indexes',
  SortHandle: 'Sort handle',
  Addition: 'Add button',
  Remove: 'Delete button',
  MoveDown: 'Move down button',
  MoveUp: 'Upward button',
}

export const ArrayTable: ISettingsLocale = {
  ...ArrayOperations,
  title: 'Self increment table',
  Column: 'Table column',
}

export const ArrayCards: ISettingsLocale = {
  ...ArrayOperations,
  title: 'Self adding card',
}

export const ArrayTabs = {
  ...ArrayOperations,
  title: 'Auto increment tab',
}

export const ArrayCollapse: ISettingsLocale = {
  ...ArrayOperations,
  title: 'Self increasing accordion',
}
