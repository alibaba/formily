import React from 'react'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Card } from '@alifd/next'
import { CardProps } from '@alifd/next/types/card'
import styled from 'styled-components'

export const FormBlock = createVirtualBox<CardProps>(
  'block',
  styled(({ children, className, ...props }) => {
    return (
      <Card className={className} contentHeight="auto" {...props}>
        {children}
      </Card>
    )
  })`
    margin-bottom: 0px;
    .next-card-body {
      padding-top: 20px;
      padding-bottom: 0 !important;
    }
    &.next-card {
      border: none;
      padding-bottom: 15px;
    }
  `
)

export default FormBlock
