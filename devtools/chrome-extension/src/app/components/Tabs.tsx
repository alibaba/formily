import React from 'react'
import styled from 'styled-components'
import { toArr } from '@formily/shared'

export const Tabs = styled(({ className, dataSource, current, onChange }) => {
  current = current || 0
  return (
    <div className={className}>
      {toArr(dataSource).map((item, index) => {
        return (
          <div
            className={`tab-item ${current == index ? 'active' : ''}`}
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
})`
  height: 36px;
  border-bottom: 1px solid #3d424a;
  display: flex;
  line-height: 36px;
  width: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .tab-item {
    cursor: pointer;
    transition: 0.15s all ease-in-out;
    border-right: 1px solid #3d424a;
    padding: 0 10px;
    font-size: 12px;
    &:hover {
      background: #1d1f25;
    }
    &.active {
      background: #1d1f25;
    }
  }
`
