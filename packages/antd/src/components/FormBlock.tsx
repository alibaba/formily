import React from 'react'
import { createVirtualBox } from '@uform/react-schema-renderer'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import styled from 'styled-components'

export const FormBlock = createVirtualBox<CardProps>(
  'block',
  styled(({ children, className, ...props }) => {
    return (
      <Card className={className} {...props}>
        {children}
      </Card>
    )
  })`
    margin-bottom: 0px;
    &.ant-card {
      border: none;
      box-shadow: none;
    }
  `
)
