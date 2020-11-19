import prettyFormat from 'pretty-format'
import MutationObserver from '@sheerun/mutationobserver-shim'

global['prettyFormat'] = prettyFormat

global['sleep'] = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}

global['requestAnimationFrame'] = fn => setTimeout(fn)

global.document.documentElement.style['grid-column-gap'] = true

global['MutationObserver'] = MutationObserver
