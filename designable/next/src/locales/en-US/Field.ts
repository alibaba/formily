import { FormItem } from './FormItem'
import { Style } from './Style'
import type { ISettingsLocale } from '../types'
import { Common } from './Common'

export const Field: ISettingsLocale = {
  name: 'Field identification',
  title: 'Title',
  required: 'Required',
  description: 'Describe',
  default: 'Default value',
  enum: 'Data source',
  'X-display': {
    title: 'Display status',
    tooltip:
      'Half hiding will only hide the ui, and full hiding will delete the data',
    dataSource: ['Display', 'Semi hidden', 'All hidden', 'Inherit'],
  },
  'X-pattern': {
    title: 'Ui form',
    dataSource: ['Editable', 'Disable', 'Read-only', 'Read', 'Inherit'],
  },
  'X-validator': 'Verification rules',
  'X-reactions': 'Responder rule',
  'X-decorator': 'Enable container components',
  'X-decorator-props': {
    ...Common,
    ...FormItem,
    style: Style,
    tab_property: 'Decorator',
    tab_style: 'Style',
  },
  'X-component-props': {
    ...Common,
    tab_property: 'Component',
    tab_style: 'Style',
  },
}
