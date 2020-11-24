import React, { Fragment } from 'react'
import { isFn } from '@formily/shared'
import { observer } from '../shared'
import { useForm } from '../hooks'

export interface IFormSpyProps {
  children?: (form: FormilyCore.Form) => React.ReactChild
}

export const FormSpy: React.FC<IFormSpyProps> = observer(props => {
  const children = isFn(props.children) ? props.children(useForm()) : null
  return <Fragment>{children}</Fragment>
})

FormSpy.displayName = 'FormSpy'
