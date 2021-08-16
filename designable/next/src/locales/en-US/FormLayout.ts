import type { ISettingsLocale } from '../types'

export const FormLayout: ISettingsLocale = {
  labelCol: 'Label Col',
  wrapperCol: 'Component Col',
  labelWidth: 'Label Width',
  wrapperWidth: 'Wrapper Width',
  colon: 'Colon',
  feedbackLayout: {
    title: 'Feedback layout',
    dataSource: ['Loose', 'Terse', 'Popup', 'None', 'Inherit'],
  },
  layout: {
    title: 'Layout',
    dataSource: ['Horizontal', 'Vertical', 'Inline', 'Inherit'],
  },
  tooltipLayout: {
    title: 'Tooltip Layout',
    dataSource: ['Icon', 'Text', 'Inherit'],
  },
  labelAlign: {
    title: 'Label Align',
    dataSource: ['Left', 'Right', 'Inherit'],
  },
  wrapperAlign: {
    title: 'Wrapper Align',
    dataSource: ['Left', 'Right', 'Inherit'],
  },
  labelWrap: 'Label Wrap',
  wrapperWrap: 'Wrapper wrap',
  fullness: 'Fullness',
  inset: 'Inset',
  shallow: 'Shallow',
  bordered: 'Border',
}
