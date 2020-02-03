import React, { useState } from 'react'
import { Tabs } from './Tabs'
import { FieldTree } from './FieldTree'
import styled from 'styled-components'

export const LeftPanel = styled(({ className, dataSource, onSelect }) => {
  const [current, setCurrent] = useState(0)
  return (
    <div className={className}>
      <Tabs
        dataSource={dataSource}
        current={current}
        onChange={index => {
          setCurrent(index)
        }}
      />
      <FieldTree
        dataSource={dataSource[current]}
        onSelect={node => {
          if (onSelect) {
            onSelect({
              current,
              key: node.path
            })
          }
        }}
      />
    </div>
  )
})`
  width: 50%;
`
