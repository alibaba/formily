import React from 'react'
import { globalThisPolyfill } from '@formily/shared'

const env = {
  portalDOM: null,
  ReactDOM: null,
}

export const render = (element: React.ReactElement) => {
  if (globalThisPolyfill.navigator?.product === 'ReactNative') return null
  if (globalThisPolyfill.document) {
    env.portalDOM =
      env.portalDOM || globalThisPolyfill['document'].createElement('div')
    env.ReactDOM = env.ReactDOM || require('react-dom')
    //eslint-disable-next-line
    return env.ReactDOM.createPortal(element, env.portalDOM)
  } else {
    return React.createElement('template', {}, element)
  }
}
