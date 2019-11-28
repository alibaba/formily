import React from 'react'
import { isFn } from '@uform/shared'
import { IFormSpyProps } from '../types'
import { useFormSpy } from '../hooks/useFormSpy'

export const FormSpy: React.FunctionComponent<IFormSpyProps> = props => {
  if (isFn(props.children)) {
    return props.children(useFormSpy(props))
  } else {
    return props.children
  }
}

FormSpy.displayName = 'ReactInternalFormSpy'

FormSpy.defaultProps = {
  selector: `*`,
  reducer: (state, action) => {
    return state
  }
}
