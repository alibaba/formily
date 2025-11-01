import React, { ReactNode, ReactPortal } from 'react'
import { globalThisPolyfill } from '@formily/shared'

interface Env {
  portalDOM?: HTMLDivElement
  createPortal?: (children: ReactNode, container: Element) => ReactPortal
}

const createPortalDOM = () => {
  try {
    // env.portalDOM work with env.createPortal
    if (!env.createPortal) {
      return
    }

    // environment not support div element
    // @ts-ignore
    if (typeof globalThisPolyfill?.HTMLDivElement !== 'function') {
      return
    }

    env.portalDOM ??= globalThisPolyfill?.document?.createElement?.('div')
  } catch (error) {
    // do nothing
  }
}

const env: Env = {
  portalDOM: undefined,
  createPortal: globalThisPolyfill?.['ReactDOM']?.createPortal,
}

createPortalDOM()

/* istanbul ignore next */
const loadCreatePortal = () => {
  if (!env.createPortal) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      env.createPortal ??= require('react-dom')?.createPortal
      createPortalDOM()
    } catch {}
  }
  if (!env.createPortal) {
    try {
      // @ts-ignore
      import('react-dom')
        .then((module) => {
          env.createPortal ??= module?.createPortal
          createPortalDOM()
        })
        .catch()
    } catch {}
  }
}

// test template element is supported in current environment
const supportsTemplate =
  // @ts-ignore
  typeof globalThisPolyfill?.HTMLTemplateElement === 'function' &&
  // @ts-ignore
  'content' in globalThisPolyfill?.HTMLTemplateElement?.prototype

export const render = (element: React.ReactElement) => {
  if (globalThisPolyfill?.navigator?.product === 'ReactNative') return null

  if (env.portalDOM && env.createPortal) {
    return env.createPortal(element, env.portalDOM)
  } else if (supportsTemplate) {
    return React.createElement('template', {}, element)
  }

  return null
}

loadCreatePortal()
