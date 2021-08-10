import type { ISettingsLocale } from '../types'

export const FormTab: ISettingsLocale = {
  size: {
    title: 'Size',
    dataSource: ['Small', 'Medium', 'Inherit'],
  },
  shape: {
    title: 'Appearance',
    dataSource: ['Pure', 'Package', 'Text', 'Capsule'],
  },
  animation: 'Animation transition',
  excessMode: {
    title: 'Sliding mode',
    tooltip: 'Sliding mode when there are too many tabs',
    dataSource: ['Slider', 'Drop down list'],
  },
  tabPosition: {
    title: 'Tab location',
    tooltip:
      'The location of the navigation tab, which applies only to tabs that look like parcels',
    dataSource: ['Upper', 'Lower', 'Left', 'Right'],
  },
  triggerType: {
    title: 'Tab activation method',
    tooltip: 'Trigger method of activation tab',
    dataSource: ['Click', 'Move in'],
  },
  disableKeyboard: {
    title: 'Disable keyboard switching',
    tooltip:
      'Disable keyboard events. after setting, you cannot switch the currently selected tab through the up, down, left and right keys of the keyboard',
  },
}

FormTab.TabPane = {}
