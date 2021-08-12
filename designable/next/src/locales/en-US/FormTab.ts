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
    tooltip: 'When there are too many tabs, how to slide?',
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
}

FormTab.TabPane = {}
