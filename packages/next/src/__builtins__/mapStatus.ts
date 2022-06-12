import { Field } from '@formily/core'

export const mapStatus = (props: any, field: Field) => {
  const takeStatus = () => {
    if (!field) return
    if (field.loading || field.validating) return 'loading'
    if (field.selfErrors?.length) return 'error'
    if (field.selfWarnings?.length) return 'warning'
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
