import React from 'react'
import styled from 'styled-components'

export const RightPanel = styled(({ className, dataSource }) => {
  return (
    <div className={className}>
      <code>
        <pre>{JSON.stringify(dataSource, null, 2)}</pre>
      </code>
    </div>
  )
})`
  border-left: 1px solid #3d424a;
  flex-grow: 2;
  overflow: scroll;
  padding: 10px;
`
