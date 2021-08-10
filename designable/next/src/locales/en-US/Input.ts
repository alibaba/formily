import type { ISettingsLocale } from '../types'

export const Input: ISettingsLocale = {
  showLimitHint: 'Length limit prompt',
  cutString: {
    title: 'Truncation',
    tooltip:
      'When the maximum length is set, whether to truncate the string is exceeded',
  },
  trim: {
    title: 'Trim',
    tooltip: 'Remove leading and trailing spaces',
  },
  composition: 'Filter ime middle letters',
  hint: {
    title: 'Watermark',
    tooltip:
      'The value is taken from the type of icon and is in the same position as the clear button',
  },
  innerBefore: 'In box prefix',
  innerAfter: 'In box suffix',
  addonTextBefore: 'Prefix label',
  addonTextAfter: 'Suffix label',
}

Input.TextArea = {
  ...Input,
  state: {
    title: 'State',
    dataSource: ['Normal', 'Error', 'Warning'],
  },
  autoHeight: 'Automatic height',
  rows: 'Text box height',
}
