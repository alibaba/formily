import React from 'react'
import { Button } from '@alifd/next'
import { ButtonProps } from '@alifd/next/types/button'
import styled from 'styled-components'

export const CircleButton = styled(props => {
  return (
    <Button {...props} className={`circle-btn ${props.className}`}>
      {props.children}
    </Button>
  )
})<ButtonProps>`
  border-radius: 50% !important;
  padding: 0 !important;
  min-width: 28px;
  &.next-large {
    min-width: 40px;
  }
  &.next-small {
    min-width: 20px;
  }
  &.has-text {
    .next-icon {
      margin-right: 5px;
    }
    background: none !important;
    border: none !important;
  }
`

export default CircleButton