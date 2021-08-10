import { GeneralField } from '@formily/core'

export const mapStatus = (props: any, field: GeneralField) => {
  const takeStatus = () => {
    if (!field) return
    if (field['loading'] || field['validating']) return 'loading'
    if (field['invalid']) return 'error'
    if (field['warnings']?.length) return 'warning'
    return field.decoratorProps?.feedbackStatus
  }
  const takeState = (state: string) => {
    if (state === 'validating' || state === 'pending') return 'loading'
    return state
  }
  return {
    ...props,
    state: takeState(props.state) || takeStatus(),
  }
}
