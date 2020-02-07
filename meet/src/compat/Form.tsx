import React, { createElement } from 'react'
import { Form } from '@alifd/meet'
import { IFormItemTopProps } from '../types'
import { FormItemProvider } from './context'
// import { normalizeCol } from '../shared'

export const CompatNextForm: React.FC<
  IFormItemTopProps
> = props => {
  return (
    <FormItemProvider {...props}>
      <Form
        {...props}
      />
    </FormItemProvider>
  )
}
