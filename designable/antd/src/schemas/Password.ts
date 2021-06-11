import { ISchema } from '@formily/react'
import { CommonInputProperties } from './Input'
export const Password: ISchema = {
  type: 'object',
  properties: {
    ...CommonInputProperties,
    checkStrength: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
