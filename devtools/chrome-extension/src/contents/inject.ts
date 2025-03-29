import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  run_at: 'document_start',
  all_frames: true,
}

const injectScript = (url) => {
  const script = document.createElement('script')
  script.src = url
  document.documentElement?.appendChild(script)
  script.parentNode?.removeChild(script)
}

injectScript(chrome.runtime.getURL('assets/backend.js'))
