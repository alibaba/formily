import type { ISettingsLocale } from '../types'

export const Switch: ISettingsLocale = {
  size: {
    title: 'Size',
    dataSource: ['Small', 'Medium', 'Inherit', 'Nothing'],
  },
  checkedChildren: 'Content on open',
  unCheckedChildren: 'Content when closing',
}
