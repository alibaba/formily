import React, { ReactNode, ReactPortal } from 'react'
import { globalThisPolyfill } from '@formily/shared'

interface Env {
  portalDOM?: HTMLDivElement
  createPortal?: (children: ReactNode, container: Element) => ReactPortal
}

const env: Env = {
  portalDOM: globalThisPolyfill?.document?.createElement?.('div'),
  createPortal: globalThisPolyfill?.['ReactDOM']?.createPortal,
}

/* istanbul ignore next */
const loadCreatePortal = () => {
  if (!env.createPortal) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      env.createPortal ??= require('react-dom')?.createPortal
    } catch {}
  }
  if (!env.createPortal) {
    try {
      // @ts-ignore
      import('react-dom')
        .then((module) => (env.createPortal ??= module?.createPortal))
        .catch()
    } catch {}
  }
}

export const render = (element: React.ReactElement) => {
  if (globalThisPolyfill.navigator?.product === 'ReactNative') return null
  if (env.portalDOM && env.createPortal) {
    return env.createPortal(element, env.portalDOM)
  } else {
    return React.createElement('template', {}, element)
  }
}

loadCreatePortal()
