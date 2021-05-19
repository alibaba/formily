import React from 'react'
import styled from 'styled-components'
import ReactJson from 'react-json-view'

export const RightPanel = styled(({ className, dataSource }) => {
  return (
    <div className={className}>
      <ReactJson
        src={dataSource}
        name={dataSource && dataSource.displayName}
        theme="hopscotch"
        displayDataTypes={false}
        enableClipboard={false}
        sortKeys={true}
        onEdit={false}
        onAdd={false}
        onDelete={false}
        iconStyle="square"
      />
    </div>
  )
})`
  border-left: 1px solid #3d424a;
  flex-grow: 2;
  overflow: auto;
  padding: 10px;
  .react-json-view {
    background: none !important;
    font-size: 12px !important;
  }
`
