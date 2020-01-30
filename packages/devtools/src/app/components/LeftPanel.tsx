import React from 'react'
import { Header } from './Header'
import { FieldTree } from './FieldTree'
import styled from 'styled-components'

export const LeftPanel = styled(({ className }) => {
  return (
    <div className={className}>
      <Header />
      <FieldTree />
    </div>
  )
})`
  width: 70%;
`
