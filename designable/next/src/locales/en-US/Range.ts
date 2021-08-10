import type { ISettingsLocale } from '../types'

export const Range: ISettingsLocale = {
  slider: {
    title: 'Number of sliders',
    dataSource: ['Single', 'Two'],
  },
  step: {
    title: 'Step',
    tooltip: 'The value must be greater than 0 and can be divided by (max min)',
  },
  marks: {
    title: 'Sign',
    tooltip:
      'Scale value display logic (false means not to display, array enumeration shows the value, number means to divide equally by number, object means to divide by key, and value value is displayed)',
  },
  marksPosition: {
    title: 'Mark position',
    dataSource: ['Upper', 'Below'],
  },
  hasTip: 'Show tips',
  reverse: {
    title: 'Reversal',
    tooltip: 'Selected state inversion',
  },
  pure: 'Pure rendering',
  fixedWidth: {
    title: 'Drag segment type',
  },
  tooltipVisible: 'Default presentation tips',
}
