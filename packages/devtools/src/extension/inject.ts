let s = document.createElement('script')
s.type = 'text/javascript'
s.src = chrome.extension.getURL('js/backend.bundle.js')
s.onload = function() {
  s.parentNode.removeChild(s)
}
;(document.head || document.documentElement).appendChild(s)
