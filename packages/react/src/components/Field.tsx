import React from 'react'
import { useField } from '../hooks/useField'
import { isFn } from '@uform/shared'
import { IFieldProps } from '../types'

export const Field: React.FC<IFieldProps> = props => {
  const { state, props: innerProps, mutators, form } = useField(props)
  if (!state.visible || !state.display) return <React.Fragment />
  if (isFn(props.children)) {
    return props.children({
      form,
      state,
      props: innerProps,
      mutators
    })
  } else {
    return <React.Fragment>{props.children}</React.Fragment>
  }
}

Field.displayName = 'ReactInternalField'

Field.defaultProps = {
  path: '',
  triggerType: 'onChange'
}
