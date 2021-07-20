import React, { useState } from 'react'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'
import styled from 'styled-components'

export default styled(({ className, dataSource }) => {
  const [selected, select] = useState({
    current: 0,
    key: '',
  })
  return (
    <div className={className}>
      <LeftPanel
        dataSource={dataSource}
        onSelect={(info) => {
          select(info)
        }}
      />
      <RightPanel
        dataSource={
          selected
            ? (dataSource &&
                dataSource[selected.current] &&
                dataSource[selected.current][selected.key]) ||
              {}
            : {}
        }
      />
    </div>
  )
})`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  color: #36d4c7;
  background: #282c34;
`
