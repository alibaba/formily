import React from 'react'
import ReactJson from 'react-json-view'

export const RightPanel = ({ dataSource }) => {
  return (
    <div className="rightPanel">
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
}
