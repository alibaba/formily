import React, { Fragment } from 'react'
import { isFn } from '@formily/shared'
import { observer } from 'mobx-react-lite'
import { useForm } from '../hooks'
import { IFormSpyProps } from '../types'

export const FormSpy: React.FC<IFormSpyProps> = observer(props => {
  const children = isFn(props.children) ? props.children(useForm()) : null
  return <Fragment>{children}</Fragment>
})

FormSpy.displayName = 'FormSpy'
