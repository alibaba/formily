import type { ISettingsLocale } from '../types'

export const FormLayout: ISettingsLocale = {
  labelCol: 'Label grid width',
  wrapperCol: 'Component grid width',
  labelWidth: 'Label width',
  wrapperWidth: 'Component width',
  colon: 'Is there a colon',
  feedbackLayout: {
    title: 'Feedback layout',
    dataSource: ['Easy', 'Compact', 'Elastic layer', 'Nothing', 'Inherit'],
  },
  layout: {
    title: 'Layout',
    dataSource: ['Vertical', 'Level', 'Inline', 'Inherit'],
  },
  tooltipLayout: {
    title: 'Prompt layout',
    dataSource: ['Icon', 'Text', 'Inherit'],
  },
  labelAlign: {
    title: 'Label alignment',
    dataSource: ['Align left', 'Right align', 'Inherit'],
  },
  wrapperAlign: {
    title: 'Component alignment',
    dataSource: ['Align left', 'Right align', 'Inherit'],
  },
  labelWrap: 'Label wrap',
  wrapperWrap: 'Component wrap',
  fullness: 'Component full',
  inset: 'Inline layout',
  shallow: 'Shallow transfer',
  bordered: 'Is there a border',
}
