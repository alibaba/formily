import React from 'react'
import { useVirtualField } from '../hooks/useVirtualField'
import { isFn } from '@formily/shared'
import { IVirtualFieldStateUIProps } from '../types'
import { FieldContext } from '../context'

export const VirtualField: React.FunctionComponent<IVirtualFieldStateUIProps> = props => {
  const { state, field, props: innerProps, form } = useVirtualField(props)
  if (!state.visible || !state.display) return <React.Fragment />
  if (isFn(props.children)) {
    return (
      <FieldContext.Provider value={field}>
        {props.children({
          form,
          state,
          props: innerProps
        })}
      </FieldContext.Provider>
    )
  } else {
    return (
      <FieldContext.Provider value={field}>
        {props.children}
      </FieldContext.Provider>
    )
  }
}

VirtualField.displayName = 'ReactInternalVirtualField'

VirtualField.defaultProps = {
  path: ''
}
