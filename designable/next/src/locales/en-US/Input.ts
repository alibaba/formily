import type { ISettingsLocale } from '../types'

export const Input: ISettingsLocale = {
  showLimitHint: 'Show Limit Hint',
  cutString: {
    title: 'Cut String',
    tooltip:
      'When the maxLength is set, whether to truncate the string is exceeded',
  },
  trim: {
    title: 'Trim',
    tooltip: 'Remove leading and trailing spaces',
  },
  composition: 'Filter Ime Middle Letters',
  hint: {
    title: 'Hint',
    tooltip:
      'The value is taken from the type of Icon and is in the same position as the clear button',
  },
}

Input.TextArea = {
  ...Input,
  autoHeight: 'Auto Height',
  rows: 'Rows',
}
