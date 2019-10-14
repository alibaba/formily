import React from 'react'
import { createVirtualBox } from '@uform/react-schema-renderer'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import styled from 'styled-components'

export const FormCard = createVirtualBox<CardProps>(
  'card',
  styled(({ children, className, ...props }) => {
    return (
      <Card className={className} {...props}>
        {children}
      </Card>
    )
  })`
    margin-bottom: 30px;
    .ant-card-body {
      padding-top: 30px;
      padding-bottom: 0 !important;
    }
    &.ant-card {
      display: block;
      margin-bottom: 30px;
    }
  `
)
