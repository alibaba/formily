import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

const backgroundPageConnection = chrome.runtime.connect({
  name: '@formily-devtools-panel-script',
})

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
})

chrome.devtools.inspectedWindow.eval(
  'window.__FORMILY_DEV_TOOLS_HOOK__.openDevtools()'
)

const Devtools = () => {
  const [state, setState] = useState([])
  useEffect(() => {
    let store = {}
    const update = () => {
      setState(
        Object.keys(store).map((key) => {
          return store[key]
        })
      )
    }
    chrome.devtools.inspectedWindow.eval(
      'window.__FORMILY_DEV_TOOLS_HOOK__.update()'
    )
    backgroundPageConnection.onMessage.addListener(({ type, id, graph }) => {
      if (type === 'init') {
        store = {}
        chrome.devtools.inspectedWindow.eval(
          'window.__FORMILY_DEV_TOOLS_HOOK__.openDevtools()'
        )
      } else if (type !== 'uninstall') {
        store[id] = JSON.parse(graph)
      } else {
        delete store[id]
      }
      update()
    })
  }, [])
  return <App dataSource={state} />
}

const root = createRoot(document.getElementById('root'))
root.render(<Devtools />)
