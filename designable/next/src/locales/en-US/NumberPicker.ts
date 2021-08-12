import type { ISettingsLocale } from '../types'

export const NumberPicker: ISettingsLocale = {
  type: {
    title: 'Type',
    dataSource: ['Normal', 'Inline'],
  },
  precision: 'Precision',
  innerAfter: 'Inner After',
  device: {
    title: 'Preset Device',
    dataSource: ['Desktop', 'Phone', 'Pad'],
  },
  hasTrigger: 'Trigger',
  alwaysShowTrigger: 'Always Show Trigger',
}
