import React, { useState } from 'react'

import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'

export const App = ({ dataSource }) => {
  const [selected, select] = useState({
    current: 0,
    key: '',
  })
  return (
    <div className="app">
      <LeftPanel
        dataSource={dataSource}
        onSelect={(info) => {
          select(info)
          if (chrome && chrome.devtools && chrome.devtools.inspectedWindow) {
            chrome.devtools.inspectedWindow.eval(
              `window.__FORMILY_DEV_TOOLS_HOOK__.setVm("${info.key}","${
                dataSource[info.current][''].id
              }")`
            )
          }
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
}
