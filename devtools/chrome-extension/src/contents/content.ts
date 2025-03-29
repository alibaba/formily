import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  run_at: 'document_start',
  all_frames: true,
}

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
