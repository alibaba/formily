import type { ISettingsLocale } from '../types'

export const Range: ISettingsLocale = {
  slider: {
    title: 'Slider',
    dataSource: ['Single', 'Double'],
  },
  step: {
    title: 'Step',
    tooltip:
      'The value must be greater than 0 and can be divided by (max - min)',
  },
  marks: {
    title: 'Marks',
    tooltip:
      'False means not to display, Array enumeration shows the value, Number means to divide equally by number, Object means to divide by key, and value is displayed)',
  },
  marksPosition: {
    title: 'Marks Position',
    dataSource: ['Top', 'Bottom'],
  },
  hasTip: 'Show Tips',
  reverse: {
    title: 'Reversal',
    tooltip: 'Selected state inversion',
  },
  pure: 'Pure Rendering',
  fixedWidth: {
    title: 'Fixed Width',
  },
  tooltipVisible: 'Tooltips Visible',
}
