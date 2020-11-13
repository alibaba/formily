export interface IFormState<FormProps = any> {
  valid: boolean
  invalid: boolean
  loading: boolean
  validating: boolean
  modified: boolean
  submitting: boolean
  initialized: boolean
  editable: boolean | ((name: string) => boolean)
  errors: Array<{
    path: string
    messages: string[]
  }>
  warnings: Array<{
    path: string
    messages: string[]
  }>
  values: any
  initialValues: any
  mounted: boolean
  unmounted: boolean
  props: FormProps
  [key: string]: any
}
