import React from 'react'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'
import styled from 'styled-components'

export default styled(({ className }) => {
  return (
    <div className={className}>
      <LeftPanel />
      <RightPanel />
    </div>
  )
})`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
