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
    .ant-card-body {
      padding-top: 20px;
      padding-bottom: 0 !important;
    }
    &.ant-card {
      border: none;
      padding: 0 15px;
      padding-bottom: 15px;
      display: block;
      box-shadow: none;
    }
    .ant-card-head {
      padding: 0 !important;
      min-height: 24px;
      font-weight: normal;
    }
    .ant-card-head-title {
      padding: 0;
    }
  `
)
