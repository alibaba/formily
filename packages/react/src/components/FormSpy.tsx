import React, { Fragment } from 'react'
import { isFn } from '@formily/shared'
import { IFormSpyProps } from '../types'
import { useFormSpy } from '../hooks/useFormSpy'

export const FormSpy: React.FunctionComponent<IFormSpyProps> = props => {
  if (isFn(props.children)) {
    return props.children(useFormSpy(props)) || <Fragment />
  } else {
    return props.children || <Fragment />
  }
}

FormSpy.displayName = 'ReactInternalFormSpy'

FormSpy.defaultProps = {
  selector: `*`,
  reducer: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}
