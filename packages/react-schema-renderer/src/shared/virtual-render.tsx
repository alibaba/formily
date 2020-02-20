import React from 'react'
import { globalThisPolyfill } from '@formily/shared'

const env = {
  portalDOM: null
}

export const render = (element: React.ReactElement) => {
  if (globalThisPolyfill['document']) {
    env.portalDOM =
      env.portalDOM || globalThisPolyfill['document'].createElement('div')
    return require('react-dom').createPortal(element, env.portalDOM)
  } else {
    return <template>{element}</template>
  }
}
