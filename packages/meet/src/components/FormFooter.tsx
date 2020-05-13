import React, { createElement } from 'react'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Form } from '@alifd/meet'

export const FormFooter = createVirtualBox<any>(
  'formFooter',
  ({ children, ...props }) => {
    return (
      <Form.Footer {...props}>
        {children}
      </Form.Footer>
    )
  }
)
