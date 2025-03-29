import { toArr } from '@formily/shared'
import React from 'react'

export const Tabs = ({ dataSource, current, onChange }) => {
  current = current || 0
  return (
    <div className="tabs">
      {toArr(dataSource).map((item, index) => {
        return (
          <div
            className={`tabItem ${current == index ? 'active' : ''}`}
            key={index}
            onClick={() => {
              if (onChange) {
                onChange(index)
              }
            }}
          >
            <span>Form#{index + 1}</span>
          </div>
        )
      })}
    </div>
  )
}
