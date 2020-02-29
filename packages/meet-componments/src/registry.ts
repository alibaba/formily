import { registerFormFields } from '@formily/meet'
import { Switchs } from './switch'
import { Checkboxs } from './checkbox'
import { DatePickers } from './date'
import { NumberPickers } from './number'
import { Input } from './input'
import { RadioGroups } from './radio'
import { Ranges } from './range'
import { select } from './select'

export const setup = () => {
  registerFormFields({
    switch: Switchs,
    checkbox: Checkboxs,
    DatePicker: DatePickers,
    number: NumberPickers,
    input: Input,
    radio: RadioGroups,
    range: Ranges,
    select: select
  })
}
