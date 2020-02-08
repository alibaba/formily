import React, { createElement } from 'react'
import { createVirtualBox } from '@uform/react-schema-renderer'
import { Form } from '@alifd/meet'

export const FormSubHeader = createVirtualBox<any>(
  'formSubHeader',
  ({ title, ...props }) => {
    return (
      <Form.SubHeader {...props}>
        {title}
      </Form.SubHeader>
    )
  }
)
