


window.addEventListener('message', event => {
  const { source, ...payload } = event.data
  if (source === '@uform-devtools-inject-script') {
    chrome.runtime.sendMessage({
      source,
      ...payload
    })
  }
}, false)
