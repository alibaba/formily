import type { ISettingsLocale } from '../types'

export const Radio: ISettingsLocale = {}

Radio.Group = {
  shape: {
    title: 'Shape',
    dataSource: ['Normal', 'Button'],
  },
}
