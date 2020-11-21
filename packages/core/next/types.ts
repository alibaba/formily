import { FormPathPattern } from '@formily/shared'

export type FunctionComponent = (...args: any[]) => any

export type FormFeedbacks = {
  type: 'error' | 'warning' | 'exception'
  code: string
  path: string
  messages: string[]
}[]
