declare let chrome: any

let created = false

const createPanel = () => {
  if (created) {
    return
  }

  chrome.devtools.inspectedWindow.eval(
    'window.__FORMILY_DEV_TOOLS_HOOK__ && window.__FORMILY_DEV_TOOLS_HOOK__.hasFormilyInstance',
    (hasFormily: boolean) => {
      if (!hasFormily) return
      created = true
      clearInterval(loadCheckInterval)
      chrome.devtools.panels.create(
        'Formily',
        'img/logo/scalable.png',
        './devpanel.html',
        function () {}
      )
    }
  )
}

const loadCheckInterval = setInterval(function () {
  createPanel()
}, 1000)

createPanel()
