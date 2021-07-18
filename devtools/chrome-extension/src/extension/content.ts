window.addEventListener(
  'message',
  (event) => {
    const { source, ...payload } = event.data
    if (source === '@formily-devtools-inject-script') {
      chrome.runtime.sendMessage({
        source,
        ...payload,
      })
    }
  },
  false
)
