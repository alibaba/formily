import { ISchema } from '@formily/react'

export const Checkbox: ISchema = {
  autoFocus: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
}
