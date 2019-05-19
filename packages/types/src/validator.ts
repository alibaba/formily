import { FieldState } from './field'
export interface ValidateResponse {
  name: string
  value: any,
  field: FieldState
  invalid: boolean
  valid: boolean
  errors: string[]
}

export type ValidateHandler = (response: ValidateResponse[]) => void
