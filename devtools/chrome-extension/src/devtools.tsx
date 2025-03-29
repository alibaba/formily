import React from 'react'
import formilyDevPanel from 'url:./devPanels/formily/index.html'

const createPanel = () => {
  chrome.devtools.panels.create(
    '🍀Formily',
    null,
    formilyDevPanel.split('/').pop()
  )
}

let created = false

const checkForFormilyPresence = () => {
  if (created) {
    return
  }

  chrome.devtools.inspectedWindow.eval(
    'window.__FORMILY_DEV_TOOLS_HOOK__ && window.__FORMILY_DEV_TOOLS_HOOK__.hasFormilyInstance',
    (hasFormily: boolean, error) => {
      if (created || !hasFormily || error) {
        return
      }

      created = true

      clearInterval(loadCheckInterval)

      createPanel()
    }
  )
}

const loadCheckInterval = setInterval(checkForFormilyPresence, 1000)

checkForFormilyPresence()

const IndexDevtools = () => <h2>Formily devtools is running</h2>

export default IndexDevtools
