import { registerFormFields } from '@formily/meet'
import { Switch } from './switch'
import { CheckboxGroup } from './checkbox'
import { DatePicker } from './date-picker'
import { Input } from './input'
import { NumberPicker } from './number-picker'
import { RadioGroup } from './radio'
import { Range } from './range'
import { Select } from './select'
import { RadioDrawer } from './radio-drawer'

export const setup = () => {
  registerFormFields({
    string: Input,
    date: DatePicker,
    boolean: Switch,
    checkbox: CheckboxGroup,
    number: NumberPicker,
    radio: RadioGroup,
    range: Range,
    select: Select,
    radioDrawer: RadioDrawer
  })
}
