import type { ISettingsLocale } from '../types'

export const FormTab: ISettingsLocale = {
  size: {
    title: 'Size',
    dataSource: ['Small', 'Medium', 'Inherit'],
  },
  shape: {
    title: 'Shape',
    dataSource: ['Pure', 'Wrapper', 'Text', 'Capsule'],
  },
  animation: 'Transition',
  excessMode: {
    title: 'Excess Mode',
    tooltip: 'Sliding mode when there are too many tabs',
    dataSource: ['Slider', 'Dropdown'],
  },
  tabPosition: {
    title: 'Tab Position',
    dataSource: ['Top', 'Bottom', 'Left', 'Right'],
  },
  triggerType: {
    title: 'Trigger Type',
    tooltip: 'Trigger method of activation tab',
    dataSource: ['Click', 'Hover'],
  },
  disableKeyboard: {
    title: 'Disable Keyboard',
    tooltip:
      'Disable keyboard events. after setting, you cannot switch the currently selected tab through the up, down, left and right keys of the keyboard',
  },
}

FormTab.TabPane = {}
