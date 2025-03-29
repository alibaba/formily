import React, { useState } from 'react'

import { FieldTree } from './FieldTree'
import { Tabs } from './Tabs'

export const LeftPanel = ({ dataSource, onSelect }) => {
  const [current, setCurrent] = useState(0)
  return (
    <div className="leftPanel">
      <Tabs
        dataSource={dataSource}
        current={current}
        onChange={(index) => {
          setCurrent(index)
          onSelect({
            current: index,
            key: '',
          })
        }}
      />
      <FieldTree
        dataSource={dataSource[current]}
        onSelect={(node) => {
          if (onSelect) {
            onSelect({
              current,
              key: node.path,
            })
          }
        }}
      />
    </div>
  )
}
