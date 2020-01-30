let created = false

const createPanel = () => {
  if (created) {
    return
  }

  chrome.devtools.inspectedWindow.eval(
    'window.__UFORM_DEV_TOOLS_HOOK__ && window.__UFORM_DEV_TOOLS_HOOK__.instances > 0',
    (hasUForm: boolean) => {
      if (!hasUForm) return
      created = true
      clearInterval(loadCheckInterval)
      chrome.devtools.panels.create(
        'UForm',
        'img/logo/scalable.png',
        './devpanel.html',
        function() {}
      )
    }
  )
}

const loadCheckInterval = setInterval(function() {
  createPanel()
}, 1000)

createPanel()
