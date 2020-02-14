import React from 'react'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Card } from '@alifd/next'
import { CardProps } from '@alifd/next/types/card'
import styled from 'styled-components'

export const FormCard = createVirtualBox<CardProps>(
  'card',
  styled(({ children, className, ...props }) => {
    return (
      <Card className={className} contentHeight="auto" {...props}>
        {children}
      </Card>
    )
  })`
    margin-bottom: 30px;
    .next-card-body {
      padding-top: 30px;
      padding-bottom: 0 !important;
    }
  `
)

export default FormCard