import { Style } from './Style'
import type { ISettingsLocale } from '../types'

export const Common: ISettingsLocale = {
  title: 'Title',
  placeholder: 'Placeholder',
  extra: 'Extra',
  min: 'Min Value',
  max: 'Max Value',
  step: 'Step',
  closeable: 'Closeable',
  autoFocus: 'Auto Focus',
  width: 'Width',
  height: 'Height',
  minLength: 'Min Length',
  maxLength: 'Max Length',
  minWidth: 'Min Width',
  maxWidth: 'Max Width',
  minHeight: 'Min Height',
  maxHeight: 'Max Height',
  notFoundContent: 'No Content Prompt',
  addonBefore: 'Addon Before',
  addonAfter: 'Addon After',
  innerBefore: 'Inner Before',
  innerAfter: 'Inner After',
  addonTextBefore: 'Addon Text Before',
  addonTextAfter: 'Addon Text After',
  tooltip: 'Tooltip',
  autoWidth: 'Auto Width',
  name: 'Name',
  showSearch: 'Search Button',
  multiple: 'Allow Multiple Selections',
  hasArrow: 'Dropdown Arrow',
  hasBorder: 'Frame',
  hasClear: {
    title: 'Clear Button',
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
    dataSource: ['Horizontal', 'Vertical'],
  },
  followTrigger: {
    title: 'Follow Scroll',
    tooltip:
      'When enabled, allows the popup layer to scroll with the component instead of staying in the popup position',
  },
  useVirtual: {
    title: 'Virtual Scroll',
    tooltip:
      'It is used to optimize performance when the amount of data is large, and may flicker when scrolling quickly',
  },
  immutable: 'Immutable Data',
  popupTriggerType: {
    title: 'Popup Trigger',
    dataSource: ['Click', 'Hover'],
  },
  popupAlign: {
    title: 'Popup Align',
    tooltip: 'Refer to the Overlay documentation',
  },
}
