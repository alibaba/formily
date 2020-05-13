import React, { createElement } from 'react'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Form } from '@alifd/meet'

export const FormContent = createVirtualBox<any>(
  'formContent',
  ({ children, ...props }) => {
    return (
      <Form.Content {...props}>
        {children}
      </Form.Content>
    )
  }
)
