import { isArr, isFn } from '@formily/shared'

const isHTMLElement = (target: any): target is EventTarget => {
  return Object.prototype.toString.call(target).indexOf('HTML') > -1
}

const getValueFromEvent = (event: any) => {
  if (isHTMLElement(event?.target)) {
    return event.target.value
  }
  return event
}

export const LowSpecification: FormilyCore.IFieldMiddleware = (
  state,
  field
) => {
  const componentName = isArr(state.component) && state.component[0]
  const componentProps = isArr(state.component) && state.component[1]
  const value = componentName === 'input' ? state.value || '' : state.value
  const disabled = state.pattern === 'disabled'
  const readOnly = state.pattern === 'readOnly'
  const onChange = (event: any, ...args: any[]) => {
    const value = getValueFromEvent(event)
    field.onInput(value, ...args)
    if (isFn(componentProps?.onChange)) {
      componentProps.onChange(event, ...args)
    }
  }
  const onFocus = (event: React.UIEvent<HTMLElement>, ...args: any[]) => {
    if (isFn(componentProps?.onFocus)) {
      componentProps.onFocus(event, ...args)
    }
    field.onFocus()
  }
  const onBlur = (event: React.UIEvent<HTMLElement>, ...args: any[]) => {
    if (isFn(componentProps?.onBlur)) {
      componentProps.onBlur(event, ...args)
    }
    field.onBlur()
  }
  const component = [
    componentName,
    {
      ...componentProps,
      disabled,
      readOnly,
      value,
      onChange,
      onFocus,
      onBlur
    }
  ]
  return {
    ...state,
    component
  }
}
