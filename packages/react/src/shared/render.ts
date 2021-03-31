import React from 'react'
import { createPortal } from 'react-dom'
import { globalThisPolyfill } from '@formily/shared'

const env = {
  portalDOM: null
}

export const render = (element: React.ReactElement) => {
  if (globalThisPolyfill['document']) {
    env.portalDOM =
      env.portalDOM || globalThisPolyfill['document'].createElement('div')
    return createPortal(element, env.portalDOM)
  } else {
    return React.createElement('template', {}, element)
  }
}
