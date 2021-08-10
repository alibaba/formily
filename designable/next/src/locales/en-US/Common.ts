import { Style } from './Style'
import type { ISettingsLocale } from '../types'

export const Common: ISettingsLocale = {
  title: 'Title',
  placeholder: 'Space occupying prompt',
  extra: 'Right extension',
  min: 'Minimum value',
  max: 'Maximum',
  step: 'Step',
  closeable: 'Can be closed',
  autoFocus: 'Auto focus',
  width: 'Width',
  height: 'Height',
  minLength: 'Minimum length',
  maxLength: 'Maximum length',
  minWidth: 'Minimum width',
  maxWidth: 'Maximum width',
  minHeight: 'Minimum height',
  maxHeight: 'Maximum height',
  notFoundContent: 'No content prompt copy',
  autoWidth: 'Automatic width',
  name: 'Name',
  showSearch: 'Search button',
  multiple: 'Allow multiple selections',
  hasArrow: 'Drop down arrow',
  hasBorder: 'Frame',
  hasClear: {
    title: 'Clear button',
    tooltip:
      'When enabled, you can click the clear button on the right to clear the input quickly',
  },
  style: Style,
  size: {
    title: 'Size',
    dataSource: ['Small', 'Medium', 'Large', 'Inherit'],
  },
  direction: {
    title: 'Direction',
    dataSource: ['Level', 'Vertical'],
  },
  followTrigger: {
    title: 'Follow scroll',
    tooltip:
      'When enabled, allows the spring layer to scroll with the component instead of staying in the ejected position',
  },
  useVirtual: {
    title: 'Virtual scrolling',
    tooltip:
      'It is used to optimize performance when the amount of data is large, and may flicker when scrolling quickly',
  },
  immutable: 'Immutable data',
  popupTriggerType: {
    title: 'Trigger bomb layer',
    dataSource: ['Click', 'Move in'],
  },
  popupAlign: {
    title: 'Snap layer alignment',
    tooltip: 'Refer to the overlay documentation',
  },
}
