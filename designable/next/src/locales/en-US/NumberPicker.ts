import type { ISettingsLocale } from '../types'

export const NumberPicker: ISettingsLocale = {
  type: {
    title: 'Type',
    dataSource: ['Normal', 'Inline'],
  },
  precision: 'Keep the number of digits after the decimal point',
  innerAfter: 'Suffix',
  device: {
    title: 'Preset device',
    dataSource: ['Desktop', 'Mobile phone', 'Flat'],
  },
  hasTrigger: 'Show click button',
  alwaysShowTrigger: 'Always show click button (no hover required)',
}
