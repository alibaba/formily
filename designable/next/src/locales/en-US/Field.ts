import { FormItem } from './FormItem'
import { Style } from './Style'
import type { ISettingsLocale } from '../types'
import { Common } from './Common'

export const Field: ISettingsLocale = {
  name: 'Name',
  title: 'Title',
  required: 'Required',
  description: 'Description',
  default: 'Default',
  enum: 'Data Source',
  'x-display': {
    title: 'Display State',
    tooltip:
      'When the display value is "None", the data will be "Hidden" and deleted. When the display value is hidden, only the UI will be hidden',
    dataSource: ['Visible', 'Hidden', 'None', 'Inherit'],
  },
  'x-pattern': {
    title: 'UI Pattern',
    dataSource: ['Editable', 'Disabled', 'ReadOnly', 'ReadPretty', 'Inherit'],
  },
  'x-validator': 'Validator',
  'x-reactions': 'Reactions',
  'x-decorator': 'Decorator',
  'x-decorator-props': {
    ...Common,
    ...FormItem,
    style: Style,
    tab_property: 'Decorator',
    tab_style: 'Style',
  },
  'x-component-props': {
    ...Common,
    tab_property: 'Component',
    tab_style: 'Style',
  },
}
