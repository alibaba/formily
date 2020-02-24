import React from 'react'
import { useField } from '../hooks/useField'
import { isFn } from '@formily/shared'
import { IFieldStateUIProps } from '../types'
import { FieldContext } from '../context'

export const Field: React.FC<IFieldStateUIProps> = props => {
  const { state, field, props: innerProps, mutators, form } = useField(props)

  if (!state.visible || !state.display) return <React.Fragment />
  if (isFn(props.children)) {
    return (
      <FieldContext.Provider value={field}>
        {props.children({
          form,
          state,
          props: innerProps,
          mutators
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

Field.displayName = 'ReactInternalField'

Field.defaultProps = {
  path: '',
  triggerType: 'onChange'
}
